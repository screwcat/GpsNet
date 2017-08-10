var map = null;
var isSetZoom = true;

function initmap() {
    initGoogleMap(0, 0, 0);
}

var lastMarker = null;
var lastLocation = null;

//  显示车辆信息原方法
//function showMarker(lk) {
//    var geocoder = null, latLng = null;
//    if (lk) {
//        var latlng = new google.maps.LatLng(lk.latitude, lk.longitude);
//        if (isSetZoom) {
//            map.setCenter(latlng);
//            map.setZoom(14);
//            isSetZoom = false;
//        } else {
//            var LatLngBounds = map.getBounds();
//            var isMap = LatLngBounds.contains(latlng);
//            if (!isMap) {
//                map.panTo(latlng);
//            }
//        }
//        var icon = GetIcon(iconType, "", lk.course);
//        if (!lastMarker) {
//            //首次
//            var html = GetMarkerInfo(lk);
//            //var icon = "icons/green_north_21.gif";
//            lastMarker = new PopupMarker({
//                position: latlng,
//                map: map,
//                icon: icon,
//                text: html,
//                showpop: true,
//                id: lk.locationID
//            });
//        } else {
//            //取出来的是新数据.
//            if (lk.serverUtcDate != lastLocation.serverUtcDate) {
//                var html = GetMarkerInfo(lk);
//                var obj = { "position": latlng, "icon": icon, "text": html };
//                lastMarker.update(obj);
//                //描线
//                var lastLatlng = new google.maps.LatLng(lastLocation.latitude, lastLocation.longitude);
//                var ArrayPolyPoints = new Array();
//                ArrayPolyPoints.push(lastLatlng);
//                ArrayPolyPoints.push(latlng);
//                var mypoly = new google.maps.Polyline({
//                    path: ArrayPolyPoints,
//                    strokeColor: "#00FF33",
//                    strokeOpacity: 0.7,
//                    strokeWeight: 7
//                });
//                mypoly.setMap(map);
//            }
//        }
//        lastLocation = lk;
//    }

////    GetAddressByMap(lk, lk.latitude, lk.longitude, lk.baiduLat, lk.baiduLng);
//    
//    if (!isFortime) {
//        forTimeMethod();
//        isFortime = true;
//    }
//}

//  显示车辆信息方法改
function showMarker(lk) {
    var geocoder = null, latLngPoint = null;
    
    if (lk) {
        geocoder = new google.maps.Geocoder();
        latLngPoint = new google.maps.LatLng(lk.Latitude, lk.Longitude);
        geocoder.geocode({ "latLng": latLngPoint }, function (results, status) {
            var bounds = null,
                startMrk = null, infoWindow = null;

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    lk.Location = results[0].formatted_address.split(" ")[0];

                    var latlng = new google.maps.LatLng(lk.latitude, lk.longitude);
                    if (isSetZoom) {
                        map.setCenter(latlng);
                        map.setZoom(14);
                        isSetZoom = false;
                    } else {
                        var LatLngBounds = map.getBounds();
                        var isMap = LatLngBounds.contains(latlng);
                        if (!isMap) {
                            map.panTo(latlng);
                        }
                    }
                    var icon = GetIcon(iconType, "", lk.course);
                    if (!lastMarker) {
                        //首次
                        var html = GetMarkerInfo(lk);
                        //var icon = "icons/green_north_21.gif";

                        lastMarker = new PopupMarker({
                            position: latlng,
                            map: map,
                            icon: icon,
                            text: html,
                            showpop: true,
                            id: lk.locationID
                        });

                        startMrk = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            title: lk.name,
                            icon: "icons/start.png"
                        });
                        infoWindow = new google.maps.InfoWindow({ "content": html });
                        google.maps.event.addListener(startMrk, "click", function (event) {
                            infoWindow.open(map, startMrk);
                        });
                    } else {
                        //取出来的是新数据.
                        if (lk.serverUtcDate != lastLocation.serverUtcDate) {
                            var html = GetMarkerInfo(lk);
                            var obj = { "position": latlng, "icon": icon, "text": html };
                            lastMarker.update(obj);
                            //描线
                            var lastLatlng = new google.maps.LatLng(lastLocation.latitude, lastLocation.longitude);
                            var ArrayPolyPoints = new Array();
                            ArrayPolyPoints.push(lastLatlng);
                            ArrayPolyPoints.push(latlng);
                            var mypoly = new google.maps.Polyline({
                                path: ArrayPolyPoints,
                                strokeColor: "#00FF33",
                                strokeOpacity: 0.7,
                                strokeWeight: 7
                            });
                            mypoly.setMap(map);
                        }
                    }
                    lastLocation = lk;

                    bounds = results[0].geometry.bounds;

                    if (bounds == null) {
                        //                        bounds = new google.maps.LatLngBounds(
                        //                            new google.maps.LatLng(lk.Latitude, lk.Longitude),
                        //                            new google.maps.LatLng(lk.Latitude, lk.Longitude)
                        //                        );
                        bounds = new google.maps.LatLngBounds();
                        bounds.extend(results[0].viewport.getNorthEast());
                        bounds.extend(results[0].viewport.getSouthWest());
                    }
                    map.fitBounds(bounds);
                    map.setCenter(new google.maps.LatLng(lk.Latitude, lk.Longitude));
                }
            } else {
                //                alert("Geocoder failed due to: " + status);
            }
        });
        
        
        
        
    }

    //    GetAddressByMap(lk, lk.latitude, lk.longitude, lk.baiduLat, lk.baiduLng);

    if (!isFortime) {
        forTimeMethod();
        isFortime = true;
    }
}


function GetMarkerInfo(lk) {

    return GetPopupHtml(lk, lk.latitude, lk.longitude);
}

function GetAddressByMap(lat, lng, baidulat, baidulng) {
    //如果语言为中文,则用谷米
    //为英文,用google
    if (language == "zh-cn") {
        GetAddressByGoome(baidulat, baidulng);
    } else {
        GetAddressByGoogle(lat, lng);
    }

}
var geocoder = new google.maps.Geocoder();
//获取地址信息
function GetAddressByGoogle(lat, lng) {
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }
    if (lat != 0) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $("#divMarkerAddress").html(results[1].formatted_address);
                } else {

                }
            } else {

            }
        });
    }
}