var map = null;


function initGoogleMap2(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: oZoom,
            center: latlng,
            navigationControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            maxZoom: 20,
            mapTypeControl: true
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.minZoom = 12;
        /* 实时交通,路况信息
        var trafficLayer = new google.maps.TrafficLayer();  
        trafficLayer.setMap(map); 
        */
    } catch (e) {
        //initGoogleMap(lat, lng, zoom);

    }
}


function initmap() {
    initGoogleMap2(0, 0, 0);
  
}


function deleteOverLays(allOverlays) {
    if (allOverlays) {
        for (var i in allOverlays) {
            allOverlays[i].setMap(null);
        }
        allOverlays.length = 0;
    }
    //清除弹出框
    closeWindow();
}

//提前绘制所有线路
function showHistoryAllMap() {
    var ArrayPolyPoints = new Array();
    var dashedPolyPoints = new Array();
    var lastDraw = true;
    for (var i = 0; i < allLocation.length; i++) {
        var isAdd = true;
        var latlng = new google.maps.LatLng(allLocation[i].baiduLat, allLocation[i].baiduLng);
        var isDraw = true;
        ArrayPolyPoints.push(latlng);
    }
    if (ArrayPolyPoints.length > 1) {
        var mypoly = new google.maps.Polyline({
            path: ArrayPolyPoints,
            strokeColor: "#00FF33",
            strokeOpacity: 1,
            strokeWeight: 6
        });
        mypoly.setMap(map);
        allPolyline.push(mypoly);
    }
    if (dashedPolyPoints.length > 0) {
        polyDashed(dashedPolyPoints);
        dashedPolyPoints.length = 0;
    }
    showHistoryMap();
    forTime = setInterval(showHistoryMap, forTimer);
}

//虚线
var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    strokeColor: "#3333FF",
    strokeWeight: 6,
    scale: 4
};

//画虚线
function polyDashed(dashedPolyPoints) {
    if (dashedPolyPoints.length > 1) {
        var dashedPolyPoints2 = new Array();
        //避免数组引用传递,高德,soso就是.
        for (var i = 0; i < dashedPolyPoints.length; i++) {
            dashedPolyPoints2.push(dashedPolyPoints[i]);
        }
        var line = new google.maps.Polyline({
            path: dashedPolyPoints2,
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
            map: map
        });
        allPolyline.push(line);
    }
} 


var endIndex = 0;
var isDrawStart = false; //是否需要重新描起始点
function showHistoryMap() {
    //map操作
    var d = allLocation[index];
    if (d) {
        var latlng = new google.maps.LatLng(d.baiduLat, d.baiduLng);

        if (isSetZoom) {
            map.setCenter(latlng);
            //map.setZoom(12);
            isSetZoom = false;
        } else {
            var LatLngBounds = map.getBounds();
            var isMap = LatLngBounds.contains(latlng);
            if (!isMap) {
                map.panTo(latlng);
            }
        }

        if (lastMarker) {
            var html = GetMarkerInfo(d);
            var obj = { "position": latlng, "text": html };
            lastMarker.update(obj);
            endIndex = index; //有可能连续几个直线
            //停止显示地标
            //if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10 && DateDiff(allLocation[index - 1].serverUtcTime, d.deviceUtcDate) > -5) {
                if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10){
                var lastLatlng = new google.maps.LatLng(allLocation[index - 1].baiduLat, allLocation[index - 1].baiduLng);
                var stopIcon = "icons/stoptr.png";
                var stopMarker = new google.maps.Marker({
                    position: lastLatlng,
                    map: map,
                    icon: stopIcon,
                    title: allLocation[index - 1].deviceUtcDate
                });
                addGoogleClkListener(stopMarker, allLocation[index - 1]);
                allMarker.push(stopMarker);
                appendStopEvent(allLocation[index - 1]);
            }

        }
        if (!isFirstShowHistory && !isDrawStart) {
            //超速
            if (speedLimit > 0) {
                if (d.speed > speedLimit) {
                    var lastLatlng = new google.maps.LatLng(allLocation[index - 1].baiduLat, allLocation[index - 1].baiduLng);
                    var ArrayPolyPoints = new Array();
                    ArrayPolyPoints.push(lastLatlng);
                    ArrayPolyPoints.push(latlng);
                    var mypoly = new google.maps.Polyline({
                        path: ArrayPolyPoints,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1,
                        strokeWeight: 6
                    });
                    mypoly.setMap(map);
                    allPolyline.push(mypoly);

                    appendOverspeedEvent(d);
                }
            }

        } else {
           if (isFirstShowHistory) {
                var html = GetMarkerInfo(d);
                var icon = "icons/green.gif";
                var icon2 = "images/null.gif";
                lastMarker = new PopupMarker({
                    position: latlng,
                    map: map,
                    icon: icon,
                    text: html,
                    showpop: true,
                    id: d.id
                });
                allMarker.push(lastMarker);
            }
            var stIcon = "icons/start.png";
            var firstMarker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: stIcon,
                title: d.deviceUtcDate
            });
            addGoogleClkListener(firstMarker, d);
            allMarker.push(firstMarker)
        }

        index++;

//        var html = GetMarkerInfo(d);
//        var icons = GetIcon(iconType, "", d.course);
//        lastMarker = new PopupMarker({ position: latlng, map: map, icon: icons, text: html, showpop: true, id: d.id });
//        allMarker.push(lastMarker);
//        if (index > 1) {
//            (allMarker[allMarker.length - 2]).setMap(null);
//        }
        isFirstShowHistory = false;
        isDrawStart = false;
        if (index >= allLocation.length) {
            clearInterval(forTime);
            //判断是否读取完数据
            if (queryStartDate != "") {
                var diff = DateDiff(queryStartDate, queryEndDate);
                if (diff > 2) {

                    WebGetHistory();
                } else {
                    document.getElementById("btnPause").disabled = true;
                    document.getElementById("btnNext").disabled = true;
                    alert(playbackPage.playOver);
                }
            } else {
                document.getElementById("btnPause").disabled = true;
                document.getElementById("btnNext").disabled = true;
                alert(playbackPage.playOver);
            }
        } else {

        }
    } else {
        if (forTime) {
            clearInterval(forTime);
        }
    }

}

var inforwindowArr = [];
function addGoogleClkListener(marker, d) {
    try {
        var html = GetClkInfo(d, d.baiduLat, d.baiduLng);
        var infowindow2 = new google.maps.InfoWindow({ content: html });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow2.open(map, marker);
        });
        inforwindowArr.push(infowindow2);
    } catch (ex) { }

}
function closeWindow() {
    for (var i = 0; i < inforwindowArr.length; i++) {
        inforwindowArr[i].close();
    }
    inforwindowArr.length = 0;
}

function GetMarkerInfo(d) {
    return GetPopupHtml(d, d.baiduLat, d.baiduLng);
}