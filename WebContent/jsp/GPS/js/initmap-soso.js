var oLat = 25.502;
var oLng = 115.932;
var oZoom = 6;

function initSOSOMap(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        var latlng = new soso.maps.LatLng(lat, lng);
        map = new soso.maps.Map(document.getElementById("map_canvas"), {
            // 地图的中心地理坐标。
            center: latlng
        });
        map.setZoomLevel(oZoom);

        //缩放控件
        var navControl = new soso.maps.NavigationControl({
            align: soso.maps.ALIGN.TOP_LEFT,
            margin: new soso.maps.Size(5, 15),
            map: map
        });

        var scaleControl = new soso.maps.ScaleControl({
            align: soso.maps.ALIGN.BOTTOM_RIGHT,
            margin: new soso.maps.Size(30, 15),
            map: map
        });

        var maptypectrl = new soso.maps.MapTypeControl({ map: map }); //地图类型
    } catch (e) {

    }
}