var oLat = 25.502;
var oLng = 113.932;
var oZoom = 6;

function initGaodeMap(lat, lng, zoom) {

    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        map = new AMap.Map("map_canvas"); // 创建地图实例  
        var point = new AMap.LngLat(lng, lat); // 创建点坐标  
        map.setZoomAndCenter(zoom, point);                     // 初始化地图,设置中心点坐标和地图级别。

        map.plugin(["AMap.ToolBar", "AMap.OverView,AMap.Scale"], function () {
            // 加载工具条  
            var tool = new AMap.ToolBar({ direction: true, // 隐藏方向导航  
                ruler: true, // 隐藏视野级别控制尺  
                autoPosition: false, // 禁止自动定位
                offset: new AMap.Pixel(10, 30)
            });
            map.addControl(tool);
            // 加载比例尺  
            var scale = new AMap.Scale();
            map.addControl(scale);
        });
    } catch (e) {//alert(e);
        //initGaodeMap(lat, lng, zoom);
    }
}