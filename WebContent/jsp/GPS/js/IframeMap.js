var map = null;
var UserId = null;
var isShowDeviceName = true;
var forTimer = 10000;
var forTimeSecond = null;
var isFortime = false;
var language = "zh-cn";
var showPopupmarker = null; // 信息弹出框
var showPopupmarkerID = 0;
var status = 0;
var timeZone = "";
var drawingManager = null;
var currRact = null;
var MapType = "";
var plateno = "";

(function ($, win) { 
    var rectState = false, 
        isAddRect = false;

    $.setRectState = function (state) {
        if (!/boolean/.test(typeof state)) {
            return;
        }
        
        rectState = state;
    };

    $.getRectState = function () {
        return rectState;
    };

    $.setIsAddRect = function (rectResult) {
        isAddRect = rectResult;
    };

    $.getIsAddRect = function () {
        return isAddRect;
    };

    $.fn.moveOver = function (ev) {
        var $self = null;
        
        ev = ev || window.event;
        if (/function/.test(typeof this)) {
            return;
        }

        $self = $(this);
        $self.css("color", "red");
        ev.stopPropagation();
    };

    $.fn.moveOut = function (ev) {
        var $self = null;
        
        ev = ev || window.event;
        if (/function/.test(typeof this)) {
            return;
        }

        $self = $(this);
        $self.css("color", "#0077ff");
        ev.stopPropagation();
    };
})(jQuery, window);

$(document).ready(function () {
    // $("#lbtnSetBMapCenter").hide();
    language = $("#hidLanguage").val();
    timeZone = $("#hidTimeZone").val();
    status = parseInt(-1);
    addSelMap();
    UserId = $("#hidUserID").val();
    syncSize();



    /* 原地图加载方法 */
    // initmap();
    // init();
    // $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    // //加载全部车辆
    // // parent.getGroup();
    // if ($("#areaListPanel").length > 0) {
    // $("#areaListPanel").easydrag();
    // }


    /* 动态加载地图方法 */
    // $("#MapSrc").attr("src", ($.trim($("#hidSelMap").val()) == "Google" ?
	// "http://ditu.google.cn/maps/api/js?sensor=false&language=cn" :
	// "http://api.map.baidu.com/api?v=1.3"));
    // $("#initScript").attr("src", ($.trim($("#hidSelMap").val()) == "Google" ?
	// "initmap-Google.js" : "initmap-Baidu.js"));
    // loadBMap();
    // setTimeout(function () {
    // if ($.trim($("#hidSelMap").val()) == "" || $.trim($("#hidSelMap").val())
	// == "Baidu") {
    // loadBMap();
    // } else if ($.trim($("#hidSelMap").val()) == "Google") {
    // loadGgMap();
    // }
    // }, 1500);


    // parent.clearInterval(parent.timer);
    if (parent != null && parent.$ != null && parent.$.setMapType != null) {
        parent.$.setMapType($.trim($("#hidSelMap").val()));
    }
    if ($.trim($("#hidSelMap").val()) == "" || $.trim($("#hidSelMap").val()) == "Baidu") {
        loadBMap();

        if (location.href.indexOf("IframeMap.aspx") > 0) {
            $("#lbtnSearchArea,#lbtnSearchPosition,#lbtnSetBMapCenter,#divMapTool").show();
        }
    } else if ($.trim($("#hidSelMap").val()) == "Google") {
        loadGgMap();

        if (location.href.indexOf("IframeMap.aspx") > 0) {
            $("#lbtnSearchPosition,#lbtnSetBMapCenter").show();
            $("#lbtnSearchArea,#divMapTool").hide();
            // $("#divMapTool").hide();
        }
    } else if ($.trim($("#hidSelMap").val()) == "Gaode") {
        loadGdMap();

        if (location.href.indexOf("IframeMap.aspx") > 0) {
            $("#lbtnSearchArea,#lbtnSearchPosition,#lbtnSetBMapCenter,#divMapTool").hide();
        }
    } else if ($.trim($("#hidSelMap").val()) == "soso") {
        loadSosoMap();

        if (location.href.indexOf("IframeMap.aspx") > 0) {
            $("#lbtnSearchArea,#lbtnSearchPosition,#lbtnSetBMapCenter,#divMapTool").hide();
        }
    }
});

// 加载百度地图
function loadBMap() {
    initmap();
    if (parent != null && parent.$ != null && parent.$.setCenterPoint != null &&
        parent.$.setMapObj != null) {
        parent.$.setCenterPoint(map.getCenter());
        parent.$.setMapObj(map);
    }
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    // 加载全部车辆
    // parent.getGroup();
// if ($("#areaListPanel").length > 0) {
// $("#areaListPanel").easydrag(false, ["areaDragPanel"]);
// $("#areaListPanel").setHandler('areaListHead');
// }

    MrkArr = new Array();
    if (parent.zTree != null && parent.zTree.getSelectedNode() != null) {
        parent.zTreeOnClick(window.event, parent.zTree.getSelectedNode().id, parent.zTree.getSelectedNode());
    }
// $("#lbtnSetBMapCenter").show();
}

// 加载谷歌地图
function loadGgMap() {
    $("#linkMap").attr("href", "");
    initmap();
    if (parent != null && parent.$ != null && parent.$.setMapObj != null &&
        parent.$.setCenterPoint != null) {
        parent.$.setMapObj(map);
        parent.$.setCenterPoint(map.getCenter());
    }
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    if ($("#areaListPanel").length > 0) {
        $("#areaListPanel").easydrag();
    }

    MrkArr = new Array();
    if (parent.zTree != null && parent.zTree.getSelectedNode() != null) {
        parent.zTreeOnClick(window.event, parent.zTree.getSelectedNode().id, parent.zTree.getSelectedNode());
    }
// $("#lbtnSetBMapCenter").hide();
// map.panTo(new google.maps.LatLng(41.4213567, 123.3364517));
// map.setZoom(16);
// alert("谷歌地图还在开发中");
}

// 加载高德地图
function loadGdMap() {
    initmap();
    if (parent != null && parent.$ != null && parent.$.setCenterPoint != null &&
        parent.$.setMapObj != null) {
        parent.$.setCenterPoint(map.getCenter());
        parent.$.setMapObj(map);
    }
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    // 加载全部车辆
    // parent.getGroup();
    if ($("#areaListPanel").length > 0) {
        $("#areaListPanel").easydrag();
    }

    MrkArr = new Array();
    if (parent.zTree != null && parent.zTree.getSelectedNode() != null) {
        parent.zTreeOnClick(window.event, parent.zTree.getSelectedNode().id, parent.zTree.getSelectedNode());
    }
    // $("#lbtnSetBMapCenter").show();
}

// 加载soso地图
function loadSosoMap() {
    initmap();
    clearMap();
    if (parent != null && parent.$ != null && parent.$.setCenterPoint != null &&
        parent.$.setMapObj != null) {
        parent.$.setCenterPoint(map.getCenter());
        parent.$.setMapObj(map);
    }
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);

    MrkArr = new Array();
    if (parent.zTree != null && parent.zTree.getSelectedNode() != null) {
        parent.zTreeOnClick(window.event, parent.zTree.getSelectedNode().id, parent.zTree.getSelectedNode());
    }
}

function preparedLoad () {
    language = $("#hidLanguage").val();
    timeZone = $("#hidTimeZone").val();
    status = parseInt(-1);
    addSelMap();
    UserId = $("#hidUserID").val();
    syncSize();
    initmap();
    init();
}

function init() {
    document.onmousemove = mouseMove;
}

// 初始化鼠标绘制工具
function initDrawing() {
    var styleOptions = {
            strokeColor: "red",    // 边线颜色。
            fillColor: "red",      // 填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       // 边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' // 边线的样式，solid或dashed。
        }, 
        drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, // 是否开启绘制模式
            enableDrawingTool: true, // 是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
                offset: new BMap.Size(55, 0), // 偏离值
                scale: 0.8 // 工具栏缩放比例
            },
            circleOptions: styleOptions, // 圆的样式
            polylineOptions: styleOptions, // 线的样式
            polygonOptions: styleOptions, // 多边形的样式
            rectangleOptions: styleOptions // 矩形的样式
        });
    window.drawingManager = drawingManager;
}

function areaSearch() {
    var rectSearch = new BMapLib.SearchInRectangle(map, "", {
        renderOptions: {
            map: map,
            strokeWeight: 3,
            strokeColor: "red",
            fillColor: "white",
            opacity: 0.5,
            followText: "拖拽鼠标搜索" + "" + "",
            autoClose: true,
            autoViewport: false,
            alwaysShowOverlay: false
        }
    });
    rectSearch.setLineStyle("dashed");
    alert(rectSearch.local.setMarkersSetCallback);
    rectSearch.local.setMarkersSetCallback(function () {
        alert("进来了");
    });
    rectSearch.open();
}


var mouseleft = 0;
var mousetop = 0;

function mouseMove(e) {
    if (!document.all) {

        mouseleft = e.pageX;
        mousetop = e.pageY;
    } else {
        mouseleft = document.body.scrollLeft + event.clientX;
        mousetop = document.body.scrollTop + event.clientY;
    }

}


function addSelMap() {
// var language = $("#hidLanguage").val();
// var optGoogle = '<option value="Google">' + iframeMapPage.googleMap +
// '</option>';
// // $('#selMap').append(optGoogle);
// if (language == "zh-cn") {
// var optBaidu = '<option value="Baidu">' + iframeMapPage.baiduMap +
// '</option>';
// var optGaode = '<option value="Gaode">' + '高德地图' + '</option>';
// var optSOSO = '<option value="soso">' + '搜搜地图' + '</option>';
// // $('#selMap').append(optBaidu);
// // $('#selMap').append(optGaode);
// // $('#selMap').append(optSOSO);
// } else if (language == "en-us") {

// }
// var optOSM = '<option value="OSM">' + 'OpenStreetMap' + '</option>';
// // $('#selMap').append(optOSM);
// var defaultMap = $("#hidSelMap").val();
// $("#selMap option[value='" + defaultMap + "']").attr("selected", "selected");

    $("#selMap").val($.trim($("#hidSelMap").val()));
}

function changeMap() {
    var m = $('#selMap').val();

    var n = $("#hidLoginName").val();
    var url = ""
    n = encodeURIComponent(n);

    if (parent.removeShowMoreDivDevice != null) {
        parent.removeShowMoreDivDevice();
    } else {
// removeShowMoreDivDevice();
    }
// parent.removeShowMoreDivDevice();

    url = location.href.substring(0, location.href.lastIndexOf("?")) + "?MapType=" + m;
    if ($("#hidDeviceID").length > 0) {
        url += "&deviceid=" + $.trim($("#hidDeviceID").val());
    }
    url += "&searchPosition=" + $.trim($("#txtSearchPosition").val());
    location.href = url;
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8 - 15; 
    $("#map_canvas").css("height", h + "px");
}

function forTimeMethod() {
    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

function checkShowDeviceName(v) {
    if (isShowDeviceName != v) {
        if (v) {
            ShowDeviceName();
        } else {
            HideDeviceName();
        }
        isShowDeviceName = v;
    }
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        parent.ajaxGetDevices();
        secondIndex = 0;
    }

}

function clearSecond() {
    secondIndex = 1;
    if (forTimeSecond) {
        clearInterval(forTimeSecond);
        clearAllMap();
        isFortime = false;
    }
}

function GetInfoWContx(data) {
// return testABC();
    return GetPopupHtml(data);
}

function GetPopupHtml(data) {
    var html = [];
// var imghtml = "<img style='float:right' onclick='HideDeviceInfo(" + data.id +
// ")' border='0' src='images/iw_close.gif'/>";
    var imghtml = "<img style='float:right' onclick='javascript:HideDeviceInfo(" + data.id + ");' border='0' src='images/iw_close.gif'/>";
    var img2html = "";
    if (data.img != "") {
// img2html = "<img style='float:right' width='100' height='110' border='0'
// src='" + data.img + "'/>";
        img2html = "";
    }
    html.push("<b>" + data.name + "</b>" + imghtml + "<br />");
    html.push("<b>" + allPage.imeiNo + ":</b>" + data.sn + img2html + "<br />");
    var status = getDeviceStatus(data.status);
    // html.push("<b>" + allPage.state + ":</b>" + status + "<br />");
    html.push("<b>" + allPage.state + ":</b>" + data.Status + "<br />");
    if (data.model == 12 || data.model == 18 || data.model == 25 || data.model == 80 || data.model == 21 || data.model == 51 || data.model == 15 || data.model == 17 || data.model == 26 || data.model == 23 || data.model == 27 || data.model == 50 || data.model == 74) {
        // GT06 宏远
        var accStr = GetAccStr(data.dataContext);
        html.push("<b>" + allPage.accStr + ":</b>" + accStr + "<br />");
    } else if (data.model > 60 && data.model < 80) {
        // 天琴协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 3) {
                if (carStateArr[0] != "") {
                    carStateStr = carStateArr[0] == "1" ? mapPage.accOn : mapPage.accOff;
                }
                if (carStateArr[1] != "") {
                    carStateStr += "," + (carStateArr[1] == "1" ? mapPage.fortify : mapPage.dismiss);
                }
                if (carStateArr[2] != "") {
                    carStateStr += "," + (carStateArr[2] == "1" ? mapPage.carOpen : mapPage.carClose);
                }
                if (carStateArr[3] != "") {
                    carStateStr += "," + (carStateArr[3] == "1" ? mapPage.zdlj : mapPage.zddk);
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 102 || data.model >= 110) {
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-'); 
            if (carStateArr.length >= 5) {
                if (carStateArr[4] != "") {
                    carStateStr = carStateArr[4] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + yiwen201405.battery + ':' + "</b>" + carStateStr + "<br />");
        }
    }
// html.push("<b>" + allPage.positionTime + ":</b>" + data.deviceUtcDate + "<br
// />");
    html.push("<b>" + allPage.positionTime + ":</b>" + data.SendTime + "<br />");
    var timeStr = minuteToStr(data.stopTimeMinute);
    if (data.isStop == 1) {
        html.push("<b>" + allPage.stopTime + ":</b>" + timeStr + "<br />");
    } else {
        var courseName = GetCoureName(data.course);
        html.push("<b>" + allPage.drection + ":</b>" + courseName + "<br />");
        // html.push("<b>" + allPage.speed + ":</b>" + data.speed.toFixed(2) +
		// allPage.speedKM + "<br />");
        html.push("<b>" + allPage.speed + ":</b>" + (parseFloat(data.speed) * 3.6).toFixed(2) + allPage.speedKM + "<br />");
    }
    if (data.CarIndustry != 1) {
        html.push("<b>打表状态:</b>" + (data.MeterStatus == 1 ? "已打表" : "未打表") + "<br />");
    }
    var gpslbs = data.dataType == "2" ? "LBS" : "GPS";
    html.push("<b>" + allPage.positionType + ":</b>" + gpslbs + "<br />");
    html.push('<span>');
    plateno = data.name;
    // html.push('<a href="javascript:void(0);"
	// onclick="openPage(\'Tracking.aspx\',' + UserId + ',' + data.id + ')" >' +
	// allPage.tracking + '</a>&nbsp;');
    // 实时跟踪链接
    MapType = $.trim($("#hidSelMap").val());
    // alert(MapType);
    html.push('<a href="javascript:void(0);" style="color:#0077ff" onclick="openPage(\'Tracking.aspx\',' + UserId + ',' + data.id + ')" onmouseover="$(this).moveOver(window.event)" onmouseout="$(this).moveOut(window.event)">' + allPage.tracking + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);" style="color:#0077ff"  onclick="openPage(\'Playback.aspx\','+ UserId + ',' + data.id + ')" onmouseover="$(this).moveOver(window.event)" onmouseout="$(this).moveOut(window.event)">' + allPage.playback + '</a>&nbsp;');
    if ($.trim(MapType) == "Google") {
        html.push('<a href="javascript:void(0);" style="color:#0077ff"  onclick="openPage(\'GoogleGeofences/Geofences.aspx\',' + UserId + ',' + data.id + ')" onmouseover="$(this).moveOver(window.event)" onmouseout="$(this).moveOut(window.event)">' + geofencesPage.geofence + '</a>&nbsp;');
    }
    if ($.trim(MapType) == "Baidu") {
        html.push('<a href="javascript:void(0);" style="color:#0077ff"  onclick="openPage(\'AreaSearch.aspx\',' + UserId + ',' + data.id + ')" onmouseover="$(this).moveOver(window.event)" onmouseout="$(this).moveOut(window.event)">区域查询</a>&nbsp;');
    }
    if (data.model == 72 || data.model == 73 || data.model == 74) {
        html.push('<a href="javascript:void(0);"  onclick="parent.showDivIframe(\'OBDIndex.aspx\',' + data.id + ')">' + mapPage.obdChecking + '</a>&nbsp;');
    }
    // html.push('<a href="javascript:void(0);" onclick="clkShowMoreMenu(' +
	// data.id + ',' + data.model + ',\'' + data.name + '\',\'' + data.sn +
	// '\');">' + allPage.more + '▼</a>');
    // 调试
    html.push('<br/>地址：<label style="display: none;">' + data.baiduLng + ',' + data.baiduLat + '</label><label style="cursor: pointer; color: #0077ff;" onclick="getAddressByBMap($(this).prev(), null, \'' + data.Location + '\');$(this).hide();" onmouseover="$(this).css({\'color\': \'red\', \'text-decoration\': \'underline\'})" onmouseout="$(this).css({\'color\': \'#0077ff\', \'text-decoration\': \'none\'})">点击获取地址</label>');
    if (data.img != "") {
        html.push('<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    }
    html.push("</span>");
    html.push("<br />&nbsp;&nbsp;");
    // 调试
// html.push("<span>");
// html.push(data.Location);
// html.push("</span>");
    return html.join('');
}

function openPage(url, userid, deviceid) {
    var p = IDEncryption(deviceid);
    plateno = encodeURI(plateno);
    plateno = encodeURI(plateno);
    var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + '&plateNo=' + plateno +  "&MapType=" + MapType + "&p=" + p;
    window.open(openUrl);
}

// openPage改
// function openPage(url, userid, deviceid, json) {
// var p = IDEncryption(deviceid);
// var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;

// if (json != null && /string/.test(typeof json)) {
// openUrl += "&json=" + json;
// }
// window.open(openUrl);
// }

var intervalDeviceMore = null;
function clkShowMoreMenu(deviceid, model, name, sn) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'ProductUpdate.aspx\',' + deviceid + ');">' + mapPage.divicesInfo + '</a></div>');

    if (status != 1) {
        /*
		 * //GT06,AW02,GT07,GT06,GT06N 断油电,恢复油电,checklocation if (model == 12 ||
		 * model == 18 || model == 80 || model == 81 || model == 15 || model ==
		 * 17 || model == 26) { html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'DYD\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'HFYD\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid +
		 * ',\'CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' +
		 * mapPage.checkLocation + '</a></div>'); } else if (model == 25) {
		 * //GT06C html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'C001ON\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'C001OFF\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'Q001\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>'); }
		 * else if (model == 50 || model == 83) { //宏远 html.push('<div
		 * style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'AV010\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'AV011\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>'); }
		 * else if (model == 40 || model == 43 || model == 44 || model == 45 ||
		 * model == 46 || model == 47) { //明达 html.push('<div
		 * style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'MDDYD\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
		 * html.push('<div style="padding-top:2px;"
		 * onmouseover="this.style.backgroundColor=\'#F0F0F0\';"
		 * onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a
		 * href="javascript:parent.showPassword(' + deviceid + ',\'MDHFYD\',\'' +
		 * name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>'); }
		 */

        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:parent.showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');
        if (status != 2) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');
        }
    }

    html.push('<div style="height:6px;"></div>');
    html.push("</div>");
    $("#divLeftMenuContext").html(html.join(''));
    var menuHeight = $("#divLeftMenu").height();
    var top = $(this).height() - mousetop;
    var marginTop = 5;
    if (top > menuHeight) {
        marginTop = 5;
    } else {
        marginTop = menuHeight;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    $(".showdivs").mouseover(function () {
        $(".showitems").eq($(".showdivs").index(this)).show();
    }).mouseleave(function () {
        $(".showitems").eq($(".showdivs").index(this)).hide();
    });
}

function hideMoreItems() {// 隐藏更多功能选项

    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    intervalDeviceMore = setInterval(function () {
        document.getElementById("divLeftMenu").style.display = "none";
        clearInterval(intervalDeviceMore);
    }, 1000)

}

function getDeviceStatus(s) {
    var status = "";
    if (s == "LoggedOff") {
        status = allPage.status1;
    } else if (s == "Move") {
        status = allPage.moving;
    } else if (s == "Stop") {
        status = allPage.stopCar;

    } else if (s == "Offline") {
        status = allPage.offline;
    } else if (s == "Arrears") {
        status = allPage.arrears;
    }
    return status;
}


// 显示POI
var poiJson = null;
function showPOIMap(uid) {
    poiJson = null;
    var m = $('#selMap').val();
    if (m == "Baidu") {
        $.ajax({
            type: "post",
            url: "Ajax/GeofenceAjax.asmx/GetPOI",
            contentType: "application/json",
            data: "{UserID:" + uid + ",TimeZone:'" + timeZone + "'}",
            dataType: "json",
            error: function (res) {
                // alert(res.responseText);
            },
            success: function (result) {
                if (result.d != "" && result.d != "{}") {
                    var json = eval("(" + result.d + ")");
                    poiJson = json;
                    showPOIInMap();
                }
            }
        });
    }
}


// 分钟转换到天小时分钟格式
function minuteToStr(minute) {

    var time = "";

    var day = parseInt(minute / 60 / 24);
    var hour = parseInt((minute / 60) - (day * 24));
    var minu = (minute) - (day * 24 * 60) - (hour * 60);
    if (day > 0) {
        time = day + allPage.day;
        time += hour + allPage.hour;
        time += minu + allPage.minute;
    } else if (hour > 0) {
        time = hour + allPage.hour;
        time += minu + allPage.minute;
    } else {
        time = minu + allPage.minute;
    }

    return time;

}


function GetAddress(id) {
    GetAddressByMap(id);
}

function getAddressByBMap($dom, flag, addressPara) {
    var point = null, addressStr = "", lng = 0, lat = 0, text = "", 
        geocoder = null, gpsInfoArr = [];

    if ($dom == null || $dom.length == null || $dom.length == 0) {
        return;
    }

    text = $dom.html();
    if (!/^\d+(\.\d+)?,\d+(\.\d+)?$/.test(text)) {
        return;
    }

    lng = parseFloat(text.split(",")[0]);
    lat = parseFloat(text.split(",")[1]);
    if (lng == null || lat == null ||
        lng * 1000000 < 72000000 || lat * 1000000 > 136000000 ||
        lat * 1000000 < 3000000 || lat * 1000000 > 54000000 ||
        !/\d+(\.\d+)?,\s*\d+(\.\d+)?/.test($dom.text())) {
        return;
    }

    // 百度地图获取地址
    if ($.trim($("#selMap").val()) == "Baidu") {
        geocoder = new BMap.Geocoder();
        point = new BMap.Point(lng, lat);

        geocoder.getLocation(point, function (rs) {
            var addComp = null;

            if (rs != null) {
                addComp = rs.addressComponents;

                if ($dom != null && $dom.length != null && $dom.length > 0) {
                    if (/input|select|textarea/.test($dom.prop("tagName").toLowerCase())) {
                        $dom.val(rs.address);
                    } else {
                        $dom.html(rs.address + (flag ? "(" + text + ")" : ""));
                        $dom.parents("td:first").css("text-align", "center");
                        $dom.css("text-decoration", "none");
                        $dom.show();
                    }
                }
            }
        });
    }
    // 谷歌地图获取地址
    else if ($.trim($("#selMap").val()) == "Google") {
        geocoder = new google.maps.Geocoder();
        point = new google.maps.LatLng(lat, lng);

        geocoder.geocode({ 'latLng': point }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    if (/input|select|textarea/.test($dom.prop("tagName").toLowerCase())) {
                        $dom.val(results[0].formatted_address.split(" ")[0]);
                    } else {
                        $dom.html(results[0].formatted_address.split(" ")[0] + (flag ? "(" + text + ")" : ""));
                        $dom.parents("td:first").css("text-align", "center");
                        $dom.css("text-decoration", "none");
                        $dom.show();
                    }

// var address = results[1].formatted_address + "<br />";
// address = results[0].formatted_address + "<br />";
// address += "纬度：" + latlng.lat() + "<br />";
// address += "经度：" + latlng.lng();

// infowindow.setContent(address);
// infowindow.open(map, marker);
                }
            } else {
// alert("Geocoder failed due to: " + status);
            }
        });
    }
    // 搜搜地图获取地址
    else if ($.trim($("#selMap").val()) == "soso") {
        geocoder = new qq.maps.Geocoder({
            "complete": function (reoResult) {
                if (reoResult != null) {
                    if (/input|select|textarea/.test($dom.prop("tagName").toLowerCase())) {
                        $dom.val(reoResult.detail.address);
                    } else {
                        $dom.html(reoResult.detail.address + (flag ? "(" + text + ")" : ""));
                        $dom.parents("td:first").css("text-align", "center");
                        $dom.css("text-decoration", "none");
                        $dom.show();
                    }
                }
            }
        });
        point = new qq.maps.LatLng(lat, lng);
        geocoder.getAddress(point);
        
    }
    // 高德地图获取地址
    else if ($.trim($("#selMap").val()) == "Gaode") {
        if ($.trim(addressPara) != null) {
            if (/input|select|textarea/.test($dom.prop("tagName").toLowerCase())) {
                $dom.val(addressPara);
            } else {
                $dom.html(addressPara + (flag ? "(" + text + ")" : ""));
                $dom.parents("td:first").css("text-align", "center");
                $dom.css("text-decoration", "none");
                $dom.show();
            }
        }
    }

    return addressStr;
}

// 判断长度,一个中文为2
function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
            sum = sum + 1;
        else
            sum = sum + 2;
    }
    return sum;
}

function refreshAtIframe() {
    var zTree = parent.zTree, selectedNode;

    if (zTree == null) {
        return;
    }

    if (zTree.getSelectedNode() != null) {
        selectedNode = zTree.getSelectedNode();
        parent.zTreeOnClick(window.event, selectedNode.id, selectedNode);
    }
}

// 设置当前位置为百度地图中心
function setBMapCenter() {
    var centerPoint = null;

    if (parent == null || parent.$ == null || parent.$.getCenterPoint == null) {
        return;
    }

    if (parent.$.getCenterPoint() == null) {
        return;
    }

    centerPoint = parent.$.getCenterPoint();
    if (window.map != null) {
        map.setCenter(centerPoint);
    }
}

function searchArea($dom) {
    var styleOptions = null;

    if (parent.zTree.getSelectedNode() == null) {
        return;
    }

    if ($.trim($("#selMap").val()) == "Baidu") {
        if (!$.getRectState()) {
            $.setRectState(true);
            styleOptions = {
                strokeColor: "#a0b1c5",    // 边线颜色。
                fillColor: "silver",      // 填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3,       // 边线的宽度，以像素为单位。
                strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid'  // 边线的样式，solid或dashed。
            };
            drawingManager = drawingManager == null ? new BMapLib.DrawingManager(map, {
                isOpen: false, // 是否开启绘制模式
                enableDrawingTool: false, // 是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
                    offset: new BMap.Size(5, 5), // 偏离值
                    scale: 0.8, // 工具栏缩放比例
                    drawingModes: [BMAP_DRAWING_RECTANGLE]
                },
                circleOptions: styleOptions, // 圆的样式
                polylineOptions: styleOptions, // 线的样式
                polygonOptions: styleOptions, // 多边形的样式
                rectangleOptions: styleOptions // 矩形的样式
            }) : drawingManager;

            drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
            drawingManager.open();
    // drawingManager.removeEventListener("rectanglecomplete");
            if (!$.getIsAddRect()) {
                drawingManager.addEventListener("rectanglecomplete", function (overlay) {
                    var gpsInfoArr = null, showGpsInfoArr = null, bounds = null, point = null;

                    if (overlay.getBounds().toSpan().lng == 0 || overlay.getBounds().toSpan().lat == 0) {
                        return;
                    }

                    if (currRact != null) {
                        map.removeOverlay(currRact);
                    }
                    map.addOverlay(overlay);
                    currRact = overlay;

                    gpsInfoArr = parent.$.getGpsInfo();
                    if (gpsInfoArr != null && gpsInfoArr.length > 0) {
                        bounds = currRact.getBounds();
                        for (var i = 0; i < gpsInfoArr.length; i++) {
                            point = new BMap.Point(gpsInfoArr[i].Longitude, gpsInfoArr[i].Latitude);
                            if (bounds.containsPoint(point)) {
                                showGpsInfoArr = showGpsInfoArr == null ? [] : showGpsInfoArr;
                                showGpsInfoArr.push(gpsInfoArr[i]);
                            }
                        }
    // showAreaInfo(overlay, gpsInfoArr);
                        showAreaInfo(overlay, showGpsInfoArr);
                    }

                    $.setIsAddRect(true);
                });
            }
        } else {
            $.setRectState(false);
            drawingManager.close();
            if (currRact != null) {
                map.removeOverlay(currRact);
            }
            $("#areaListPanel").hide();
    // $("#tbRealTimeCtrl tbody tr").remove();
        }
    } else if ($.trim($("#selMap").val()) == "Google") {
        alert("谷歌地图区域查车尚在开发中");
    }
}

function showAreaInfo(overlay, gpsInfoArr) {
    var gpsInfo = null, bounds = null, geocoder = null, point = null, index = 0, count = 0;

    if (overlay == null) {
        return;
    }

// bounds = overlay.getBounds();
    $("#tbRealTimeCtrl tbody tr").remove();

    geocoder = new BMap.Geocoder();
    if (gpsInfoArr != null && gpsInfoArr.length > 0) {
        gpsInfo = gpsInfoArr[index++];
        if (gpsInfo != null) {
            point = new BMap.Point(gpsInfo.Longitude, gpsInfo.Latitude);
            geocoder.getLocation(point, function (result) {
                if (result != null) {
                    gpsInfo.Location = result.address;
                    $("#tbRealTimeCtrl tbody").append(
                        "<tr style=\"background: #F5F5F5; font-family: 微软雅黑; height: 25px;\">" +
                            "<td style=\"text-align: center; width: 30px; padding: 0px;\">" +
                                (++count) +
                            "</td>" +
                            "<td style=\"text-align: center; width: 100px; padding: 0px;\">" +
                                gpsInfo.PlateNo +
                            "</td>" +
                            "<td style=\"text-align: center; width: 40px; padding: 0px;\">" +
                                gpsInfo.Velocity +
                            "</td>" +
                            "<td style=\"text-align: center; width: 36px; padding: 0px;\">" +
                                GetCoureName(gpsInfo.Direction) +
                            "</td>" +
                            "<td style=\"text-align: center; width: 58px; padding: 0px;\">" +
                                (gpsInfo.Online ? "在线" : "离线") +
                            "</td>" +
                            "<td style=\"text-align: center; width: 48px; padding: 0px;\">" +
                                (
                                    gpsInfo.CarIndustry == 0 && gpsInfo.MeterStatus == 1 ? "已打表" :
                                        gpsInfo.CarIndustry == 0 && gpsInfo.MeterStatus == 0 ? "未打表" : ""
                                ) +
                            "</td>" +
                            "<td style=\"text-align: center; padding: 0px;\">" +
                                gpsInfo.Location +
                            "</td>" +
                        "</tr>"
                    );
                }

                gpsInfo = gpsInfoArr[index++];
                if (gpsInfo != null) {
                    point = new BMap.Point(gpsInfo.Longitude, gpsInfo.Latitude);
                    geocoder.getLocation(point, arguments.callee);
                }
            });
            $("#areaListPanel").css({
                "top": (($(window).height() - 220) / 2) + "px",
                "left": (($(window).width() - 550 - 150) / 2) + "px"
            });
            $("#areaListPanel").show();
        }
    }
}