var map = null;
var isSetZoom = true;

function initmap() {
    initGaodeMap(0, 0, 0);
}

var lastMarker = null;
var lastMarkerPoint = null;
var lastLocation = null;

var j = 0;
function showMarker(lk) {
    var startMrkPoint = null, startMrk = null, infoWindow = null;
    
    if (lk) {
        var latlng = new AMap.LngLat(lk.longitude, lk.latitude);
        if (isSetZoom) {
            map.setCenter(latlng);
            map.setZoom(14);
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
        var icon = GetIcon(iconType, "", lk.course);
        if (!lastMarker) {
            //首次
            var html = GetMarkerInfo(lk);
            lastMarkerPoint = new AMap.Marker({
                id: "show",
                position: latlng,
                icon: icon,
                offset: { x: -8, y: -22 }
            });
            map.addOverlays(lastMarkerPoint);
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
            map.addOverlays(lastMarker);
            map.setCenter(latlng);

            startMrk = new AMap.Marker({
                icon: "icons/start.png",
                position: latlng,
                offset: new AMap.Pixel(-12, -32)
            });
            infoWindow = new AMap.InfoWindow({
                content: html  //使用默认信息窗体框样式，显示信息内容
            });
            map.addOverlays(startMrk);
            map.bind(startMrk, "click", function (e) {
                //  这里显示信息弹窗
                infoWindow.open(map, latlng);
            });
        } else {
            //取出来的是新数据.
            if (lk.serverUtcDate != lastLocation.serverUtcDate) {
                var html = GetMarkerInfo(lk);
                var popup = new PopupMarker({
                    text: html
                });
                lastMarkerPoint.position = latlng;
                lastMarkerPoint.icon = icon; //用setIcon在IE8下会报错
                map.updateOverlay(lastMarkerPoint);

                lastMarker.setPosition(latlng);
                lastMarker.setContent(popup.html_);

                //描线
                var lastLatlng = new AMap.LngLat(lastLocation.longitude, lastLocation.latitude);
                var ArrayPolyPoints = new Array();
                ArrayPolyPoints.push(lastLatlng);
                ArrayPolyPoints.push(latlng);
                var mypoly = new AMap.Polyline({
                    id: "poly" + j,
                    path: ArrayPolyPoints,
                    strokeColor: "#00FF33",
                    strokeOpacity: 0.7,
                    strokeWeight: 7,
                    strokeStyle: "solid"
                });
                map.addOverlays(mypoly);
            }
        }
        lastLocation = lk;
    }
//    GetAddressByMap(lk.latitude, lk.longitude, lk.baiduLat, lk.baiduLng);
    if (!isFortime) {
        forTimeMethod();
        isFortime = true;
    }
    j++;
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