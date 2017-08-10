//别的地图JS中方法,必须要包含的有
//initmap,clearMap,addMarker,ShowOrHideDeviceInfo,clearAllMap,HideDeviceName
//其余地图JS方法名和功能,和这里面一致.

function initmap() {
    initSOSOMap(0, 0, 0);
}

var MrkArr = new Array(); //设备弹出框信息数组

//清除地图
function clearMap() {
    $(MrkArr).each(function (ind, value) {
//        console.log("进来了");
//        MapRemoveOneMrk(ind);
        MapRemoveOneMrk(value);
    });
    //清除Deviceid
    MrkArr.DeviceId = undefined;
}

//清除单个
function MapRemoveOneMrk(DeviceID) {
    var mrk = MrkArr[DeviceID];
    if (mrk == undefined) {
        return;
    }
    //清除设备标识
    if (mrk.Curmrk != undefined) {
        mrk.Curmrk.setMap(null);
    }
    //清除设备名
    if (mrk.PopupMarDeviceName != undefined) {
        mrk.PopupMarDeviceName.setMap(null);
        mrk.PopupMarDeviceName = undefined;
    }
    MrkArr[DeviceID] = undefined;

}

//添加地标
function addMarker(data, callbackFun) {
    //alert(data.id);
    if (data.latitude == "") {
        return;
    }
    //设置数据
    if (MrkArr[data.id] == undefined) {
        MrkArr[data.id] = new Object();
    }
    MrkArr[data.id].data = data;
    var ct = new qq.maps.LatLng(data.latitude, data.longitude);
    if (parent.isSetMapCenter) {
        if (parseInt(data.latitude) == -1 && parseInt(data.longitude) == -1) {

        } else {
            map.setCenter(ct);
            map.zoomTo(8);
            parent.isSetMapCenter = false;
        }
    }
    //最后一次中心位置 
    var icon = GetSOSOIcon(data.icon, data.status, data.course);

    if (MrkArr[data.id].Curmrk != undefined) {
        MrkArr[data.id].Curmrk.setPosition(ct);
        MrkArr[data.id].Curmrk.setIcon(icon);
    } else {
        MrkArr[data.id].Curmrk = new qq.maps.Marker({
            position: ct,
            icon: icon,
            map: map
        });
        //显示信息框
        soso.maps.event.addListener(MrkArr[data.id].Curmrk, 'click', function () {
            ShowDeviceInfo(data.id);
//            GetAddress(data.id);

            if (/function/.test(typeof callbackFun)) {
                callbackFun(data.id);
            }
        });
        MrkArr.push(data.id);
    }
    if (showPopupmarkerID != data.id) {
        //显示设备名
        if (isShowDeviceName) {
            if (MrkArr[data.id].PopupMarDeviceName == undefined) {
                ShowDeviceNameOnc(data.id);
            }
        } else {
        }
    } else {
        if (showPopupmarker) {
            var html = GetInfoWContx(MrkArr[data.id].data);
            var obj = { "position": ct, "text": html };
            showPopupmarker.update(obj);
        } else {
            /*
            //切换在线,离线使用
            ShowDeviceInfoContext(showPopupmarkerID);
            //隐藏设备名
            HideDeviceNameOne(showPopupmarkerID);*/
        }
    }

    if (MrkArr[data.id].PopupMarDeviceName != undefined) {
        var obj = { "position": ct };
        MrkArr[data.id].PopupMarDeviceName.update(obj);
    }
}

//显示设备信息
function ShowDeviceInfo(DeviceID, fun) {

    if (MrkArr[DeviceID] == undefined) {
        return;
    }
    if (showPopupmarker) {
        if (showPopupmarkerID != DeviceID) {
            showPopupmarker.setMap(null);
            ShowDeviceNameOnc(showPopupmarkerID);
        }
    }
    if (!showPopupmarker || showPopupmarkerID != DeviceID) {
        ShowDeviceInfoContext(DeviceID);
        //隐藏设备名
        //HideDeviceNameOne(DeviceID); //soso地图隐藏设备名的话,会导致泡泡left top混乱
        showPopupmarkerID = DeviceID;
    }
}

//隐藏设备弹出框
function HideDeviceInfo(DeviceID) {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
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
        showPopupmarker.setMap(null);
    }
    showPopupmarkerID = 0;
    showPopupmarker = null;
}
//切换在线,离线时使用
function HideShowPopumarker() {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
    }
    showPopupmarker = null;
}

function ShowDeviceInfoContext(DeviceID) {
    var ct = new qq.maps.LatLng(MrkArr[DeviceID].data.latitude, MrkArr[DeviceID].data.longitude);
    showPopupmarker = new PopupMarker({
        position: ct,
        map: map,
        icon: "images/1px.png",
        text: GetInfoWContx(MrkArr[DeviceID].data),
        showpop: true,
        id: DeviceID
    });
//    console.log(map);
//    map.moveTo(ct);
    map.panTo(ct);
}

function HideDeviceInfoContext(DeviceID) {
    if (showPopupmarker) {
        showPopupmarker.setMap(null);
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
    if (MrkArr[ind].PopupMarDeviceName != undefined) {
        HideDeviceNameOne(ind);
    }
    var ct = new soso.maps.LatLng(MrkArr[ind].data.latitude, MrkArr[ind].data.longitude);
    MrkArr[ind].PopupMarDeviceName = new PopupMarker({
        position: ct,
        map: map,
        icon: "images/1px.png",
        text: MrkArr[ind].data.name,
        showpop: true,
        id: ind
    });
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
        MrkArr[ind].PopupMarDeviceName.setMap(null);
    }
}

function setMapCenter(DeviceID) {
    var ct = new soso.maps.LatLng(MrkArr[DeviceID].data.latitude, MrkArr[DeviceID].data.longitude);
    if (map) {
        map.setCenter(ct);
        map.zoomTo(16);
    }
}


function clearAllMap() {

    clearMap();
    MrkArr.length = 0;
}

function GetAddressByMap(id) {
    //如果语言为中文,则用谷米
    //为英文,用google
    if (language == "zh-cn") {
        GetAddressByGoome2(id);
    } else {

    }
}
//谷米接口解析
function GetAddressByGoome2(id) {
    $('#divMarkerAddress').html("");
    //获取地址,保持统一,都用百度经纬度
    var lat = 0;
    var lng = 0;
    for (var i = 0; i < parent.allDevices.devices.length; i++) {
        var d = parent.allDevices.devices[i];
        if (d.id == id) {
            lat = d.baiduLat;
            lng = d.baiduLng;
            break;
        }
    }
    GetAddressByGoome(lat, lng);
}