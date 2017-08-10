var map = null;
var isSetZoom = true;
var popupmarkerWidth = 200;
var popupmarkerHeight = 70;
//function initmap() {
//    initBaiduMap2(0, 0, 0);
//}

var lastMarker = null;
var lastLocation = null;
function showMarker(lk) {
    var geocoder = null, bPoint = null;

    if (lk) {
        geocoder = new BMap.Geocoder();
        bPoint = new BMap.Point(lk.Longitude, lk.Latitude);
        geocoder.getLocation(bPoint, function (geoResult) {
            if (geoResult) {
                var latlng = new BMap.Point(lk.baiduLng, lk.baiduLat),
                    viewport = null, startMrk = null, infoWindow = null;

                lk.Location = geoResult.address;
                if (isSetZoom) {
                    map.centerAndZoom(latlng, 12);
                    map.setViewport([latlng]);
                    isSetZoom = false;
                } else {
                    var LatLngBounds = map.getBounds();
                    var isMap = LatLngBounds.containsPoint(latlng);
                    if (!isMap) {
                        //panTo
                        map.setCenter(latlng);
                        //                        viewport = map.getViewport([latlng]);
                        viewport = map.getViewport(
                            ArrayPolyPoints == null || ArrayPolyPoints.length == 0 ? [latlng] : ArrayPolyPoints
                        );
                        map.setViewport(viewport);
                    }
                }
                var icon = GetIcon(iconType, "", lk.course);
                if (!lastMarker) {
                    //首次
                    var html = GetMarkerInfo(lk);
                    //var icon = "icons/green_north_21.gif";
                    lastMarker = new PopupMarker({ position: latlng, map: map, icon: icon, text: html, showpop: true });
                    startMrk = new BMap.Marker(latlng, {
                        "icon": new BMap.Icon("icons/start.png", new BMap.Size(20, 38)),
                        "offset": new BMap.Size(0, -20)
                    });
                    infoWindow = new BMap.InfoWindow(html);
                    map.addOverlay(startMrk);
                    startMrk.addEventListener("click", function () {
                        this.openInfoWindow(infoWindow);
                    });
                } else {
                    //取出来的是新数据.
                    if (lk.serverUtcDate != lastLocation.serverUtcDate) {
                        var html = GetMarkerInfo(lk);
                        var obj = { "position": latlng, "icon": icon, "text": html };
                        lastMarker.update(obj);
                        //描线
                        var lastLatlng = new BMap.Point(lastLocation.baiduLng, lastLocation.baiduLat);
                        var ArrayPolyPoints = new Array();
                        ArrayPolyPoints.push(lastLatlng);
                        ArrayPolyPoints.push(latlng);
                        var mypoly = new BMap.Polyline(ArrayPolyPoints, { strokeColor: "#00FF33", strokeWeight: 7, strokeOpacity: 0.7 });
                        map.addOverlay(mypoly);
                    }
                }
                lastLocation = lk;
            }
        });
//        var latlng = new BMap.Point(lk.baiduLng, lk.baiduLat),
//            viewport = null;
//        if (isSetZoom) {
//            map.centerAndZoom(latlng, 12);
////            map.setViewport([latlng]);
//            isSetZoom = false;
//        } else {
//            var LatLngBounds = map.getBounds();
//            var isMap = LatLngBounds.containsPoint(latlng);
//            if (!isMap) {
//                //panTo
//                map.setCenter(latlng);
//                viewport = map.getViewport([latlng]);
//                map.setViewport(viewport);
//            }
//        }
//        var icon = GetIcon(iconType, "", lk.course); 
//        if (!lastMarker) {
//            //首次
//            var html = GetMarkerInfo(lk);
//            //var icon = "icons/green_north_21.gif";
//            lastMarker = new PopupMarker({ position: latlng, map: map, icon: icon, text: html, showpop: true });  
//        } else {
//            //取出来的是新数据.
//            if (lk.serverUtcDate != lastLocation.serverUtcDate) {
//                var html = GetMarkerInfo(lk);
//                var obj = { "position": latlng, "icon": icon, "text": html };
//                lastMarker.update(obj);
//                //描线
//                var lastLatlng = new BMap.Point(lastLocation.baiduLng, lastLocation.baiduLat);
//                var ArrayPolyPoints = new Array();
//                ArrayPolyPoints.push(lastLatlng);
//                ArrayPolyPoints.push(latlng);
//                var mypoly = new BMap.Polyline(ArrayPolyPoints, { strokeColor: "#00FF33", strokeWeight: 7, strokeOpacity: 0.7 });
//                map.addOverlay(mypoly);
//            }
//        }
//        lastLocation = lk;
    }
//    GetAddressByMap(lk.baiduLat, lk.baiduLng);
    if (!isFortime) {
        forTimeMethod();
        isFortime = true;
    }
}


function GetMarkerInfo(lk) {

    return GetPopupHtml(lk, lk.baiduLat, lk.baiduLng);
}

//谷米接口解析
function GetAddressByMap(lat, lng) {
    GetAddressByGoome(lat, lng);
}