var map = null;
var isSetZoom = true;

function initmap() {
    initSOSOMap(0, 0, 0);
}

var lastMarker = null;
var lastLocation = null;
function showMarker(lk) {
    var geocoder = null, infoWin = null, 
        firstMrk = null;
    if (lk) {
        var latlng = new soso.maps.LatLng(lk.latitude, lk.longitude);

        geocoder = new qq.maps.Geocoder({
            "complete": function (reoResult) {

                lk.Location = reoResult.detail.address;

                if (isSetZoom) {
                    map.setCenter(latlng);
                    map.zoomTo(14);
                    isSetZoom = false;
                } else {
                    var LatLngBounds = map.getBounds();
                    var isMap = LatLngBounds.contains(latlng);
                    if (!isMap) {
                        map.moveTo(latlng);
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

                    firstMrk = new qq.maps.Marker({
                        "icon": "icons/start.png",
                        "position": latlng,
                        "map": map
                    });
                    qq.maps.event.addListener(firstMrk, "click", function () {
                        infoWin = new qq.maps.InfoWindow({
                            map: map
                        });
                        infoWin.setContent(html);
                        infoWin.setPosition(latlng);
                        infoWin.open();
                    });
                } else {
                    //取出来的是新数据.
                    if (lk.serverUtcDate != lastLocation.serverUtcDate) {
                        var html = GetMarkerInfo(lk);
                        var obj = { "position": latlng, "icon": icon, "text": html };
                        lastMarker.update(obj);
                        //描线
                        var lastLatlng = new soso.maps.LatLng(lastLocation.latitude, lastLocation.longitude);
                        var ArrayPolyPoints = new Array();
                        ArrayPolyPoints.push(lastLatlng);
                        ArrayPolyPoints.push(latlng);
                        var mypoly = new soso.maps.Polyline({
                            path: ArrayPolyPoints,
                            strokeColor: '#00FF33',
                            strokeWeight: 7,
                            strokeOpacity: 0.7,
                            editable: false,
                            map: map
                        });
                    }
                }
                lastLocation = lk;
            }
        });

        geocoder.getAddress(latlng);
    }
//    GetAddressByMap(lk.latitude, lk.longitude, lk.baiduLat, lk.baiduLng);
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

    }

}