var UIMapGIS = null;

window.onload = function () {
    $(document).keydown(function (e) {
        e = e || window.event;
        if (e.keyCode == 9) {
            ("#PLV_tab").charAt();
        }
    });
    $("#S_UIMap").change(function () {
        UserServer.SetUserMapType($("#S_UIMap").val(), function () {
            window.location.reload();
        });
    });                 
    // $("#PLV").layout();
    // $("#PLV_tab").layout({ fit: true });
    //    $("#container").width($(document).width() - 450);
    //    $("#container").height($(document).height() - 28); 
    $("#S_UIMap").change(function () {
        window.location.href = "MyGIS.aspx?map=" + $("#S_UIMap").val();
    })
    switch ($("#S_UIMap").val()) {
        case "Map51":
            UIMapGIS = Map51GIS;
            break;
        case "GoogleMap":
            UIMapGIS = GoogleGIS;
            break;
    }
    UIMapGIS.IntiMap(function () {
        IntiControl();
        IntiData();
        //LoadDeviceList();
    });
    $("#UP_IG").attr("src", "tools/UpdateImg.aspx");
}

function Distance() {
    UIMapGIS.Distance();
}

//function LoadDeviceListBypage(pageindex, pagesize) {   
//    var d = {
//        IncludLow: document.getElementById("IsIncludeLowDevice").checked,
//        PageIndex: pageindex,
//        PageSize: 30
//    };
//    switch ($("#C_Se_WP").val()) {
//        case "IMEI":
//            d.Serialnumber = $("#C_Se_WD").val();
//            break;
//        case "DeviceName":
//            d.DeviceName = $("#C_Se_WD").val();
//            break;
//    }
//    $.messager.progress({
//        title: loginTip.DataOpt.LoadDataMessage,
//        interval: 10000
//    });
//    UserServer.GetDeviceList(d, function (Data) {
//        $.messager.progress("close");
//        $('#CuDeviceList').datagrid("loadData", Data);
//    }, function () {
//        $.messager.progress("close");
//    });
//}
//function DeleteMrk(id) {
//    $.messager.progress({
//        title: loginTip.DataOpt.LoadDataMessage,
//        interval: 10000
//    });
//    UserServer.DeleteMarket(id, function () {
//        $.messager.progress("close");
//        alert(loginTip.DataOpt.OptSuccess);
//        IntiData();
//    });
//}

function IntiData() {
    //清除以前的所有的
    UIMapGIS.RemoveAll();

    //加载兴趣点
    UserServer.GetUserMrl(function (Data) {
        $('#PolList').datagrid("loadData", Data);
        UIMapGIS.Mrk.AddManyMrk(Data);
    });
    //加载电子围栏


}
//function ShowDeviceInfo(da) {
//    UIMapGIS.ShowdeviceInfo(da);
//}


//function LoadDeviceList() {
//    var PageSize = $("#CuDeviceList").datagrid("options").pageSize;
//    var PageIndex = $("#CuDeviceList").datagrid("options").pageNumber;
//    //    PageSize = pz;
//    LoadDeviceListBypage(PageIndex, PageSize);
//}

function LoadGeofenceByPageX(pageindex, pagesize) {
    if ($("#DevList").val() == "") {
        alert("请选择设备");
        return;
    }
    var da = {
        IncludLow: true,
        PageIndex: pageindex,
        PageSize: pagesize,
        GeofenceName: $("#TX_WD").val(),
        Serialnumber: $("#DevList").val()
    };
    $.messager.progress({
        title: loginTip.DataOpt.LoadDataMessage,
        interval: 10000
    });

    UserServer.SearchDevice_Geography(da, function (Data) {
        $.messager.progress("close");
        UIMapGIS.Geofence.AddManyGeofence(Data.rows);
        $('#GeoFenceList').datagrid("loadData", Data);
    });
}
function LoadGeofence() {
    $("#GeoFenceList").datagrid({});
    var PageSize = $("#GeoFenceList").datagrid("options").pageSize;
    var PageIndex = $("#GeoFenceList").datagrid("options").pageNumber;
    LoadGeofenceByPageX(PageIndex, PageSize);
}

function SearchGeo() {
    LoadGeofence();
}

function IntiControl() {
    
    //  poi列表
    $('#PolList').datagrid({
        fitColumns: true,
        nowrap: false,
        height: 400,
        fit: true,
        toolbar: "#PolList_Tools",
        singleSelect: true,
        idField: "Id",
        onSelect: function (rowIndex, rowData) {
            PanToCenter(rowData.Lat, rowData.Lng);
        },
        columns: [[
					{ field: 'Name', title: loginTip.Trace.Dt_DeviceName, width: 100 },
                     {
                         field: 'opt', title: loginTip.DataOpt.Opt, width: 50, formatter: function (value, data, rowIndex) {
                             var Ser = "";
                             Ser += "<a class='abox' href='javascript:void(0)' onclick='DeleteMrk(\"" + data._id + "\")'   >" + loginTip.DataOpt.Delete + "</a>";
                             return Ser;
                         }
                     }
        ]]
    });
    //电子围栏列表
    $('#GeoFenceList').datagrid({
        fitColumns: true,
        nowrap: false,
        singleSelect: false,
        height: 400,
        pagination: true,
        fit: true,
        toolbar: "#GeoFenceList_Tools",
        idField: "Id",
        onClickRow: function (rowIndex, rowData) {


        },
        onCheck: function (rowIndex, rowData) {
            UIMapGIS.Geofence.ShowGeofenceInfo(rowData);
        },
        onUncheck: function (rowIndex, rowData) {
            UIMapGIS.Geofence.hideGeofence(rowData);
        },
        columns: [[
             { field: 'chk', title: "", width: 30, checkbox: true },
					{ field: 'Name', title: loginTip.MyGIS.GeofenceName, width: 120 },
                    { field: 'Serialnumber', title: loginTip.DeviceInfo.DeviceSerialnumber, width: 120 }, {
                        field: 'Type', title: "", width: 100, formatter: function (value, data, rowIndex) {
                            switch (value) {
                                case 0:
                                    return loginTip.MyGIS.InGeofence;
                                    break;
                                case 1:
                                    return loginTip.MyGIS.OutGeofence;
                                    break;
                                case 2:
                                    return loginTip.MyGIS.InandOutGeofence;
                                    break;
                            }
                        }
                    },
                     {
                         field: 'opt', title: loginTip.DataOpt.Opt, width: 60, formatter: function (value, data, rowIndex) {
                             var Ser = "";
                             Ser += "<a class='abox' href='javascript:void(0)' onclick='DeleteGeodence(\"" + data._id + "\")'   >" + loginTip.DataOpt.Delete + "</a>";
                             return Ser;
                         }
                     }
        ]]
    });

    $('#GeoFenceList').datagrid("getPager").pagination({
        onSelectPage: function (pageNumber, pageSize) {
            LoadGeofenceByPageX(pageNumber, pageSize);
        }
        , showPageList: false
    });

//    $('#CuDeviceList').datagrid({
//        fitColumns: true,
//        nowrap: false,
//        pagination: true,
//        displayMsg: " ",
//        fit: true,
//        toolbar: "#CuDeviceList_Tools",
//        singleSelect: true,
//        idField: "SerialNumber",
//        onLoadSuccess: function (data) {
//            $('#CuDeviceList').datagrid("selectRow", 0);
//        },
//        onSelect: function (rowIndex, rowData) {
//            ShowDeviceInfo(rowData);
//            $("#DevListTxt").val(rowData.DeviceName);
//            $("#DevList").val(rowData.SerialNumber);
//            LoadGeofence();
//        },
//        columns: [[
//                {
//                    field: 'DeviceIcon', title: "", width: 30, formatter: function (value, rowData, rowIndex) {
//                        if (rowData.DeviceIcon == "") {
//                            rowData.DeviceIcon = 1;
//                        }
//                        return "<img style='width:16px' src='/Tools/GetDeviceIcon.ashx?_id=" + rowData.DeviceIcon + "'/>";
//                    }
//                },
//            {
//                field: 'DeviceName', title: loginTip.Trace.Dt_DeviceName, width: 160, formatter: function (value, data, rowIndex) {
//                    var d = data.DeviceName;
//                    return d;
//                }
//            }
//               , {
//                   field: 'LastLocation.Speed', title: loginTip.Trace.Dt_Speed + "(KM/H)", width: 60, formatter: function (value, data, rowIndex) {
//                       return data.LastLocation.Speed;
//                   }
//               }
//        ]],
//        rowStyler: function (index, row, css) {
//            if (row.OutDatetime < new Date()) {
//                return 'color:red;';
//            }
//            if (row.LastLocation.IsOnline) {
//                return 'color:green;';
//            }
//        }
//    });

//    $('#CuDeviceList').datagrid("getPager").pagination({
//        onSelectPage: function (pageNumber, pageSize) {
//            LoadDeviceListBypage(pageNumber, pageSize);
//        },
//        showPageList: false
//    });
}


function PanToCenter(lat, Lng) {
    UIMapGIS.PanToCenter(lat, Lng);
}
//打开添加兴趣点的窗口
function OpenMarketEditForm() {
    UIMapGIS.RemoveAll();
    $("#Btn_AddMrk").linkbutton("disable");
    $('#MarketEditForm').css("display", "block").dialog({
        title: loginTip.MyGIS.PolDetail,
        width: 400,
        height: 400,
        top: 70,
        left: 0,
        closable: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        buttons: [
            {
                text: loginTip.DataOpt.Save,
                iconCls: 'icon-save',
                handler: function () {
                    var Mrk = {
                        Name: $("#Txt_MrkName").val(),
                        Icon: "images/icon/" + $("input[name='RadioButtonList1']:checked").val() + ".png",
                        Lat: $("#T_Lat").numberspinner("getValue"),
                        Lng: $("#T_lng").numberspinner("getValue"),
                        DeviceSerialnumber: "",
                        Desc: $("#Txt_Desc").val()
                    };
                    var ids = new Array();
                    if ($("#Img_Pc_Ids").val() != "") {
                        ids = $("#Img_Pc_Ids").val().split(',');
                    }
                    $.messager.progress({
                        title: loginTip.DataOpt.LoadDataMessage,
                        interval: 10000
                    });
                    UserServer.AddMarket(Mrk, ids, function (da) {
                        $.messager.progress("close");
                        CloseMarketEditForm();
                        alert(loginTip.DataOpt.OptSuccess);
                    }, function (e) {
                        $.messager.progress("close");
                        alert(loginTip.DataOpt.OptFail);
                    });
                }
            }, {
                text: loginTip.DataOpt.Cancel,
                iconCls: 'icon-cancel',
                handler: function () {
                    CloseMarketEditForm();
                }
            }
        ]

    });
    $("#T_Lat").numberspinner({
        width: 200,
        onChange: function (newValue, oldValue) {
            var La = $("#T_Lat").numberspinner("getValue");
            var lg = $("#T_lng").numberspinner("getValue");
            if (La != "" && lg != "") {
                UIMapGIS.Mrk.ChangeLoation(La, lg);
            }

        }
    });
    $("#T_lng").numberspinner({
        width: 200,
        onChange: function (newValue, oldValue) {
            var La = $("#T_Lat").numberspinner("getValue");
            var lg = $("#T_lng").numberspinner("getValue");
            if (La != "" && lg != "") {
                UIMapGIS.Mrk.ChangeLoation($("#T_Lat").numberspinner("getValue"), $("#T_lng").numberspinner("getValue"));
            }

        }
    });
    UIMapGIS.Mrk.addActivityMrk(function (lat, lng) {
        $("#T_Lat").numberspinner("setValue", lat);
        $("#T_lng").numberspinner("setValue", lng);
    });
    $("#MarketEditForm_Tab").tabs();
    $("#UP_IG").attr("src", "tools/UpdateImg.aspx");
}
//关闭添加兴趣点的窗口
function CloseMarketEditForm() {
    $('#MarketEditForm').dialog("close");
    $("#Btn_AddMrk").linkbutton("enable");
    IntiData();
}
function DeleteMrk(id) {
    $.messager.progress({
        title: loginTip.DataOpt.LoadDataMessage,
        interval: 10000
    });
    UserServer.DeleteMarket(id, function () {
        $.messager.progress("close");
        alert(loginTip.DataOpt.OptSuccess);
        IntiData();
    });
}

function OpenAddGeofenceForm() {
    if ($("#DevList").val() == "") {
        alert("请选择设备");
        return;
    }

    $("#Btn_AddGeofence").linkbutton("disable");
    UIMapGIS.Geofence.DrawGeofence();
    $('#GeofenceAddForm').css("display", "block").dialog({
        title: loginTip.MyGIS.Geofence,
        width: 400,
        height: 200,
        top: 70,
        left: 0,
        closable: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        buttons: [
            {
                text: loginTip.DataOpt.Save,
                iconCls: 'icon-save',
                handler: function () {
                    var Data = UIMapGIS.Geofence.GetGeofenceData();
                    if (Data == "") {
                        return;
                    }
                    var se = $("#DevList").val();
                    if (se == "") {
                        return;
                    }
                    var Obj = {
                        Serialnumber: se,
                        Type: $("#GeofenceType").val(),
                        geography: Data,
                        Name: $("#GeofenceName").val()
                    };
                    $.messager.progress({
                        title: loginTip.DataOpt.LoadDataMessage,
                        interval: 10000
                    });
                    UserServer.AddGeography(Obj, function () {
                        $.messager.progress("close");
                        alert(loginTip.DataOpt.OptSuccess);
                        $('#GeofenceAddForm').dialog("close");
                        $("#Btn_AddGeofence").linkbutton("enable");
                        UIMapGIS.Geofence.ClearDw();
                        LoadGeofence();
                    });
                }
            }, {
                text: loginTip.DataOpt.Cancel,
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#GeofenceAddForm').dialog("close");
                    $("#Btn_AddGeofence").linkbutton("enable");
                    UIMapGIS.Geofence.ClearDw();
                    LoadGeofence();
                }
            }]

    });
}


function DeleteGeodence(Id) {

    $.messager.confirm('Confirm', '您确定删除这条记录吗?', function (r) {
        if (r) {
            $.messager.progress({
                title: loginTip.DataOpt.LoadDataMessage,
                interval: 10000
            });
            UserServer.DeleteGeography(Id, function () {
                $.messager.progress("close");
                alert(loginTip.DataOpt.OptSuccess);
                LoadGeofence();
            });
        }
    });
}

