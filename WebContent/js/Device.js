var IfmCon = null;
var IfmCond = null;
var IfmCondX = null;
var IfmCondV = null;
var IBatMoveDevice = null;
var IBatMoveUser = null;
var IfmShowOvGeofenceDevice = null;
var ObdInfoBox = null;
function ShowOvGeofenceDevice(Data, MoFun, OnLiFun) {
    if (IfmShowOvGeofenceDevice == undefined) {
        IfmShowOvGeofenceDevice = $("<div  style='width:980px;height:410px;' ><table   id='tab_ShowOvGeofenceDevice'><table></div>");
    }
    IfmShowOvGeofenceDevice.dialog({
        title: loginTip.DeviceInfo.RegionSearch,
        buttons: [
            {
                text: loginTip.DeviceInfo.Monitor,
                handler: function () {
                    var SelectData = $('#tab_ShowOvGeofenceDevice').datagrid("getSelections");
                    IfmShowOvGeofenceDevice.dialog("close");
                    if (MoFun != undefined) {
                        MoFun(SelectData);
                    }
                }
            },
            {
                text: loginTip.DeviceInfo.OnlineTrace,
                handler: function () {
                    var SelectData = $('#tab_ShowOvGeofenceDevice').datagrid("getSelections");
                    IfmShowOvGeofenceDevice.dialog("close");
                    if (OnLiFun != undefined) {
                        OnLiFun(SelectData);
                    }
                }
            }, {
                iconCls: "icon-cancel",
                text: loginTip.DataOpt.Cancel,
                handler: function () {
                    IfmShowOvGeofenceDevice.dialog("close");
                }
            }
        ]
    });
    $.messager.progress({
        title: loginTip.DataOpt.LoadDataMessage,
        interval: 10000
    });
    $('#tab_ShowOvGeofenceDevice').datagrid({
        fitColumns: true,
        nowrap: false,
        width: 950,
        heigh: 400,
        fit: true,
        idField: "SerialNumber",
        singleSelect: false,
        columns: [[
              { field: 'chk', title: "", width: 110, checkbox: true },
            {
                field: 'DeviceName', title: loginTip.Trace.Dt_DeviceName, width: 70, formatter: function (value, rowData, rowIndex) {
                    return value;
                }
            },
            { field: 'SerialNumber', title: loginTip.Trace.Dt_Serialnumber, width: 50 },
            { field: 'UseLoginNamer', title: loginTip.Trace.Dt_User, width: 70 },
            {
                field: 'LastLocation.Lat', title: loginTip.Trace.Dt_Lng, width: 40, formatter: function (value, rowData, rowIndex) {
                    return rowData.LastLocation.Lat;
                }
            },
            { field: 'LastLocation.Lng', title: loginTip.Trace.Dt_Lat, width: 50, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.Lng; } },
            { field: 'LastLocation.GPStime', title: loginTip.Trace.Dt_GpsTime, width: 100, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.GpsTime.format("yyyy-MM-dd HH:mm:ss"); } },
            { field: 'LastLocation.LastActivityTime', title: loginTip.Trace.Dt_LastAcitivityTime, width: 100, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.LastActivityTime.format("yyyy-MM-dd HH:mm:ss"); } },
            { field: 'LastLocation.Mileage', title: loginTip.Trace.Dt_Mileage, width: 40, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.Mileage; } },
            { field: 'LastLocation.Source', title: loginTip.Trace.Dt_Course, width: 40, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.Source; } },
            { field: 'LastLocation.Speed', title: loginTip.Trace.Dt_Speed, width: 40, formatter: function (value, rowData, rowIndex) { return rowData.LastLocation.Speed; } },
            {
                field: 'LastLocation.LocaType', title: loginTip.Trace.Dt_LocationType, width: 30, formatter: function (value, rowData, rowIndex) {
                    return rowData.LastLocation.LocationType == 1 ? "<img  style='width:25px;' alt='GPS' src='\\images\\LocationType\\GPS.png'>" : "<img  style='width:25px;' alt='LBS' src='\\images\\LocationType\\lbs.png'>";
                }
            },
            {
                field: 'LastLocation.Electricity', title: loginTip.Trace.Dt_Electricity, width: 30, formatter: function (value, rowData, rowIndex) {

                    if (rowData.LastLocation.Electricity != 0) {
                        var Ig = parseInt(rowData.LastLocation.Electricity / 10);
                        return "<img style='width:25px' alt='" + rowData.LastLocation.Electricity + "%' src='\\images\\Electricity\\" + Ig + ".png' />";
                    } else {
                        return "";
                    }
                }
            },
            {
                field: 'LastLocation.Signal', title: loginTip.Trace.Dt_Signal, width: 30, formatter: function (value, rowData, rowIndex) {
                    if (rowData.LastLocation.Signal != 0) {
                        var Ig = parseInt(rowData.LastLocation.Signal / 20);
                        return "<img style='width:20px' alt='" + rowData.LastLocation.Signal + "%' src='\\images\\Signal\\Gms" + Ig + ".png' />";
                    } else {
                        return "";
                    }
                }
            },
             {
                 field: 'opt', title: loginTip.DataOpt.Opt, width: 120, formatter: function (value, data, rowIndex) {
                     var Ser = "";
                     if (data.OutDatetime < new Date()) {
                         return Ser;
                     }
                     Ser += "&nbsp;&nbsp;<a class='abox' href='javascript:void(0)' onclick='OnlineTrace(\"" + data.SerialNumber + "\")'   >" + loginTip.DeviceInfo.OnlineTrace + "</a>";
                     Ser += "&nbsp;&nbsp;<a class='abox' href='javascript:void(0)' onclick='TraceDevice(\"" + data.SerialNumber + "\")'   >" + loginTip.DeviceInfo.Trace + "</a>";
                     Ser += "&nbsp;&nbsp;<a class='abox' href='javascript:void(0)' onclick='ShowDeviceInfo(\"" + data.SerialNumber + "\")'   >" + loginTip.DeviceInfo.Config + "</a>";
                     return Ser;
                 }
             }
        ]],
        rowStyler: function (index, row, css) {
            if (row.OutDatetime < new Date()) {
                return 'color:red;';
            }
            if (new Date() - row.LastLocation.LastActivityTime < 5 * 60 * 1000) {
                return 'color:green;';
            }
        }
    });
    var Se = "";
    for (var i in Data) {
        Se += Data[i].lat + "," + Data[i].lng + ";";
    }
    UserServer.GeofenceSearchDevice(Se, function (da) {
        $('#tab_ShowOvGeofenceDevice').datagrid("loadData", da);
        $.messager.progress("close");
    });
};


function ShowDeviceInfo2(Serialnumber) {
    var Url = "/DeviceInfo/DeviceInfo.aspx?C=C&Serialnumber=" + Serialnumber;
    if (IfmCon == undefined) {
        IfmCon = $("<div  style='width:900px;height:400px;'><iframe  id='ifm_DeviceInfo' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");
    }
    IfmCon.dialog({
        title: loginTip.Trace.Device
    });
    $("#ifm_DeviceInfo").attr("src", Url);
};
//显示设备信息
function ShowDeviceInfo(Serialnumber, Onsuccess) {
    var Url = "/DeviceInfo/DeviceInfo.aspx?Serialnumber=" + Serialnumber;
    if (IfmCon == undefined) {
        IfmCon = $("<div  style='width:900px;height:400px;'><iframe  id='ifm_DeviceInfo' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");

    }
    IfmCon.dialog({
        title: loginTip.Trace.Device,
        onClose: Onsuccess
    });
    $("#ifm_DeviceInfo").attr("src", Url);
}

function JoinDeviceLocation(Serialnumb) {
    UserServer.JoinDeviceLocationListen([Serialnumb], function (dx) {
        alert(loginTip.DataOpt.OptSuccess);
    }, function (e) {
        alert(loginTip.DataOpt.OptFail);
    });
};

//显示用户信息
function ShowUserInfo(LoginName, Onsuccess) {
    var Url = "/Role/UserInfo.aspx?id=" + LoginName;
    if (IfmCond == undefined) {
        IfmCond = $("<div  style='width:380px;height:450px;'><iframe  id='ifm_UseInfoX' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");

    }

    IfmCond.dialog({
        title: LoginName + "  ",
        onClose: Onsuccess
    });
    Url = encodeURI(Url);
    $("#ifm_UseInfoX").attr("src", Url);
}
//新增用户
function AddUserInfo(Onsuccess, R) {
    IfmAddUser = $("<div  style='width:320px;height:420px;'><iframe src='/Role/AddUserInfo.aspx?R=" + R + "'  id='ifm_AddUseInfoX' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");
    IfmAddUser.dialog({
        title: loginTip.Trace.AddUser,
        onClose: Onsuccess
    });
}
function BatchDelteUser(UserList, fun) {
    var Str = loginTip.DataOpt.ConfirmDelete;
    $.messager.confirm(loginTip.Trace.ConfirmDelete, Str, function (r) {
        if (r) {
            $.messager.progress({
                title: loginTip.DataOpt.LoadDataMessage,
                interval: 10000
            });
            var ALU = "";
            for (var ix in UserList) {
                ALU = ALU + UserList[ix].LoginName + ",";
            }
            UserServer.DeleteUser(ALU, function (dx) {
                $.messager.progress("close");
                $.messager.alert(loginTip.DataOpt.LoadDataMessage, dx);
                if (fun != null) {
                    fun();
                }

            });
        }
    });
}
function BatchMoceUser(UserList, ParUser, fun) {
    if (IBatMoveUser == null) {
        IBatMoveUser = $("<div  style='width:300px;height:250px;'><ul id=\"IBatMoveUserTree\"></ul></div>");
    }
    IBatMoveUser.dialog({
        title: loginTip.Trace.MoveUser,
        onClose: function () { },
        buttons: [{
            text: "OK",
            handler: function () {
                var SelectUser = $('#IBatMoveUserTree').tree("getSelected");
                var Dix = 0;
                $.messager.progress({
                    title: loginTip.DataOpt.LoadDataMessage,
                    interval: 10000
                });
                var ALU = "";
                for (var ix in UserList) {
                    ALU = ALU + UserList[ix].LoginName + ",";
                }
                UserServer.MoveUser(ALU, SelectUser.id, function () {
                    IBatMoveUser.dialog("close");
                    $.messager.progress("close");
                    if (fun != null) {
                        fun();
                    }
                });
            }
        }]
    });
    $("#IBatMoveUserTree").tree({
        dnd: false,
        lines: true,
        animate: true,
        cascadeCheck: true,
        onLoadSuccess: function (node, data) {
            var CUsTarget = $('#IBatMoveUserTree').tree("find", ParUser);
            if (CUsTarget != null) {
                $('#IBatMoveUserTree').tree("select", CUsTarget.target);
            }
        }, onBeforeExpand: function (Node) {
            var c = $('#IBatMoveUserTree').tree("getChildren", Node.target);
            if (c.length == 0) {
                var icclass = Node.iconCls;
                $('#IBatMoveUserTree').tree('update', {
                    target: Node.target,
                    iconCls: 'icon-reload'
                });
                UserServer.GetUserEasyUITree(Node.id, function (UTr) {
                    $('#IBatMoveUserTree').tree("append", {
                        parent: Node.target,
                        data: UTr
                    });
                    $('#IBatMoveUserTree').tree('update', {
                        target: Node.target,
                        iconCls: icclass
                    });
                    $('#IBatMoveUserTree').tree("expand", Node.target);
                });
                return false;
            }
        }
    });

    UserServer.GetUserEasyUITree("", function (UTr) {
        $("#IBatMoveUserTree").tree("loadData", UTr);
    }, function (ee) {
        $.messager.alert(loginTip.DataOpt.Warning, loginTip.DataOpt.DataLoadError, "error");
    });
}

//账户充值
function AddMoney(LoginName, Onsuccess) {
    var Url = "/Cart/AcM.aspx?id=" + encodeURI(LoginName);
    if (IfmCondX == undefined) {
        IfmCondX = $("<div   style='width:450px;height:450px;'><iframe  id='Qifm_UseInfoX' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");

    }
    IfmCondX.dialog({
        title: loginTip.PointCart.Pay,
        onClose: Onsuccess
    });
    $("#Qifm_UseInfoX").attr("src", Url);
}
//设备续费
function MkOrder(Serialnumber, Onsuccess) {
    var Url = "/Cart/MakeOrder.aspx?id=" + Serialnumber;
    if (IfmCondV == undefined) {
        IfmCondV = $("<div   style='width:450px;height:450px;'><iframe  id='Qifm_UseInfoV' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");

    }
    IfmCondV.dialog({
        title: loginTip.DeviceInfo.ReNew,
        onClose: Onsuccess
    });
    $("#Qifm_UseInfoV").attr("src", Url);
}

//轨迹回放
function TraceDevice(Serialnumber) {
    window.open("/GPS/Trace.aspx?Serialnumber=" + Serialnumber)
}
//新增设备
function AddDevicexx(Onsuccess, did) {
    IfmAddDevice = $("<div  style='width:320px;height:180px;'><iframe src='/Manage/AddDevice.aspx'  id='ifm_AddDevicesX' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");
    if (did != undefined) {
        IfmAddDevice = $("<div  style='width:320px;height:180px;'><iframe src='/Manage/AddDevice.aspx?did=" + did + "'  id='ifm_AddDevicesX' style='width:100%;height:100%;' frameborder='0'   ></iframe></div>");
    }
    IfmAddDevice.dialog({
        title: loginTip.Trace.AddDevice,
        onClose: Onsuccess
    });
}

//  监控 
function OnlineTrace(Serialnumber) {
    window.open("/GPS/OnlineTrace.aspx?Serialnumber=" + Serialnumber)
}
function OnlineBatchTrace(SerArr) {
    window.open("/GPS/OnlineTrace.aspx?Serialnumber=" + SerArr)
}

//批量删除设备
function BatchDelteDevice(DeviceList, fun) {
    var Str = loginTip.DataOpt.ConfirmDelete;
    $.messager.confirm(loginTip.DataOpt.ConfirmDelete, Str, function (r) {
        if (r) {
            var deviceLisStr = "";
            for (var ixs in DeviceList) {
                deviceLisStr = deviceLisStr + DeviceList[ixs].SerialNumber + ",";
            }
            $.messager.progress({
                title: loginTip.DataOpt.LoadDataMessage,
                interval: 10000
            });
            UserServer.DeleteDevice(deviceLisStr, function () {
                $.messager.progress("close");
                if (fun != null) {
                    fun();
                }
            });
        }
    });
}
//批量移动设备
function BatchMoceDevice(DeviceList, CurUser, fun) {
    if (IBatMoveDevice == null) {
        IBatMoveDevice = $("<div  style='width:300px;height:250px;'><ul id=\"IBatMoveDeviceCurTree\"></ul></div>");
    }

    IBatMoveDevice.dialog({
        title: loginTip.DeviceInfo.Move,
        onClose: function () { },
        buttons: [{
            text: "OK",
            handler: function () {
                var SelectUser = $('#IBatMoveDeviceCurTree').tree("getSelected");
                var SelectLoginname = SelectUser.id;
                var deviceLisStr = "";
                for (var ixs in DeviceList) {
                    deviceLisStr = deviceLisStr + DeviceList[ixs].SerialNumber + ",";
                }
                $.messager.progress({
                    title: loginTip.DataOpt.LoadDataMessage,
                    interval: 10000
                });
                UserServer.MoveDevice(deviceLisStr, SelectLoginname, function () {
                    IBatMoveDevice.dialog("close");
                    $.messager.progress("close");
                    if (fun != null) {
                        fun();
                    }
                });
            }
        }]
    });
    $("#IBatMoveDeviceCurTree").tree({
        animate: true,
        dnd: false,
        lines: true,
        cascadeCheck: true,
        onLoadSuccess: function (node, data) {
            var CUsTarget = $('#IBatMoveDeviceCurTree').tree("find", CurUser);
            if (CUsTarget != null) {
                $('#IBatMoveDeviceCurTree').tree("select", CUsTarget.target);
            }
        }, onBeforeExpand: function (Node) {
            var c = $('#IBatMoveDeviceCurTree').tree("getChildren", Node.target);
            if (c.length == 0) {
                var icclass = Node.iconCls;
                $('#IBatMoveDeviceCurTree').tree('update', {
                    target: Node.target,
                    iconCls: 'icon-reload'
                });
                UserServer.GetUserEasyUITree(Node.id, function (UTr) {
                    $('#IBatMoveDeviceCurTree').tree("append", {
                        parent: Node.target,
                        data: UTr
                    });
                    $('#IBatMoveDeviceCurTree').tree('update', {
                        target: Node.target,
                        iconCls: icclass
                    });
                    $('#IBatMoveDeviceCurTree').tree("expand", Node.target);
                });
                return false;
            }
        }
    });

    UserServer.GetUserEasyUITree("", function (UTr) {
        $("#IBatMoveDeviceCurTree").tree("loadData", UTr);
    }, function (ee) {
        $.messager.alert(loginTip.DataOpt.Warning, loginTip.DataOpt.DataLoadError, "error");
    });
}
//移动设备
var IMoveDevice = null;
function ChangeUser(Serialnumber, CurUser, OnSuccess) {
    if (IMoveDevice == null) {
        IMoveDevice = $("<div  style='width:300px;height:150px;'><ul id=\"IMoveDeviceCurTree\"></ul></div>");
    }

    IMoveDevice.dialog({
        title: loginTip.DeviceInfo.Move,
        onClose: function () { },
        buttons: [{
            text: "OK",
            handler: function () {
                var SelectUser = $('#IMoveDeviceCurTree').tree("getSelected");
                $.messager.progress({
                    title: loginTip.DataOpt.LoadDataMessage,
                    interval: 10000
                });
                UserServer.MoveDevice(Serialnumber, SelectUser.id, function () {
                    IMoveDevice.dialog("close");
                    $.messager.progress("close");
                    if (OnSuccess) {
                        OnSuccess();
                    }
                });
            }
        }]
    });
    $("#IMoveDeviceCurTree").tree({
        dnd: false,
        lines: true,
        animate: true,
        cascadeCheck: true,
        onLoadSuccess: function (node, data) {
            var CUsTarget = $('#IMoveDeviceCurTree').tree("find", CurUser);
            if (CUsTarget != null) {
                $('#IMoveDeviceCurTree').tree("select", CUsTarget.target);
            }
        }, onBeforeExpand: function (Node) {
            var c = $('#IBatMoveDeviceCurTree').tree("getChildren", Node.target);
            if (c.length == 0) {
                var icclass = Node.iconCls;
                $('#IBatMoveDeviceCurTree').tree('update', {
                    target: Node.target,
                    iconCls: 'icon-reload'
                });
                UserServer.GetUserEasyUITree(Node.id, function (UTr) {
                    $('#IBatMoveDeviceCurTree').tree("append", {
                        parent: Node.target,
                        data: UTr
                    });
                    $('#IBatMoveDeviceCurTree').tree('update', {
                        target: Node.target,
                        iconCls: icclass
                    });
                    $('#IBatMoveDeviceCurTree').tree("expand", Node.target);
                });
                return false;
            }
        }
    });

    UserServer.GetUserEasyUITree("", function (UTr) {
        $("#IMoveDeviceCurTree").tree("loadData", UTr);
    }, function (ee) {
        $.messager.alert(loginTip.DataOpt.Warning, loginTip.DataOpt.DataLoadError, "error");
    });

}

function ActivityDevice(Ser, success) {
    var Str = loginTip.DataOpt.Confirm;
    $.messager.confirm(loginTip.DataOpt.Confirm, Str, function (r) {
        if (r) {
            UserServer.ActivityDevice(Ser, function (result) {
                $.messager.alert(result, result);
                if (success != undefined) {
                    success();
                }
            });
        }
    });




}



function alarmInfoAlert(IframeUrl, rowIndex) {
    var width = $(window).width() - 30;
    var height = $(window).height() - 30;
    var showImgWindow = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe  frameborder='0'  scrolling='no' src='/DataReport/AlarReport.aspx' style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");
    showImgWindow.window({
        width: width,
        height: height,
        top: 10,
        left: 10,
        animate: true,
        title: " &nbsp;",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        onClose: function () {

        }
    });

}




function ShowAlarmDevice(IframeUrl) {
    var width = $(window).width() - 30;
    var height = $(window).height() - 30;
    var showImgWindow = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe  frameborder='0'  scrolling='no' src='" + IframeUrl + "' style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");
    showImgWindow.window({
        width: width,
        height: height,
        top: 10,
        left: 10,
        animate: true,
        title: " &nbsp;",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        onClose: function () {

        }
    });

}



var ISeMulDevice = null;
function SearchMuilDevice(fun) {
    if (ISeMulDevice == null) {
        ISeMulDevice = $("<div  style='width:300px;height:350px;'><textarea style='height: 96%; width: 96%' id='SM_D'></textarea></div>");
    }

    ISeMulDevice.dialog({
        title: "批量查询",
        onClose: function () { },
        buttons: [{
            text: "OK",
            handler: function () {
                ISeMulDevice.dialog("close");
                $.messager.progress({
                    title: loginTip.DataOpt.LoadDataMessage,
                    interval: 10000
                });

                UserServer.SearchMuilD($("#SM_D").val(), function (Data) {
                    $.messager.progress("close");
                    if (fun) {
                        fun(Data);
                    }
                });

            }
        }]
    });
}


var ISeMulUser = null;
function SearchMuiluser(fun) {
    if (ISeMulUser == null) {
        ISeMulUser = $("<div  style='width:300px;height:350px;'><textarea style='height: 96%; width: 96%' id='SM_U'></textarea></div>");
    }
    ISeMulUser.dialog({
        title: "批量查询",
        onClose: function () { },
        buttons: [{
            text: "OK",
            handler: function () {
                ISeMulUser.dialog("close");
                $.messager.progress({
                    title: loginTip.DataOpt.LoadDataMessage,
                    interval: 10000
                });
                UserServer.SearchMuilU($("#SM_U").val(), function (Data) {
                    $.messager.progress("close");
                    if (fun) {
                        fun(Data);
                    }
                });
            }
        }]
    });
}



var DriveDefailInfoBox = null;
function SelectDeiveInfo(_id) {
    if (DriveDefailInfoBox == null) {
        DriveDefailInfoBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_DriveDefailInfoBox' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        DriveDefailInfoBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 1200,
            height: 500,
            title: "行程详细信息",
            collapsible: false
        });
    } else {
        DriveDefailInfoBox.window("open");
    }
    $("#frm_DriveDefailInfoBox").attr("src", "/Cus_D/cityeasy/OBD/DriveDetail.aspx?_id=" + _id + "");
}


var lastSer = "";
function SelectObdDeviceInfo(Serialnumber) {
    if (Serialnumber == "" || Serialnumber == null || Serialnumber == undefined) {
        return;
    }
    lastSer = Serialnumber;
    if (ObdInfoBox == null) {
        ObdInfoBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ObdDeviceInfo' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");
        ObdInfoBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            left: 0,
            top: 40,
            width: 340,
            height: 300,
            title: "OBD信息",
            collapsible: true
        });
    } else {
        ObdInfoBox.window("open");
    }
    $("#frm_ObdDeviceInfo").attr("src", "/Cus_D/cityeasy/OBD/ObdDataList.aspx?S=" + Serialnumber + "&BID=");
}

function CloseObdInfoWindow(Serialnumber) {
    if (ObdInfoBox != null) {
        ObdInfoBox.window("close");
        lastSer = "";
    }

}



var ShowCarInfo_Box = null;
function ShowCarInfo(S) {
    if (ShowCarInfo_Box == null) {
        ShowCarInfo_Box = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ShowCarInfo_Box' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        ShowCarInfo_Box.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 500,
            height: 400,
            title: "车辆档案",
            collapsible: false
        });
    } else {
        ShowCarInfo_Box.window("open");
    }
    $("#frm_ShowCarInfo_Box").attr("src", "/Cus_D/cityeasy/OBD/CarInfo.aspx?S=" + S + "");
}


var ShowDriveList_Box = null;
function ShowDriveList(S) {
    if (ShowDriveList_Box == null) {
        ShowDriveList_Box = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ShowDriveList_Box' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        ShowDriveList_Box.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 400,
            height: 500,
            title: "行程记录",
            collapsible: false
        });
    } else {
        ShowDriveList_Box.window("open");
    }
    $("#frm_ShowDriveList_Box").attr("src", "/Cus_D/cityeasy/OBD/DriverList.aspx?S=" + S + "");
}


var ShowDMail_Box = null;
function ShowDMail(S) {
    if (ShowDMail_Box == null) {
        ShowDMail_Box = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ShowDMail_Box' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        ShowDMail_Box.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 800,
            height: 500,
            title: "里程统计",
            collapsible: false
        });
    } else {
        ShowDMail_Box.window("open");
    }
    $("#frm_ShowDMail_Box").attr("src", "/Cus_D/cityeasy/OBD/DMail.aspx?S=" + S + "");
}


var ShowObdCheck_Box = null;
function ShowObdCheck(S) {
    if (ShowObdCheck_Box == null) {
        ShowObdCheck_Box = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ShowObdCheck_Box' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        ShowObdCheck_Box.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 500,
            height: 300,
            title: "汽车体检",
            collapsible: false
        });
    } else {
        ShowObdCheck_Box.window("open");
    }
    $("#frm_ShowObdCheck_Box").attr("src", "/Cus_D/cityeasy/OBD/ObdCheck.aspx?S=" + S + "");
}

var ShowObdDataD_Box = null;
function ShowObdDataD(S) {
    if (ShowObdDataD_Box == null) {
        ShowObdDataD_Box = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_ShowObdDataD_Box' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");
        var showopt = {
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 400,
            height: 550,
            title: "OBD监测",
            collapsible: false
        };
        if ($(window).height() < 550) {
            showopt.top = 30;
        }
        ShowObdDataD_Box.window(showopt);
    } else {
        ShowObdDataD_Box.window("open");
    }
    $("#frm_ShowObdDataD_Box").attr("src", "/Cus_D/cityeasy/OBD/ObdData.aspx?S=" + S + "");
}



function ResetDevice(Serialnumber, success) {
    var Str = "警告,此操作将会设备的所有数据,并且将设备恢复到出厂状态";
    $.messager.confirm(loginTip.DataOpt.Confirm, Str, function (r) {
        if (r) {
            UserServer.ResetDevice(Serialnumber, function (result) {
                $.messager.alert("Message", result, result);
                if (success != undefined) {
                    success();
                }
            });
        }
    });
}





var SHX009ShowInfoBox = null;
function ShSHX009ShowInfoBox(_id) {
    if (SHX009ShowInfoBox == null) {

        SHX009ShowInfoBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_SHX009ShowInfoBox' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        SHX009ShowInfoBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 340,
            height: 320,
            top: 100,
            left: 10,
            title: "守护星009",
            collapsible: false
        });
    } else {
        SHX009ShowInfoBox.window("open");
    }

    $("#frm_SHX009ShowInfoBox").attr("src", "/Cus_D/cityeasy/009/shx009showbox.aspx?_id=" + _id + "");
}

function CloseShSHX009ShowInfoBox() {
    if (SHX009ShowInfoBox != null) {
        SHX009ShowInfoBox.window("close");
        lastSer = "";
    }
}


var SHX009V11TestRe = null;
function SHX009V11(_id) {
    if (SHX009V11TestRe == null) {
        SHX009V11TestRe = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_SHX009V11TestRe' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        SHX009V11TestRe.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 400,
            height: 500,
            title: "测试记录",
            collapsible: false
        });
    } else {
        SHX009V11TestRe.window("open");
    }
    $("#frm_SHX009V11TestRe").attr("src", "/Cus_D/cityeasy/009/TestHistory.aspx?_id=" + _id + "");
}


var SHX009ShowHeadRateBBox = null;
function ShowHeadRateBBox(_id) {
    if (SHX009ShowHeadRateBBox == null) {
        SHX009ShowHeadRateBBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_SHX009ShowHeadRateBBox' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        SHX009ShowHeadRateBBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 1250,
            height: 500,
            title: "详细信息",
            collapsible: false
        });
    } else {
        SHX009ShowHeadRateBBox.window("open");
    }
    $("#frm_SHX009ShowHeadRateBBox").attr("src", "/Cus_D/cityeasy/009/HeadRate.aspx?_id=" + _id + "");
}



function SHX009V12(_id) {
    ShowHeadRateBBox(_id + "&tab=1");
}
function SHX009V13(_id) {
    ShowHeadRateBBox(_id + "&tab=0");
}
var SHX009V21PedometerBBox = null;
function SHX009V21(_id) {
    if (SHX009V21PedometerBBox == null) {
        SHX009V21PedometerBBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_SHX009V21PedometerBBox' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        SHX009V21PedometerBBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 400,
            height: 620,
            title: "计步器",
            collapsible: false
        });
    } else {
        SHX009V21PedometerBBox.window("open");
    }
    $("#frm_SHX009V21PedometerBBox").attr("src", "/Cus_D/cityeasy/009/Pedometer.aspx?_id=" + _id + "");
}
var SHX009V21PedHistoryBBox = null;
function SHX009V22(_id) {
    if (SHX009V21PedHistoryBBox == null) {
        SHX009V21PedHistoryBBox = $("<div style='padding: 0px; margin: 0px;overflow:hidden'><iframe id='frm_SHX009V21PedHistoryBBox' frameborder='0'  scrolling='no'   style='width:100%;height:100%;padding: 0px; margin: 0px' ></iframe><div>");

        SHX009V21PedHistoryBBox.window({
            resizable: false,
            closable: true,
            maximizable: false,
            minimizable: false,
            collapsible: false,
            width: 368,
            height: 540,
            title: "运动记录",
            collapsible: false
        });
    } else {
        SHX009V21PedHistoryBBox.window("open");
    }
    $("#frm_SHX009V21PedHistoryBBox").attr("src", "/Cus_D/cityeasy/009/PedometerHistory.aspx?_id=" + _id + "");
}

function SHX009V23(_id) {
    ShowDeviceInfo(_id);
}