//普通:绿色,超速:红色,拉直线:蓝色
var map = null;
var dashedPoly;
function initmap() {
    initGaodeMap(0, 0, 0);
}



function deleteOverLays(allOverlays) {

    if (map) {
        try {
            map.clearMap();
        } catch (err) { }
    }
    allOverlays.length = 0;
}

//提前绘制所有线路
var j = 0;
function showHistoryAllMap() {
    j = 0;
    dashedPoly && dashedPoly.setMap(null);
    var ArrayPolyPoints = new Array();
    var dashedPolyPoints = new Array();
    //var dashedPart = new Array();
    var lastDraw = true;

    for (var i = 0; i < allLocation.length; i++) {
        var latlng = new AMap.LngLat(allLocation[i].baiduLng, allLocation[i].baiduLat);


        if (allLocation[i].MeterStatus == 1) {
            dashedPolyPoints.push(latlng);
        }
        else {
            if (dashedPolyPoints.length > 0) {
                polyDashed(dashedPolyPoints);
                dashedPolyPoints.length = 0;
            }
        }
    }
    if (dashedPolyPoints.length > 0) {
        polyDashed(dashedPolyPoints);
        dashedPolyPoints.length = 0;
    }

    for (var i = 0; i < allLocation.length; i++) {
        var isAdd = true;
        var latlng = new AMap.LngLat(allLocation[i].baiduLng, allLocation[i].baiduLat);
        var isDraw = true;

        ArrayPolyPoints.push(latlng);
        j++;
    }

    if (ArrayPolyPoints.length > 1) {
        var bbb = new AMap.Polyline({
            map: map,
            path: ArrayPolyPoints,
            strokeColor: "#00FF33",
            strokeOpacity: 1,
            strokeWeight: 6,
            strokeStyle: "solid"
        });
        map.setFitView();
    }

    for (var i = 0; i < allLocation.length; i++) {
        var latlng = new AMap.LngLat(allLocation[i].baiduLng, allLocation[i].baiduLat);


        if (allLocation[i].MeterStatus == 1) {
            dashedPolyPoints.push(latlng);
        }
        else {
            if (dashedPolyPoints.length > 0) {
                polyDashed(dashedPolyPoints);
                dashedPolyPoints.length = 0;
            }
        }
    }
    if (dashedPolyPoints.length > 0) {
        polyDashed(dashedPolyPoints);
        dashedPolyPoints.length = 0;
    }

    showHistoryMap();
    forTime = setInterval(showHistoryMap, forTimer);

}

//画虚线
function polyDashed(dashedPolyPoints1) {
    var dashedPolyPoints2 = new Array();

    for (var i = 0; i < dashedPolyPoints1.length; i++) {
        dashedPolyPoints2.push([dashedPolyPoints1[i].lng, dashedPolyPoints1[i].lat]);
    }
    /*dashedPolyPoints2 = [[123.456356, 41.81599],
    [123.453281, 41.823235],
    [123.455539, 41.825585],
    [123.473041, 41.850389],
    [123.451427, 41.85189],
    [123.442061, 41.837811]
    ];*/
    if (dashedPolyPoints2.length > 1) {
        dashedPoly = new AMap.Polyline({
            path: dashedPolyPoints2,          //设置线覆盖物路径
            strokeColor: "#FF0000", //线颜色
            strokeOpacity: 1,       //线透明度
            strokeWeight: 3,        //线宽
            strokeStyle: "solid",   //线样式
            strokeDasharray: [10, 5] //补充线样式
        });
        //map.setFitView();
        dashedPoly.setMap(map);
    }
}

var endIndex = 0;
var isDrawStart = false; //是否需要重新描起始点
var showMarker = null;
var inforWindow = new AMap.InfoWindow({
    autoMove: true,
    content: ""
});
function showHistoryMap() {
    //map操作
    var d = allLocation[index];
    var html = GetMarkerInfo(d);
    if (d) {
        var latlng = new AMap.LngLat(d.baiduLng, d.baiduLat);
        if (isSetZoom) {
            map.setCenter(latlng);
            map.setZoom(12);
            isSetZoom = false;
        } else {
            var LatLngBounds = map.getBounds();
            var isMap = true;
            if (latlng.lat > LatLngBounds.southwest.lat && latlng.lng > LatLngBounds.southwest.lng && latlng.lat < LatLngBounds.northeast.lat && latlng.lng < LatLngBounds.northeast.lng) {
                isMap = true;
            } else {
                isMap = false;
            }
            if (!isMap) {
                map.panTo(latlng);
            }
        }
        if (lastMarker) {

            var popup = new PopupMarker({
                text: html
            });
            showMarker.setPosition(latlng);
            lastMarker.setPosition(latlng);
            lastMarker.setContent(popup.html_);
            endIndex = index; //有可能连续几个直线
            //停止显示地标
            if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10) {
                var lastLatlng = new AMap.LngLat(allLocation[index - 1].baiduLng, allLocation[index - 1].baiduLat);
                var stopIcon = "icons/stoptr.png";
                var stopMarker = new AMap.Marker({
                    id: "stop" + j,
                    position: lastLatlng,
                    icon: stopIcon,
                    offset: { x: -5, y: -34 }
                });
                //map.addOverlays(stopMarker);
                addGaodeClkListener(stopMarker, allLocation[index - 1]);
                allMarker.push(stopMarker);
                appendStopEvent(allLocation[index - 1]);
            }

        }
        if (!isFirstShowHistory && !isDrawStart) {
            //超速
            if (speedLimit > 0) {
                if (d.speed > speedLimit) {
                    var lastLatlng = new AMap.LngLat(allLocation[index - 1].baiduLng, allLocation[index - 1].baiduLat);
                    var ArrayPolyPoints = new Array();
                    ArrayPolyPoints.push(lastLatlng);
                    ArrayPolyPoints.push(latlng);
                    var mypoly = new AMap.Polyline({
                        id: "polylinespeed" + j,
                        path: ArrayPolyPoints,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1,
                        strokeWeight: 6,
                        strokeStyle: "solid"
                    });
                    //map.addOverlays(mypoly);
                    allPolyline.push(mypoly);

                    appendOverspeedEvent(d);
                }
            }

        } else {
            if (isFirstShowHistory) {
                var html = GetMarkerInfo(d);
                var icon = "icons/green.gif";

                showMarker = new AMap.Marker({
                    id: "show",
                    position: latlng,
                    icon: icon,
                    offset: { x: -5, y: -20 }
                });
                //map.addOverlays(showMarker);
                allMarker.push(showMarker);
                var size = getSize(html);
                var offsetHeight = (size.height + 34) * -1;
                var popup = new PopupMarker({
                    text: html
                });
                lastMarker = new AMap.Marker({
                    id: "lastMarker",
                    position: latlng,
                    offset: new AMap.Pixel(0, offsetHeight),
                    icon: "",
                    content: popup.html_
                });
                //map.addOverlays(lastMarker);
                allMarker.push(lastMarker);
            }
            var stIcon = "icons/start.png";
            var firstMarker = new AMap.Marker({
                id: "start",
                position: latlng,
                icon: stIcon,
                offset: { x: -5, y: -34 }
            });
            //map.addOverlays(firstMarker);

            allMarker.push(firstMarker);
            addGaodeClkListener(firstMarker, d);
        }
        isDrawStart = false;
        inforWindow.setContent(html);  //在信息窗体中显示新的信息内容
        inforWindow.open(map, [d.baiduLng, d.baiduLat]);
        index++;
        j++;
        isFirstShowHistory = false;
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
function addGaodeClkListener(marker, d) {
    try {
        var html = GetClkInfo(d, d.baiduLng, d.baiduLat);
        var inforWindow = new AMap.InfoWindow({
            content: html
        });
        map.bind(marker, "click", function (e) {
            inforWindow.open(map, new AMap.LngLat(d.baiduLng, d.baiduLat));
        });
        inforwindowArr.push(inforWindow);
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


function getSize(html) {

    var size = {};
    var span = document.getElementById("spanMapPopupContentSize");
    span.innerHTML = html;
    span.style.display = '';
    size.width = span.offsetWidth;
    size.height = span.offsetHeight;
    span.style.display = 'none';
    var ret, lines = html.split(/\n/i), totalSize = eval("(" + "{width:1,height: 1}" + ")");

    for (var i = 0; i < lines.length; i++) {
        totalSize.width += size.width;
        totalSize.height += size.height;
    }

    return totalSize;
}