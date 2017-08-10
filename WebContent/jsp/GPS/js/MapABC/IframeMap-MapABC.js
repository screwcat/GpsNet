//别的地图JS中方法,必须要包含的有
//initmap,clearMap,addMarker,ShowOrHideDeviceInfo,clearAllMap,HideDeviceName
//其余地图JS方法名和功能,和这里面一致.

var myGeo = null;
var myDis = null;

function initmap() {
    initMapABC(0, 0, 0);
    console.log(map);
}

var MrkArr = new Array(); //设备弹出框信息数组

//清除MapABC地图
function clearMap() {
    if (map) {
        map.removeAllOverlays();
    }
    MrkArr.length = 0;
}

//  MapABC地图放大一级
function zoomIn() {
    if (map) {
        map.zoomIn();
    }
}

//  MapABC地图缩小一级
function zoomOut() {
    if (map) {
        map.zoomOut();
    }
}

function mapDistance() {

//    if (myDis) {
//        myDis.open();
//    }
}

function mapFull() {
//    if (map) {
//        var point = new BMap.Point(110.12323, 31.123232);
//        map.centerAndZoom(point, 6);
//    }
}

function mapClear() {

}

//显示POI
function showPOIInMap() {
//    for (var i = 0; i < poiJson.poiArr.length; i++) {

//        var point = new BMap.Point(poiJson.poiArr[i].longitude, poiJson.poiArr[i].latitude);
//        var icon = "icons/startstr.png";
//        var sIcon = new BMap.Icon(icon, new BMap.Size(20, 34));
//        marker = new BMap.Marker(point, { icon: sIcon });
//        map.addOverlay(marker);
//        var label = new BMap.Label(poiJson.poiArr[i].name, { offset: new BMap.Size(-3, 22) });
//        marker.setLabel(label);
//    }
}

//清除单个
function MapRemoveOneMrk(DeviceID) {
//    var mrk = MrkArr[DeviceID];
//    if (mrk == undefined) {
//        return;
//    }
//    //清除设备标识
//    if (mrk.Curmrk != undefined) {
//        //        mrk.Curmrk.setMap(null);
//        //        mrk.Curmrk = undefined;
//        map.removeOverlay(mrk.Curmrk);
//    }
//    //清除设备名
//    if (mrk.PopupMarDeviceName != undefined) {
//        mrk.PopupMarDeviceName.setMap(null);
//        mrk.PopupMarDeviceName = undefined;
//    }
//    MrkArr[DeviceID] = undefined;

}

//  MapABC地图添加覆盖物
function addMarker(data, callbackFun) {
    if (data.baiduLat == "") {
        return;
    }
    // alert(data.id);
    //设置数据
    if (MrkArr[data.id] == undefined) {
        MrkArr[data.id] = new Object();
        //        MrkArr.length++;
    }
    MrkArr[data.id].data = data;
    var ct = new MPoint(data.baiduLng, data.baiduLat);
    if (parent.isSetMapCenter) {
        if (parseInt(data.baiduLat) == -1 && parseInt(data.baiduLng) == -1) {

        } else {
            map.centerAndZoom(ct, 8);
            parent.isSetMapCenter = false;
        }
    }
    //最后一次中心位置 
    var icon = GetBaiduIcon(data.icon, data.status, data.course);
    if (MrkArr[data.id].Curmrk != undefined) {
        MrkArr[data.id].Curmrk.setPosition(ct);
        MrkArr[data.id].Curmrk.setIcon(icon);
    } else {
        MrkArr[data.id].Curmrk = new BMap.Marker(ct, { icon: icon, title: data.name });
        MrkArr[data.id].Curmrk.setOffset(new BMap.Size(0, -10))
        map.addOverlay(MrkArr[data.id].Curmrk);
        //显示信息框
        MrkArr[data.id].Curmrk.addEventListener("click", function () {
            //            var geocoder = new BMap.Geocoder(), pointForLocation = null;

            //            pointForLocation = new BMap.Point(data.baiduLng, data.baiduLat);
            //            geocoder.getLocation(pointForLocation, function (geoResult) {
            //                data.Location = geoResult.address;

            //                ShowDeviceInfo(data.id);

            //                if (/function/.test(typeof callbackFun)) {
            //                    callbackFun(data.id);
            //                }
            //            });


            ShowDeviceInfo(data.id);
            //            parent.currImei = ShowDeviceInfo(data.id);
            //            GetAddress(data.id);

            if (/function/.test(typeof callbackFun)) {
                callbackFun(data.id);
            }
        });
    }
    if (showPopupmarkerID != data.id) {
        //显示设备名
        if (isShowDeviceName) {
            if (MrkArr[data.id].PopupMarDeviceName == undefined) {
                ShowDeviceNameOnc(data.id);
            }
        } else {
        }
        if (MrkArr[data.id].PopupMarDeviceName != undefined) {
            var obj = { "position": ct };
            MrkArr[data.id].PopupMarDeviceName.update(obj);
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
            HideDeviceNameOne(showPopupmarkerID);
            */
        }
    }
}

//MapABC地图添加位置地标
function addPositionMarker(pointData) {
//    var point = null, marker = null;

//    if (pointData == null || !/number/.test(typeof pointData.lng) || !/number/.test(typeof pointData.lat)) {
//        return;
//    }

//    point = new BMap.Point(pointData.lng, pointData.lat);
//    marker = new BMap.Marker(point);
//    map.addOverlay(marker);
//    map.centerAndZoom(point, 12);
}

//MapABC地图显示设备信息
function ShowDeviceInfo(DeviceID, fun) {
//    if (MrkArr[DeviceID] == undefined) {
//        return;
//    }
//    //    alert("到这了");
//    //    alert(currImei);
//    if (showPopupmarker) {
//        if (showPopupmarkerID != DeviceID) {
//            showPopupmarker.setMap(null);
//            ShowDeviceNameOnc(showPopupmarkerID);
//        }
//    }
//    if (!showPopupmarker || showPopupmarkerID != DeviceID) {
//        ShowDeviceInfoContext(DeviceID);
//        //隐藏设备名
//        HideDeviceNameOne(DeviceID);
//        showPopupmarkerID = DeviceID;
//    }
//    //    alert("设备号是：" + DeviceID);
//    //    currImei = DeviceID;
//    return DeviceID;
}


//MapABC地图隐藏设备弹出框
function HideDeviceInfo(DeviceID) {
//    if (showPopupmarker) {
//        showPopupmarker.setMap(null);
//    }
//    if (isShowDeviceName) {
//        //显示设备名
//        ShowDeviceNameOnc(DeviceID);
//    }
//    showPopupmarkerID = 0;
//    showPopupmarker = null;
//    return "";
}

//MapABC地图切换用户时,使用,隐藏弹出框
function HidePopumarker() {
//    if (showPopupmarker) {
//        showPopupmarker.setMap(null);
//    }
//    showPopupmarkerID = 0;
//    showPopupmarker = null;
}

//MapABC地图切换在线,离线时使用
function HideShowPopumarker() {
//    if (showPopupmarker) {
//        showPopupmarker.setMap(null);
//    }
//    showPopupmarker = null;
}

function ShowDeviceInfoContext(DeviceID) {
//    var ct = new BMap.Point(MrkArr[DeviceID].data.baiduLng, MrkArr[DeviceID].data.baiduLat);
//    //    var geocoder = new BMap.Geocoder();

//    //    geocoder.getLocation(ct, function (reoResult) {
//    //        MrkArr[DeviceID].data.Location = reoResult != null ? reoResult.address : "";
//    //        showPopupmarker = new PopupMarker({ position: ct, map: map, icon: "images/1px.png", text: GetInfoWContx(MrkArr[DeviceID].data), showpop: true });

//    //        //百度地图放大到最大级别后,再点击,泡泡会在地图上混乱
//    //        var zoom = map.getZoom();
//    //        if (zoom > 17) {
//    //            map.centerAndZoom(ct, 18);
//    //        } else {
//    //            map.panTo(ct);
//    //        }

//    //        //隐藏设备名
//    //        HideDeviceNameOne(DeviceID);
//    //        showPopupmarkerID = DeviceID;
//    //    });

//    showPopupmarker = new PopupMarker({ position: ct, map: map, icon: "images/1px.png", text: GetInfoWContx(MrkArr[DeviceID].data), showpop: true });

//    //百度地图放大到最大级别后,再点击,泡泡会在地图上混乱
//    var zoom = map.getZoom();
//    if (zoom > 17) {
//        map.centerAndZoom(ct, 18);
//    } else {
//        map.panTo(ct);
//    }
}

function HideDeviceInfoContext(DeviceID) {
//    if (showPopupmarker) {
//        showPopupmarker.setMap(null);
//        showPopupmarker = null;
//    }
//    showPopupmarkerID = 0;
}


//MapABC地图显示设备名
function ShowDeviceName() {
//    $(MrkArr).each(function (ind) {
//        if (MrkArr[ind] != undefined) {
//            ShowDeviceNameOnc(ind);
//        }
//    });
}
//MapABC地图显示单个设备名
function ShowDeviceNameOnc(ind) {
//    //    if (MrkArr.length > 0) {
//    //        //MrkArr[ind] == undefined
//    //        if (MrkArr[ind].PopupMarDeviceName != undefined) {
//    //            HideDeviceNameOne(ind);
//    //        }
//    //        var ct = new BMap.Point(MrkArr[ind].data.baiduLng, MrkArr[ind].data.baiduLat);
//    //        MrkArr[ind].PopupMarDeviceName = new PopupMarker({ position: ct, map: map, icon: "images/1px.png", text: MrkArr[ind].data.name, showpop: true });
//    //    }
//    if (MrkArr[ind].PopupMarDeviceName != undefined) {
//        HideDeviceNameOne(ind);
//    }
//    var ct = new BMap.Point(MrkArr[ind].data.baiduLng, MrkArr[ind].data.baiduLat);
//    MrkArr[ind].PopupMarDeviceName = new PopupMarker({ position: ct, map: map, icon: "images/1px.png", text: MrkArr[ind].data.name, showpop: true });
}

//MapABC地图隐藏设备名
function HideDeviceName() {
//    $(MrkArr).each(function (ind) {
//        HideDeviceNameOne(ind);
//    });
}
//MapABC地图隐藏单个设备名
function HideDeviceNameOne(ind) {
//    if (MrkArr[ind] != undefined && MrkArr[ind].PopupMarDeviceName != undefined) {
//        MrkArr[ind].PopupMarDeviceName.setMap(null);
//    }
}

function setMapCenter(DeviceID) {
//    var ct = new BMap.Point(MrkArr[DeviceID].data.baiduLng, MrkArr[DeviceID].data.baiduLat);
//    if (map) {
//        map.centerAndZoom(ct, 16);
//    }
}

function clearAllMap() {

//    clearMap();
//    MrkArr.length = 0;
}

//谷米接口解析
function GetAddressByMap(id) {
//    $('#divMarkerAddress').html("");
//    var lat = 0;
//    var lng = 0;
//    for (var i = 0; i < parent.allDevices.devices.length; i++) {
//        var d = parent.allDevices.devices[i];
//        if (d.id == id) {
//            lat = d.baiduLat;
//            lng = d.baiduLng
//            break;
//        }
//    }
//    GetAddressByGoome(lat, lng);
}