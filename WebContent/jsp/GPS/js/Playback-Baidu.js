//普通:绿色,超速:红色,拉直线:蓝色
var map = null;
var popupmarkerWidth = 200;
var popupmarkerHeight = 70;
function initmap() {
    initBaiduMap(0, 0, 0);
    //map.setMaxZoom(17) 
}



function deleteOverLays(allOverlays) {
    if (map) {
        map.clearOverlays();
    }
    allOverlays.length = 0;
}


//提前绘制所有线路
function showHistoryAllMap() {
    var ArrayPolyPoints = new Array();
    var dashedPolyPoints = new Array();
    var PointsAll = [];
    for (var i = 0; i < allLocation.length; i++) {

        PointsAll.push(new BMap.Point(allLocation[i].baiduLng, allLocation[i].baiduLat));

    }
    map.setViewport(PointsAll);
    var lastDraw = true;
    for (var i = 0; i < allLocation.length; i++) {
        //var ction = eval("(" + allLocation[i] + ")");
        var isAdd = true;       
        var latlng = new BMap.Point(allLocation[i].baiduLng, allLocation[i].baiduLat);
        var isDraw = true;

        ArrayPolyPoints.push(latlng);

    }
    if (ArrayPolyPoints.length > 1) {
        //alert(ArrayPolyPoints.length);
        var mypoly = new BMap.Polyline(ArrayPolyPoints, { strokeColor: "#00FF33", strokeWeight: 6, strokeOpacity: 1 });
        map.addOverlay(mypoly);
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
        var dashedPoly = new BMap.Polyline(dashedPolyPoints2, { strokeColor: "#3333FF", strokeWeight: 6, strokeOpacity: 1 });
        dashedPoly.setStrokeStyle("dashed");
        map.addOverlay(dashedPoly);
        allPolyline.push(dashedPoly);
    }
}

var endIndex = 0;
var isDrawStart = false; //是否需要重新描起始点
function showHistoryMap() {
    //map操作
    //var d = eval("(" + allLocation[index] + ")");


    var d = allLocation[index];
    if (d) {
        var latlng = new BMap.Point(d.baiduLng, d.baiduLat);
        if (isSetZoom) {
            map.centerAndZoom(latlng);
            isSetZoom = false;
        } else {
            var LatLngBounds = map.getBounds();
            var isMap = LatLngBounds.containsPoint(latlng);
            if (!isMap) {
                //panTo好像无效
                map.setCenter(latlng);
            }
        }

        if (lastMarker) {
            var html = GetMarkerInfo(d);
            var obj = { "position": latlng, "text": html };
            lastMarker.update(obj);
            endIndex = index; //有可能连续几个直线
            //停止显示地标
            //alert(allLocation[index - 1].stopTimeMinute);
            //if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10 && DateDiff(allLocation[index - 1].serverUtcTime, d.deviceUtcDate) > -5) {
            if (allLocation[index - 1].IsStop == 1 && allLocation[index - 1].stopTimeMinute >= 10) {
                var lastLatlng = new BMap.Point(allLocation[index - 1].baiduLng, allLocation[index - 1].baiduLat);
                var stopIcon = "icons/stoptr.png";
                var sIcon = new BMap.Icon(stopIcon, new BMap.Size(20, 38));
                var stopMarker = new BMap.Marker(lastLatlng, { icon: sIcon, title: allLocation[index - 1].deviceUtcDate });
                stopMarker.setOffset(new BMap.Size(0, -10))
                map.addOverlay(stopMarker);
                addBaiduClkListener(stopMarker, allLocation[index - 1]);
                allMarker.push(stopMarker);
                appendStopEvent(allLocation[index - 1]);
            }

        }
        if (!isFirstShowHistory && !isDrawStart) {
            //超速
            if (speedLimit > 0) {
                if (d.speed > speedLimit) {
                    var lastLatlng = new BMap.Point(allLocation[index - 1].baiduLng, allLocation[index - 1].baiduLat);
                    var ArrayPolyPoints = new Array();
                    ArrayPolyPoints.push(lastLatlng);
                    ArrayPolyPoints.push(latlng);
                    var mypoly = new BMap.Polyline(ArrayPolyPoints, { strokeColor: "#FF0000", strokeWeight: 6, strokeOpacity: 1 });
                    map.addOverlay(mypoly);
                    allPolyline.push(mypoly);

                    appendOverspeedEvent(d);
                }
            }
        } else {
            if (isFirstShowHistory) {
                var html = GetMarkerInfo(d);
                var icon = "icons/green.gif";
                var icon2 = "images/null.gif";
                lastMarker = new PopupMarker({ position: latlng, map: map, icon: icon, text: html, showpop: true });
                allMarker.push(lastMarker);

                //                //车头方向的处理

                //                var html = GetMarkerInfo(d);

                //                var Icon = GetIcon(iconType, "", d.course);
            }
            var stIcon = "icons/start.png";
            var startIcon = new BMap.Icon(stIcon, new BMap.Size(20, 38));
            var firstMarker = new BMap.Marker(latlng, { icon: startIcon, title: d.deviceUtcDate });
            firstMarker.setOffset(new BMap.Size(0, -10))
            map.addOverlay(firstMarker);
            addBaiduClkListener(firstMarker, d);
            allMarker.push(firstMarker)
            //            var startIcon = new BMap.Icon(Icon, new BMap.Size(38, 38));
            //            var firstMarker = new BMap.Marker(latlng, { icon: startIcon, title: d.deviceUtcDate });
            //            firstMarker.setOffset(new BMap.Size(0, -10))
            //            map.addOverlay(firstMarker);
            //            addBaiduClkListener(firstMarker, d);
            //            allMarker.push(firstMarker)
        }
        isDrawStart = false;

        index++;
        //        //最后一个点的车头方向

        //        var html = GetMarkerInfo(d);

        //        var icons = GetIcon(iconType, "", d.course);
        //        lastMarker = new PopupMarker({ position: latlng, map: map, icon: icons, text: html, showpop: true });
        //        allMarker.push(lastMarker);
        //        //如果index>1移除前一个点的覆盖物
        //        if (index > 1) {
        //            map.removeOverlay(allMarker[allMarker.length - 2]);
        //        }
        //GB885 26880
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
                    alert(playbackPage.playOver);//播放结束弹出播放结束，不适用注掉
                    //ShowHistory(obj);//通过div控制的方式，不适用注掉
                    //弹出窗体Playback_Info，查看播放记录
//                    var url = "/GPS/MapPlayback/Playback_Info.aspx";
//                    top.openDialog(url, 'Playback_Info', '轨迹回放', 450, 150, 50, 50);
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
function addBaiduClkListener(marker, d) {
    try {
        var html = GetClkInfo(d, d.baiduLat, d.baiduLng);
        var infoWindow = new BMap.InfoWindow(html);
        marker.addEventListener("click", function () {
            this.openInfoWindow(infoWindow);
        });
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