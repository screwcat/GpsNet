var map = null;

function initmap() {
    initSOSOMap(0, 0, 0);
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
        var latlng = new soso.maps.LatLng(allLocation[i].baiduLat, allLocation[i].baiduLng);
        var isDraw = true;
        ArrayPolyPoints.push(latlng);
    }
    if (ArrayPolyPoints.length > 1) {
        var mypoly = new soso.maps.Polyline({
            path: ArrayPolyPoints,
            strokeColor: '#00FF33',
            strokeWeight: 6,
            strokeOpacity: 1,
            editable: false,
            map: map
        });
        allPolyline.push(mypoly);
    }
    if (dashedPolyPoints.length > 0) {
        polyDashed(dashedPolyPoints);
        dashedPolyPoints.length = 0;
    }
    showHistoryMap();
    forTime = setInterval(showHistoryMap, forTimer);
}


//画虚线
function polyDashed(dashedPolyPoints) {
    if (dashedPolyPoints.length > 1) {
        var dashedPolyPoints2 = new Array();
        for (var i = 0; i < dashedPolyPoints.length; i++) {
            dashedPolyPoints2.push(dashedPolyPoints[i]);
        }
        var line = new soso.maps.Polyline({
            path: dashedPolyPoints2,
            strokeColor: '#3333FF',
            strokeWeight: 6,
            strokeOpacity: 1,
            editable: false,
            strokeDashStyle: 'dash',
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
        var latlng = new soso.maps.LatLng(d.baiduLat, d.baiduLng);
        if (isSetZoom) {
            map.setCenter(latlng);
            map.zoomTo(12);
            isSetZoom = false;
        } else {
            var LatLngBounds = map.getBounds();
            var isMap = LatLngBounds.contains(latlng);
            if (!isMap) {
                map.moveTo(latlng);
            }
        }

        if (lastMarker) {
            var html = GetMarkerInfo(d);
            var obj = { "position": latlng, "text": html };
            lastMarker.update(obj);
            endIndex = index; //有可能连续几个直线
            //停止显示地标
            if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10) {
                var lastLatlng = new soso.maps.LatLng(allLocation[index - 1].baiduLat, allLocation[index - 1].baiduLng);
                var offsetPoint = new soso.maps.Point(10, 38),
                    iconSize = new soso.maps.Size(20, 38),
                    stopIcon = new soso.maps.MarkerImage('icons/stoptr.png', iconSize, offsetPoint);
                var stopMarker = new soso.maps.Marker({
                    position: lastLatlng,
                    icon: stopIcon,
                    map: map
                });
                addSOSOClkListener(stopMarker, allLocation[index - 1]);
                allMarker.push(stopMarker);
                appendStopEvent(allLocation[index - 1]);
            }

        }
        if (!isFirstShowHistory && !isDrawStart) {
            //超速
            if (speedLimit > 0) {
                if (d.speed > speedLimit) {
                    var lastLatlng = new soso.maps.LatLng(allLocation[index - 1].baiduLat, allLocation[index - 1].baiduLng);
                    var ArrayPolyPoints = new Array();
                    ArrayPolyPoints.push(lastLatlng);
                    ArrayPolyPoints.push(latlng);
                    var mypoly = new soso.maps.Polyline({
                        path: ArrayPolyPoints,
                        strokeColor: '#FF0000',
                        strokeWeight: 6,
                        strokeOpacity: 1,
                        editable: false,
                        map: map
                    });
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
            var offsetPoint = new soso.maps.Point(10, 38),
                    iconSize = new soso.maps.Size(20, 38),
                    stIcon = new soso.maps.MarkerImage('icons/start.png', iconSize, offsetPoint);
            var firstMarker = new soso.maps.Marker({
                position: latlng,
                icon: stIcon,
                map: map
            });
            addSOSOClkListener(firstMarker, d);
            allMarker.push(firstMarker);
        }        
        index++;
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
function addSOSOClkListener(marker, d) {
    try {
        var html = GetClkInfo(d, d.baiduLat, d.baiduLng);
        var infowindow2 = new soso.maps.InfoWindow({
            map: map
        });
        html = "<div style='white-space:nowrap;'>" + html + "</div>";
        soso.maps.Event.addListener(marker, 'click', function () {
            infowindow2.open(html, marker);

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