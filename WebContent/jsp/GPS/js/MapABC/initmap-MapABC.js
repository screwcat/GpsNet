var oLat = 29.502;
var oLng = 118.932;
var oZoom = 6;

//  MapABC地图初始化
function initMapABC(lat, lng, zoom) {
    var mapoption = null;
    
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }

        mapoption = new MMapOptions();
        mapoption.toolbar = MConstants.ROUND; //设置地图初始化工具条，ROUND:新版圆工具条 
        mapoption.toolbarPos = new MPoint(20, 20); //设置工具条在地图上的显示位置 
        //            mapoption.overviewMap = MConstants.SHOW; //设置鹰眼地图的状态，SHOW:显示，HIDE:隐藏（默认） 
        mapoption.scale = MConstants.SHOW; //设置地图初始化比例尺状态，SHOW:显示（默认），HIDE:隐藏。 
        mapoption.zoom = zoom; //要加载的地图的缩放级别 
        mapoption.center = new MLngLat(lng, lat); //要加载的地图的中心点经纬度坐标 
        mapoption.language = MConstants.MAP_CN; //设置地图类型，MAP_CN:中文地图（默认），MAP_EN:英文地图 
        mapoption.fullScreenButton = MConstants.SHOW; //设置是否显示全屏按钮，SHOW:显示（默认），HIDE:隐藏 
        mapoption.centerCross = MConstants.SHOW; //设置是否在地图上显示中心十字,SHOW:显示（默认），HIDE:隐藏 
        mapoption.requestNum = 100; //设置地图切片请求并发数。默认100。 
        mapoption.isQuickInit = true; //设置是否快速显示地图，true显示，false不显示。 

        map = new MMap("map_canvas", mapoption);            // 创建Map实例
        
        var point = new BMap.Point(lng, lat);    // 创建点坐标
        map.centerAndZoom(point, zoom);                     // 初始化地图,设置中心点坐标和地图级别。


//        map.addControl(new BMap.NavigationControl({ offset: new BMap.Size(10, 30) }));                 // 添加平移缩放控件
//        map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
//        map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
//        map.enableScrollWheelZoom(); //激活滚轮
//        map.enableContinuousZoom(); //连续平滑
//        map.enableInertialDragging();   //开启惯性拖拽效果
//        map.setMinZoom(5);
//        //map.addControl(new BMap.MapTypeControl()); //地图,卫星,三维
//        map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }));
    } catch (e) {
        //initBaiduMap(lat, lng, zoom);
    }
}