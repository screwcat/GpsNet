//别的地图JS中方法,必须要包含的有
//initmap,clearMap,addMarker,ShowOrHideDeviceInfo,clearAllMap,HideDeviceName
//其余地图JS方法名和功能,和这里面一致.

function initmap() {
    initGaodeMap(0, 0, 0);
}

var MrkArr = new Array(); //设备弹出框信息数组

//清除地图
function clearMap() {
    if (map) {
        try {
            map.clearMap();
        } catch (err) { }
    }
    MrkArr.length = 0;
}

//清除单个
function MapRemoveOneMrk(DeviceID) {
    var mrk = MrkArr[DeviceID];
    if (mrk == undefined) {
        return;
    }
    //清除设备标识
    if (mrk.Curmrk != undefined) {
        map.removeOverlays(mrk.Curmrk);
    }
    //清除设备名
    if (mrk.PopupMarDeviceName != undefined) {
        map.removeOverlays(mrk.PopupMarDeviceName);
        mrk.PopupMarDeviceName = undefined;
    }
    MrkArr[DeviceID] = undefined;

}

var j = 0;
//添加地标
function addMarker(data, callbackFun) {
    if (data.latitude == "") {
        return;
    }
    // alert(data.id);
    //设置数据
    if (MrkArr[data.id] == undefined) {
        MrkArr[data.id] = new Object();
    }
    MrkArr[data.id].data = data;
    var ct = new AMap.LngLat(data.longitude, data.latitude);
    //最后一次中心位置 
    if (parent.isSetMapCenter) {
        if (parseInt(data.latitude) == -1 && parseInt(data.longitude) == -1) {

        } else {
            map.setZoomAndCenter(8, ct);
            parent.isSetMapCenter = false;
        }
    }
    var icon = GetIcon(data.icon, data.status, data.course);
    if (MrkArr[data.id].Curmrk != undefined) {
        MrkArr[data.id].Curmrk.position = ct;
        MrkArr[data.id].Curmrk.icon = icon;
        map.updateOverlay(MrkArr[data.id].Curmrk);

    } else {
        MrkArr[data.id].Curmrk = new AMap.Marker({
            id: "show" + j,
            position: ct,
            icon: icon,
            offset: { x: -8, y: -22 }
        });
        map.addOverlays(MrkArr[data.id].Curmrk);
        //显示信息框
        map.bind(MrkArr[data.id].Curmrk, "click", function (e) {
            ShowDeviceInfo(data.id);

            if (/function/.test(typeof callbackFun)) {
                callbackFun(data.id);
            }
            //            GetAddress(data.id);
        });
    }
    if (showPopupmarkerID != data.id) {
        //显示设备名
        if (isShowDeviceName) {
//            alert(MrkArr[data.id].PopupMarDeviceName == undefined);
            if (MrkArr[data.id].PopupMarDeviceName == undefined) {
                ShowDeviceNameOnc(data.id);
            }
        } else {
        }
        if (MrkArr[data.id].PopupMarDeviceName != undefined) {
            MrkArr[data.id].PopupMarDeviceName.setPosition(ct);
        }
    } else {

        if (showPopupmarker) {
            var html = GetInfoWContx(MrkArr[data.id].data);
            var popup = new PopupMarker({
                text: html
            });
            showPopupmarker.setPosition(ct);
            showPopupmarker.setContent(popup.html_);
        } else {

        }
    }
    j++;
}

//显示设备信息
function ShowDeviceInfo(DeviceID, fun) {

    if (MrkArr[DeviceID] == undefined) {
        return;
    }
    if (showPopupmarker) {
        if (showPopupmarkerID != DeviceID) {
            map.removeOverlays(showPopupmarker);
            ShowDeviceNameOnc(showPopupmarkerID);
        }
    }
    if (!showPopupmarker || showPopupmarkerID != DeviceID) {
        ShowDeviceInfoContext(DeviceID);
        //隐藏设备名
        HideDeviceNameOne(DeviceID);
        showPopupmarkerID = DeviceID;
    }
}


//隐藏设备弹出框
function HideDeviceInfo(DeviceID) {
    if (showPopupmarker) {
        map.removeOverlays(showPopupmarker);
    }
    if (isShowDeviceName) {
        //显示设备名
        ShowDeviceNameOnc(DeviceID);
    }
    showPopupmarkerID = 0;
    showPopupmarker = null;
}

//切换用户时,使用,隐藏弹出框
function HidePopumarker() {
    if (showPopupmarker) {
        map.removeOverlays(showPopupmarker);
    }
    showPopupmarkerID = 0;
    showPopupmarker = null;
}

//切换在线,离线时使用
function HideShowPopumarker() {
    if (showPopupmarker) {
        map.removeOverlays(showPopupmarker);
    }
    showPopupmarker = null;
}

function ShowDeviceInfoContext(DeviceID) {
    var ct = new AMap.LngLat(MrkArr[DeviceID].data.longitude, MrkArr[DeviceID].data.latitude);
    var html = GetInfoWContx(MrkArr[DeviceID].data);
    var size = getSize(html);
    var offsetHeight = (size.height + 34) * -1;
    var popup = new PopupMarker({
        text: html
    });
    showPopupmarker = new AMap.Marker({
        id: "showPopupmarker",
        position: ct,
        offset: new AMap.Pixel(0, offsetHeight),
        icon: "",
        content: popup.html_,
        zIndex: 9999
    });
    map.addOverlays(showPopupmarker);
    map.panTo(ct);
}

function HideDeviceInfoContext(DeviceID) {
    if (showPopupmarker) {
        map.removeOverlays(showPopupmarker);
        showPopupmarker = null;
    }
    showPopupmarkerID = 0;
}


//显示设备名
function ShowDeviceName() {
    $(MrkArr).each(function (ind) {
        if (MrkArr[ind] != undefined) {
            ShowDeviceNameOnc(ind);
        }
    });
}
//显示单个设备名
function ShowDeviceNameOnc(ind) {
    //alert(ind);
//    if (MrkArr.length > 0) {
//        //MrkArr[ind] == undefined
//        if (MrkArr[ind].PopupMarDeviceName != undefined) {
//            HideDeviceNameOne(ind);
//        }
//        var ct = new AMap.LngLat(MrkArr[ind].data.longitude, MrkArr[ind].data.latitude);
//        var html = MrkArr[ind].data.name;
//        var size = getSize(html);
//        var offsetHeight = (size.height + 34) * -1;
//        var popup = new PopupMarker({
//            text: html
//        });
//        MrkArr[ind].PopupMarDeviceName = new AMap.Marker({
//            id: "popupMarDeviceName" + ind,
//            position: ct,
//            offset: new AMap.Pixel(0, offsetHeight),
//            icon: "",
//            content: popup.html_,
//            zIndex: 9999
//        });
//        map.addOverlays(MrkArr[ind].PopupMarDeviceName);
//    }
    
    //  修改之后的过程
    //MrkArr[ind] == undefined
    if (MrkArr[ind].PopupMarDeviceName != undefined) {
        HideDeviceNameOne(ind);
    }
    var ct = new AMap.LngLat(MrkArr[ind].data.longitude, MrkArr[ind].data.latitude);
    var html = MrkArr[ind].data.name;
    var size = getSize(html);
    var offsetHeight = (size.height + 34) * -1;
    var popup = new PopupMarker({
        text: html
    });
    MrkArr[ind].PopupMarDeviceName = new AMap.Marker({
        id: "popupMarDeviceName" + ind,
        position: ct,
        offset: new AMap.Pixel(0, offsetHeight),
        icon: "",
        content: popup.html_,
        zIndex: 9999
    });
    map.addOverlays(MrkArr[ind].PopupMarDeviceName);
}

//隐藏设备名
function HideDeviceName() {
    $(MrkArr).each(function (ind) {
        HideDeviceNameOne(ind);
    });
}
//隐藏单个设备名
function HideDeviceNameOne(ind) {
    if (MrkArr[ind] != undefined && MrkArr[ind].PopupMarDeviceName != undefined) {
        map.removeOverlays(MrkArr[ind].PopupMarDeviceName);
    }
}

function setMapCenter(DeviceID) {
    var ct = new AMap.LngLat(MrkArr[DeviceID].data.longitude, MrkArr[DeviceID].data.latitude);
    if (map) {
        map.setZoomAndCenter(16, ct);
    }
}

function clearAllMap() {

    clearMap();
    MrkArr.length = 0;
}

function GetAddressByMap(id) {

}
/*
//Google地址解析
var geocoder = new google.maps.Geocoder();
//获取地址信息
function GetAddressByMap(id) {
if (!geocoder) {
geocoder = new google.maps.Geocoder();
}
var lat = 0;
var lng = 0;
for (var i = 0; i < parent.allDevices.devices.length; i++) {
var d = parent.allDevices.devices[i];
if (d.id == id) {
lat = d.latitude;
lng = d.longitude
break;
}
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
*/
/*
//51地图位置解析,IE9下有BUG
//如要使用在MapApiControl中加载51地图的2个js文件
function GetAddressByMap(id) {
var reg = new LTRegoLoader();
var lat = 0;
var lng = 0;
for (var i = 0; i < parent.allDevices.devices.length; i++) {
var d = parent.allDevices.devices[i];
if (d.id == id) {
lat = d.latitude;
lng = d.longitude
break;
}
}
if (lat != 0) {
LTEvent.bind(reg, "loaded", reg, function (obj) {
$('#divMarkerAddress').html(obj.describe);
});
lng = parseFloat(lng) * 100000;
lat = parseFloat(lat) * 100000;
alert(lng + "  " + lat);
var point = new LTPoint(lng, lat);
reg.loadDescribe(point);
}
}*/


//百度地图解析
/*
function GetAddressByMap(id) {
if (!myGeo) {
myGeo = new BMap.Geocoder();
}
var lat = 0;
var lng = 0;
for (var i = 0; i < parent.allDevices.devices.length; i++) {
var d = parent.allDevices.devices[i];
if (d.id == id) {
lat = d.baiduLat;
lng = d.baiduLng
break;
}
}
if (lat != 0) {
// 根据坐标得到地址描述
myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
if (result) {
$('#divMarkerAddress').html(result.address);
}
});
}
}
*/

//谷米接口解析
function GetAddressByMap(id) {
    $('#divMarkerAddress').html("");
    var lat = 0;
    var lng = 0;
    for (var i = 0; i < parent.allDevices.devices.length; i++) {
        var d = parent.allDevices.devices[i];
        if (d.id == id) {
            lat = d.baiduLat;
            lng = d.baiduLng
            break;
        }
    }
    GetAddressByGoome(lat, lng);
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