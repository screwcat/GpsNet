//保存地图核心对象 
var map;
function onLoad() {
    //创建地图对象 
    map = new LTMaps("mapDiv");
    //将地图定位到北京,改动"shenyang"可以将地图定位到其他城市 
    map.centerAndZoom("shenyang", 5);
    //启用键盘 
    map.handleKeyboard();
    var control = new LTStandMapControl();
    //添加导航控件 
    map.addControl(control);
    //鼠标滚轮功能
    map.handleMouseScroll(true);
    map.mapCartoonControl(true);

    //Map51GIS.IntiMap();    
} 

