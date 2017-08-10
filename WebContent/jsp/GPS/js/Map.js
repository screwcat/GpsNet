var pageCount = 10;
var isShowDeviceList = true;
var UserId = 0;  //当前点击的用户ID,非登陆用户ID
var language = "zh-cn";
var status = 0;
var loginName = "";
var countNum = 0;
var zTree = null;
var timer = null;
var resizeState = 1;
var backCount = 0;

//  依赖于jQuery的闭包，将多数全局变量局部化
(function ($) {
    var gpsInfoArr = [], isPosition = false, viewPoints = null, mapObj = null,
        mapType = "", centerPoint = null, latLngBounds = null, firstLoad = true,
        vehDisp = null;

    if ($ == null) {
        return;
    }
    //  ajax响应数据处理
    $.getResponseData = function (data) {
        /*当Ajax返回响应内容为空时，直接返回*/
        if (data == null || $.trim(data) == "") {
            return;
        }
        /*处理Ajax返回的文本信息*/
        else if (/string/.test(typeof data)) {
            /*字符串格式满足json格式*/
            if (data.indexOf("{") == 0 || data.indexOf("[") == 0) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    //                    alert(data);
                }
            }
            /*字符串格式不满足json格式*/
            else {
                //                alert(data);
            }
        }
        /*处理Ajax返回的Json对象信息*/
        else if (/object/.test(typeof data)) {

        }

        return data;
    };
    //  存储在线信息列表
    $.setGpsInfo = function (paraArr) {
        gpsInfoArr = paraArr;
    };
    //  获取在线信息列表
    $.getGpsInfo = function () {
        return gpsInfoArr;
    };
    //  存储当前定位
    $.setIsPosition = function (paraArr) {
        isPosition = paraArr;
    };
    //  获取当前定位
    $.getIsPosition = function () {
        return isPosition;
    };
    //  获取百度地图视野
    $.getViewPoints = function () {
        return viewPoints
    };
    //  存储百度地图视野
    $.setViewPoints = function (arr) {
        if (arr == null || !/number/.test(typeof arr.length)) {
            return;
        }

        viewPoints = arr;
    };
    //  获取地图对象
    $.getMapObj = function () {
        return mapObj
    };
    //  获取地图对象
    $.setMapObj = function (obj) {
        if (obj == null) {
            return;
        }

        mapObj = obj;
    };
    //  获取地图类型
    $.getMapType = function () {
        return mapType;
    };
    //  存储地图类型
    $.setMapType = function (type) {
        if (type == null) {
            return;
        }

        mapType = type;
    };
    //  获取地图中心点
    $.getCenterPoint = function () {
        return centerPoint;
    };
    //  存储地图中心点
    $.setCenterPoint = function (center) {
        if (center == null) {
            return;
        }

        centerPoint = center;
    };
    //  获取地图边缘
    $.getLatLngBounds = function () {
        return latLngBounds;
    };
    //  存储地图边缘
    $.setLatLngBounds = function (bounds) {
        if (bounds == null) {
            return;
        }

        latLngBounds = bounds;
    };
    $.getFirstLoad = function () {
        return firstLoad;
    };
    $.setFirstLoad = function (loadState) {
        firstLoad = loadState;
    };
    $.getVehDisp = function () {
        return vehDisp;
    };
    $.setVehDisp = function (display) {
        vehDisp = display;
    };
})(jQuery);

$(window).load(function () {
    syncSize();
    status = parseInt(-1);
    $("#spanUserName").html($("#hidUserName").val());
    UserId = $("#hidUserID").val();
    language = $("#hidLanguage").val();
    loginName = $("#hidLoginName").val();
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    var src = $("#hidIframeSrc").val();
    $("#ifmMap").attr("src", src);
    allDevices = { "devices": [] };

    //  ajax加载公司树
    ajaxLoadingTree();

    $("#VehicleList").css("height", ($(window).height() - $("#VehicleList").offset().top) + "px");
    $("#divLeft").css({
        "height": $(window).height() + "px"
    });

    //  详细信息列表托拉改变大小过程
    $("#divDevicesList").resizable({
        "handles": "n",
        "resize": function () {
            if ($("#mastPanel").length == 0) {
                $("body").append(
                    "<div id=\"mastPanel\" style=\"position: absolute; width: " +
                    ($($("#ifmMap")[0].contentWindow).width()) + "px; height: " +
                    $(window).height() + "px; left: " + $("#ifmMap").offset().left + "px; z-index: 9998\">" +
                    "</div>"
                );
            }

            if ($("#divDevicesList").height() <= 25) {
                $("#divDevicesListHead table:first a").css({
                    "background": "url(images/accordion_arrows.png) no-repeat -16px 0px"
                });
                resizeState = 0;
            } else {
                $("#divDevicesListHead table:first a").css({
                    "background": "url(images/accordion_arrows.png) no-repeat 0px 0px"
                });
                resizeState = 1;
            }
        },
        "stop": function () {
            if ($("#mastPanel").length > 0) {
                $("#mastPanel").remove();
            }
        },
        "minHeight": 25
    });

    //  窗体改变大小时触发的事件
    $(window).resize(function () {
        var $adult = null, $table = $("#tbMyDevice"), $tr = $table.find("tr[selected=\"selected\"]"),
            gpsInfo = null, marker = null, point = null;

        if ($("#VehicleList").length > 0) {
            $("#VehicleList").css({
                "height": ($(window).height() - $("#VehicleList").offset().top) + "px"
            });
        }
        $adult = $("#tbMyDevice_tableData,#tbMyDevice_tableLayout");
        if ($adult.length > 0) {
            $adult.css("height", $("#VehicleList").height());
        }

        $("#divDevicesList").css({
            "width": (
                $(window).width() - $("#divLeft").width() -
                    ($.trim($("#fullreturn", parent.document).css("display")
            ) != "none" ? 2 : 0)) + "px",
            "top": ($(window).height() - $("#divDevicesList").outerHeight(true) - ($.trim($("#fullreturn", parent.document).css("display")) != "none" ? 0 : -2)) + "px"
        });
        $("#divDevicesListInfo").css({
            "height": ($("#divDevicesList").height() - 25) + "px"
        });
        $("#tbRealTimeCtrl_tableLayout,#tbRealTimeCtrl_tableData").css({
            "height": ($("#divDevicesList").height() - 49) + "px"
        });
        $("#ifmMap").css({
            "width": ($(window).width() - $("#divLeft").width() - ($.trim($("#fullreturn", parent.document).css("display")) != "none" ? 3 : 1)) + "px",
            "height": ($(window).height() - $("#divDevicesList").height()) + "px"
        });
        $("#divLeft").css({
            "height": $(window).height() + "px"
        });

        //  处理表格滚动距离
        if ($tr.length > 0) {
            $("#tbMyDevice_tableData").scrollTop(0);
            if (($tr.offset().top + $tr.outerHeight(true) + 17) > ($("#tbMyDevice_tableData").offset().top + $("#tbMyDevice_tableData").outerHeight(true))) {
                $("#tbMyDevice_tableData").scrollTop(($tr.offset().top + $tr.outerHeight(true) + 17) - ($("#tbMyDevice_tableData").offset().top + $("#tbMyDevice_tableData").outerHeight(true)));
            }

            if ($("#ifmMap")[0].contentWindow.MrkArr[$tr.find(":input[name=\"imei\"]").val()] != null) {
                gpsInfo = $("#ifmMap")[0].contentWindow.MrkArr[$tr.find(":input[name=\"imei\"]").val()].data;

                if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Baidu") {
                    point = new ($("#ifmMap")[0].contentWindow.BMap.Point)(gpsInfo.Longitude, gpsInfo.Latitude);
                    setTimeout(function () {
                        $("#ifmMap")[0].contentWindow.map.panTo(point);
                    }, 100);
                }
            }
        }
    });
    $("#divDevicesList").show();
    $.FixTable(
        "tbRealTimeCtrl", 0, $("#divDevicesList").width(),
        $("#divDevicesListInfo").height() - 24
    );

    //  ajax获取每个公司的车辆数量
    //    $.ajax({
    //        "url": "../Ajax/DevicesAjax.ashx",
    //        "type": "POST",
    //        "data": {
    //            "requestType": "ajax获取每个公司的车辆数量"
    //        },
    //        "success": function (data) {
    //            var nodes = null, node = null,
    //                vehicleArr = null, gpsDataArr = null,
    //                countObj = null, vehicle = null, gpsData = null;

    //            data = $.getResponseData(data);
    //            if (/string/.test(typeof data)) {
    //                alert(data);
    //            } else if (/object/.test(data)) {
    //                vehicleArr = data.vehicleList;
    //                console.log(vehicleArr);
    //                gpsDataArr = data.gpsDataList;
    //                nodes = zTree.getNodes();
    //                nodes = zTree.transformToArray(nodes);

    //                for (var nodeIndex in nodes) {
    //                    node = nodes[nodeIndex];
    //                    countObj = countObj == null ? {} : countObj;
    //                    countObj[node.id] = countObj[node.id] == null ?
    //                        {} : countObj[node.id];
    //                    countObj[node.id].totalCount = countObj[node.id].totalCount == null ? 0 :
    //                        countObj[node.id].totalCount;
    //                    countObj[node.id].onlineCount = countObj[node.id].onlineCount == null ? 0 :
    //                        countObj[node.id].onlineCount;
    //                }
    //            }
    //        }
    //    });
});

//window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8;
    var w = $(this).width() - 20;
    var h3 = $(this).height() - 30;

    $("#ifmMap").css({
        "width": ($(window).width() - $("#divLeft").width() - 1) + "px",
        "height": ($(window).height() - $("#divDevicesList").height()) + "px"
    });
    $("#divDevicesList").css({
        "width": ($(window).width() - $("#divLeft").width() - 1) + "px",
        "left": ($("#divLeft").width()) + "px",
        "top": ($(window).height() - 201) + "px"
    });
    $("#tbRealTimeCtrl_tableLayout,#tbRealTimeCtrl_tableData").css({
        "width": ($(window).width() - $("#divLeft").width() - 1) + "px",
        "height": ($("#divDevicesList").height() - 49) + "px"
    });
}

function showDevicesListDiv(t) {
    if (t == 0) {
        $("#divDevicesList").css({
            "height": "200px",
            "top": ($(window).height() - 201) + "px"
        });
        $("#divDevicesList").find("a").css({
            "background": "url(images/accordion_arrows.png) no-repeat 0px 0px"
        });
        $("#divDevicesListInfo").css({
            "height": 175 + "px"
        });
        $("#tbRealTimeCtrl_tableLayout,#tbRealTimeCtrl_tableData").css({
            "height": ($("#divDevicesList").height() - 49) + "px"
        });
        $("#ifmMap").css({
            "height": ($(window).height() - 200) + "px"
        });
        resizeState = 1;
    } else {
        $("#divDevicesList").css({
            "height": "25px",
            "top": ($(window).height() - 26) + "px"
        });
        $("#divDevicesList").find("a").css({
            "background": "url(images/accordion_arrows.png) no-repeat -16px 0px"
        });
        $("#divDevicesListInfo").css({
            "height": ($("#divDevicesList").height() - 25) + "px"
        });
        $("#ifmMap").css({
            "height": ($(window).height() - $("#divDevicesList").height()) + "px"
        });
        resizeState = 0;
    }
}

function setInitLanguage() {

    $("#sendBtn").html(" " + allPage.confirm + " ");
    $("#closeBtn").html(" " + allPage.cancel + " ");
    $("#btnAddGroup").val(allPage.confirm);

    $("#txtSearchInput").val(mapPage.searchInput);
    $("#lbldivCommandListTitle").html(mapPage.checkCommandTitle);

    $("#btnSendSOSPhone").html(" " + allPage.confirm + " ");
    $("#btnCloseSOSPhone").html(" " + allPage.cancel + " ");

    $("#btnCellPhone").html(" " + allPage.confirm + " ");
    $("#btnCloseCellPhone").html(" " + allPage.cancel + " ");

    $("#btnInterval").html(" " + allPage.confirm + " ");
    $("#btnCloseInterval").html(" " + allPage.cancel + " ");

    $("#btnSendTxt").html(" " + allPage.confirm + " ");
    $("#btnCloseSendTxt").html(" " + allPage.cancel + " ");

    $("#btnSendD2SMS").html(" " + allPage.confirm + " ");
    $("#btnCloseSendD2SMS").html(" " + allPage.cancel + " ");
}

//  加载公司树
function ajaxLoadingTree() {
    setting = {
        isSimpleData: true,
        treeNodeKey: "id",
        treeNodeParentKey: "pId",

        callback: {
            expandSpeed: "",
            beforeClick: zTreeOnBeforeClick,
            click: zTreeOnClick
        }

    };
    zNodes = $("#hidComs").val();
    zNodes = eval("(" + zNodes + ")");
    reloadTree(zNodes);
}

function onAsyncSuccess1(event, treeId, treeNode, msg) {
    $("#divLoading").hide();
}

//  单击节点之前
function zTreeOnBeforeClick(treeId, treeNode) {
    //    if (treeNode != null) {
    //        $("#" + treeNode.tId + "_span").html(treeNode.name);
    //    }
}

//  单击节点时
function zTreeOnClick(event, treeId, treeNode) {
    var $activeTr = null, mapType = "";

    if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Gaode") {
        $("#ifmMap")[0].contentWindow.MrkArr = new Array();
    }
    $activeTr = $("#tbMyDevice tr[selected=\"selected\"]");
    if ($activeTr.length > 0) {
        if ($("#ifmMap")[0].contentWindow.MrkArr[$activeTr.find(":input[name=\"imei\"]").val()] != null) {
            $("#ifmMap")[0].contentWindow.HideDeviceInfo($activeTr.find(":input[name=\"imei\"]").val());
        }
    }
    if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Baidu") {
        $("#ifmMap")[0].contentWindow.clearMap();
        $("#ifmMap")[0].contentWindow.MrkArr = new Array();
    } else if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Google" ||
        $.trim($("#selMap", $("#ifmMap").contents()).val()) == "Gaode" ||
        $.trim($("#selMap", $("#ifmMap").contents()).val()) == "soso") {
        $("#ifmMap")[0].contentWindow.clearMap($.getGpsInfo());
        //        if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "soso") {
        //            $("#ifmMap")[0].contentWindow.MrkArr = new Array();
        //        }
    }

    $.setIsPosition(false);

    $("#allCountSpan,#spanDevicesOnline,#spanDevicesOffline").html("");
    $("#tbMyDevice tbody tr").remove();
    $("#tbRealTimeCtrl tbody tr").remove();
    $.setFirstLoad(true);
    ajaxGetDevices(treeNode.id, treeNode);
    mapType = $.trim($("#selMap", $("#ifmMap").contents()).val());
    $("#ifmMap")[0].contentWindow.runIndex = 1;
    $("#ifmMap").contents().find("#spanSecond").html(30);
    clearInterval(timer);
    timedFreshBMap(treeNode);
}

//  定时刷新百度地图
function timedFreshBMap(treeNode) {
    timer = setInterval(function () {
        var $table = $("#tbMyDevice"), $check = null, $tr = null;

        if ($("#ifmMap")[0].contentWindow.runIndex < 30) {
            $("#ifmMap").contents().find("#spanSecond").html(30 - ($("#ifmMap")[0].contentWindow.runIndex++));
            $("#ifmMap").contents().find("#disSecond").show();
            return;
        } else {
            $("#ifmMap")[0].contentWindow.runIndex = 1;
            $("#ifmMap").contents().find("#spanSecond").html(30);
        }

        if ($table.length > 0) {
            $tr = $table.find("tr[selected=\"selected\"]");
            if ($tr.length > 0) {
                if ($("#ifmMap")[0].contentWindow.MrkArr[$tr.find(":input[name=\"imei\"]").val()] != null) {
                    $("#ifmMap")[0].contentWindow.HideDeviceInfo($tr.find(":input[name=\"imei\"]").val());
                }
            }
        }

        ajaxGetDevices(treeNode.id, treeNode);
    }, 1000);
}

//  加载树
function reloadTree(zNodes) {
    zTree = $("#tree").zTree(setting, clone(zNodes));
}

//  更新我的设备
function updateMyDevice($myDevice, vehicle, gpsInfoArr) {
    var columnName = columnValue = "", trStr = "",
        $table = null, vehDisp = null;

    //    console.log(!vehicle || $myDevice == null || $myDevice.length == null || $myDevice.length == 0);
    //    if (!vehicle || $myDevice == null || $myDevice.length == null || $myDevice.length == 0) {
    //        return ;
    //    }
    if ($myDevice == null || $myDevice.length == null || $myDevice.length == 0) {
        return;
    }

    vehDisp = $.getVehDisp();
    columnName = $.trim($("#sltVehicleCond").val());
    columnValue = $.trim($("#txtSearchInput").val());

    for (var i = 0; i < gpsInfoArr.length; i++) {
        trStr += "<tr onclick='$(this).trClick($(this).parents(\"table:first\"))' style='color: " +
            (gpsInfoArr[i].Online ? "black" : "silver") + ";' status='" +
            (gpsInfoArr[i].Online ? "online" : "offline") + "' " +
            "onmouseover='$(this).trOver()' onmouseout='$(this).trOut()'>" +
            "<td style=\"text-align: center;\">" +
                "<input type=\"checkbox\" " + (
                    !vehDisp || vehDisp[gpsInfoArr[i].imei] == null || vehDisp[gpsInfoArr[i].imei] == true ?
                        "checked=\"checked\"" : ""
                ) + " onclick=\"toggVehDisp($(this))\" />" +
            "</td>" +
            "<td style=\"cursor: pointer; padding: 0px 10px; text-align:center;\">" + gpsInfoArr[i].PlateNo +
                "<input type=\"hidden\" name=\"VehicleId\" value='" + gpsInfoArr[i].imei + "' />" +
                "<input type=\"hidden\" name=\"PlateNo\" value='" + gpsInfoArr[i].PlateNo + "' />" +
                "<input type=\"hidden\" name=\"imei\" value='" + gpsInfoArr[i].imei + "' />" +
                "<input type=\"hidden\" name=\"SimNo\" value='" + gpsInfoArr[i].SimNo + "' />" +
            "</td>" +
            "<td style=\"cursor: pointer; padding: 0px 10px; text-align: right;\">" +
                (parseFloat(gpsInfoArr[i].Velocity, 10) * 3.6).toFixed(2) +
            "</td>" +
            "<td style=\"cursor: pointer; width: auto; padding: 0px 10px; text-align:center;\">" +
                (gpsInfoArr[i].Online ? "在线" : "离线") +
            "</td>" +
        "</tr>";
    }

    //    $myDevice.html("");
    //    $myDevice.setVal(vehicle);

    //    $table = $myDevice.find("table:last");
    $table = $("#tbMyDevice");

    $table.find("tbody").html(trStr);

    $table.css(
        "width",
        ($table.width() < $("#VehicleList").width() - 17 ? $("#VehicleList").width() - 17 :
            $table.width())
    );
    $table.find("tr:first td").css({
        "border-right": "none"
    });
    $table.find("tr:first td").css({
        "border-right": "1px dotted #ccc"
    });
    $table.find("tr:first td:first").css({
        "border-left": "1px dotted #ccc"
    });
    if ($table.length > 0 && gpsInfoArr.constructor == Array) {
        $table.find("tbody tr[status=\"online\"]").prependTo($table);
        $.FixTable($table.attr("id"), 0, $("#VehicleList").width(), $("#VehicleList").height());
    }

    likeSearch(window.event, $("#VehicleList table:last"), "gpsInfoArrStr", $("#sltVehicleCond").val(), $.trim(columnValue));
}

//显示设备弹窗
function showGPSHtml(imei) {
    currImei = $("#ifmMap")[0].contentWindow.ShowDeviceInfo(imei);
}

//  更新监控窗口
function updateMonitorForm($table, gpsAll) {
    var classStr = "",
        statusAttr = "",
        columnName = "", columnValue = "", trStr = "",
        gpsForm = null, hasPrivate = false;

    columnName = $.trim($("#sltCondition").val());
    columnValue = $.trim($("#txtCondition").val());

    for (var i = 0; i < gpsAll.length; i++) {
        gpsForm = $.modifyGPSData(gpsAll[i]);
        classStr = gpsForm.Online ? "black" : "silver";
        statusAttr = gpsForm.Online ? "online" : "offline"

        trStr += "<tr style=\"cursor:pointer; color:" + classStr + ";\" status=\"" + statusAttr + "\" " +
                "onclick='$(this).trClick()' onmouseover='$(this).trOver()' onmouseout='$(this).trOut()'>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; border-right: 1px dotted #ccc; " +
                    "border-left: 1px dotted #ccc; width: 60px; padding: 0px; text-align: center;\">" + gpsForm.PlateNo +
                    "<input type=\"hidden\" name=\"PlateNo\" value=\"" + gpsForm.PlateNo + "\" />" +
                    "<input type=\"hidden\" name=\"imei\" value=\"" + gpsForm.imei + "\" />" +
                    "<input type=\"hidden\" name=\"SimNo\" value=\"" + gpsForm.SimNo + "\" />" +
                "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; border-right: 1px dotted #ccc; " +
                    "width: 80px; padding: 0px; text-align: right;\">" + gpsForm.SimNo + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; border-right: 1px dotted #ccc; " +
                    "width: 120px; padding: 0px; text-align: right;\">" + gpsForm.imei + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 114px; padding: 0px; text-align: right;\">0.00</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 94px; padding: 0px; text-align: right;\">" +
                    (parseFloat(gpsForm.Velocity) * 3.6).toFixed(2) + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 36px; padding: 0px; text-align: right;\">" +
                    GetCoureName(gpsForm.Direction) + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 72px; padding: 0px; text-align: right;\">" +
                    (parseFloat(gpsForm.Mileage).toFixed(2)) + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 180px; padding: 0px; text-align: center;\">" +
                    (gpsForm.Status == null ? "" : gpsForm.Status) + "</td>" +
                "<td class=\"tc\" class=\"watch\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc;display: " +
                    (gpsForm.CarIndustry == 1 ? "none" : "table-cell") +
                    "; width: 48px; padding: 0px; text-align: center;\">" +
                    (gpsForm.MeterStatus == 1 ? "已打表" : gpsForm.MeterStatus == 0 ? "未打表" : "--") + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 120px; padding: 0px; text-align: right;\">" +
                    gpsForm.SendTime + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; " +
                    "border-right: 1px dotted #ccc; width: 120px; padding: 0px; text-align: right;\">" +
                    $.DateToString("yyyy-MM-dd HH:mm:ss", new Date()) + "</td>" +
                "<td class=\"tc\" style=\"border-top: 1px dotted #ccc; border-right: 1px dotted #ccc; " +
                    "padding: 0px; text-align: right;\">" +
                    "<a onclick=\"$('#ifmMap')[0].contentWindow.getAddressByBMap($(this), true)\">" +
                        (gpsForm.Longitude != -1 && gpsForm.Latitude != -1 ? gpsForm.Longitude +
                        "," + gpsForm.Latitude : "") +
                    "</a>" +
                "</td>" +
            "</tr>";

        if (gpsForm.CarIndustry == 1) {
            hasPrivate = true;
        }
    }
    $table.find("tbody").html(trStr);
    $table.find("tbody tr[status=\"online\"]").prependTo($table.find("tbody"))

    likeSearch(window.event, $table, "gpsInfoArrStr", columnName, columnValue);

    //    $table.find("thead tr:eq(0) th.watch").css("display", (hasPrivate ? "none" : "table-cell"));
    toggleTbSlt($("#tbRealTimeCtrl"));
    $table.find("tr:not(:first):first").click();
}

function showDeviceList(a, $table) {

    for (var i = 0; i < 3; i++) {
        var id = "aAll";
        if (i == 0) {
            id = "aAll";
        } else if (i == 1) {
            id = "aOnline";
        } else if (i == 2) {
            id = "aOffline";
        }

        if (id == a) {
            $("#" + id).parent().parent().attr("class", "navigate_item navigate_item_over");
        } else {
            $("#" + id).parent().parent().attr("class", "navigate_item");
        }
    }
    $("#divLeftMenu").hide();
    changeDevicesList(a, $table);
}

var clkTabDeviceTab = "all";

function changeDevicesList(s, $table) {
    var type = "all";
    if (s == "aAll") {

    } else if (s == "aOnline") {
        type = "online";
    } else {
        type = "offline";
    }
    ifmMap.window.HideShowPopumarker();
    showDevicesTable(type, $table);
    clkTabDeviceTab = type;
}


var isFirst = true;
var allDevices = null;
var allGroups = [];
var allGroupsDivIDs = [];
var isSetMapCenter = true;

function onClick(event, treeId, treeNode, clickFlag) {

    $("#divLeftMenu").hide();
    initUserDevices();
    openDeviceDivID = null;
    UserId = treeNode.id;
    ifmMap.window.clearSecond();
    ifmMap.window.HidePopumarker();
    getGroup();
}

function initUserDevices() {
    allDevices = null;
    allGroups.length = 0;
    allGroupsDivIDs.length = 0;
    $("#divDevicesTable").html("");
    $("#divLeftMenuGroup").html("");
}

function initGetDevices() {
    isFirst = true;
    isSetMapCenter = true;
    ajaxGetDevices();
    ifmMap.window.showPOIMap(UserId);
}

//  Ajax获取设备信息
function ajaxGetDevices(comId, treeNode) {
    var TimeZone = $("#hidTimeZone").val();
    var TimeInfo = null;
    var StartTime = null;
    var EndTime = null;
    //    alert($.trim($("#selMap", $("#ifmMap").contents()).val()));
    $.ajax({
        type: "post",
        //        url: "VehicleListPage.aspx",
        url: "../Ajax/DevicesAjax.ashx",
        data: {
            "id": comId, "isFirst": isFirst, "TimeZones": TimeZone,
            "mapType": $.trim($("#selMap", $("#ifmMap").contents()).val()),
            "requestType": "实时监控页面读取车辆"
        },
        success: function (data) {
            var infoStr = "", info,
                onlineCount = offlineCount = 0,
                columnName = "", columnValue = "",
                gpsArr = null, vehicleArr = null, gps = null, vehicle = null, gpsInfoArr = null, point = null,
                gpsCopy = null, convertCount = 0, convertGpsCopyArr = [],
                geocoder = null, pointForAddress = null, pointForConvert = null, gpsCopyArr = [], addCount = 0,
                $table = null, points = null, viewport = null, minPoint = null, maxPoint = null, bounds = null,
                minLatLng = null, maxLatLng = null, latlngBounds = null, vehDisp = null, treeNodeId = 0;

            onlineCount = offlineCount = 0;

            data = $.getResponseData(data);
            vehDisp = $.getVehDisp();

            if (data == null) {
                return;
            }

            StartTime = new Date();

            gpsInfoArr = data.GpsInfo;
            treeNodeId = parseInt(data.treeNodeId);

            if (treeNodeId == parseInt(zTree.getSelectedNode().id, 10)) {
                if (gpsInfoArr != null && gpsInfoArr.constructor == Array) {
                    //  更新监视窗口
                    $table = $("#divDevicesListInfo table:last");
                    //  更新百度地图 
                    if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Baidu") {
                        var BMap = new $("#ifmMap")[0].contentWindow.BMap;
                        for (var i = 0; i < gpsInfoArr.length; i++) {
                            var longitude = gpsInfoArr[i].Longitude;
                            var latitude = gpsInfoArr[i].Latitude;
                            gps = $.modifyGPSData(gpsInfoArr[i]);

                            /*var point = new BMap.Point(longitude, latitude);
                            BMap.Convertor.translate(point, 0, function (correctPoint) {
                                if (correctPoint != null) {
                                    gps.longitude = correctPoint.lng;
                                    gps.latitude = correctPoint.lat;
                                }
                            });*/


                            gps.display = !vehDisp || vehDisp[$.trim(gps.imei)] == null ? true : vehDisp[$.trim(gps.imei)];
                            if (gps.Velocity < 1) {
                                gps.speed = gps.Velocity = 0;
                            }
                            if (gps.Online) {
                                onlineCount++;
                            } else {
                                offlineCount++;
                            }
                            if (gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
                                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000 &&
                                gps.display) {

                                points = points == null ? [] : points;
                                points.push(new ($("#ifmMap")[0].contentWindow.BMap.Point)(gps.Longitude, gps.Latitude));
                                $("#ifmMap")[0].contentWindow.addMarker(gps, function (imei) {
                                    var $table = $("#tbMyDevice"),
                                        $tr = null, $check = null;

                                    if ($table.length > 0) {
                                        $check = $table.find(":input[value=\"" + imei + "\"]");

                                        if ($check.length > 0) {
                                            $tr = $check.parents("tr:first");
                                            if (!$tr.attr("selected")) {
                                                $tr.click();
                                                $(window).resize();
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        $($("#ifmMap")[0].contentWindow.map.getPanes().floatShadow).mouseover(function () {
                            $(this).css({
                                "z-index": 9999999 + gpsInfoArr.length,
                                "cursor": "default"
                            });
                        });
                        if ($.getFirstLoad() && points != null && points.length > 0) {
                            $.setFirstLoad(false);
                            $("#ifmMap")[0].contentWindow.map.setViewport(points, {
                                "delay": 0
                            });
                            points.sort(function (p1, p2) {
                                return p1.lng - p2.lng;
                            });
                            minPoint = minPoint == null ? {} : minPoint;
                            maxPoint = maxPoint == null ? {} : maxPoint;
                            minPoint.lng = points[0].lng;
                            maxPoint.lng = points[points.length - 1].lng;
                            points.sort(function (p1, p2) {
                                return p1.lat - p2.lat;
                            });
                            minPoint.lat = points[0].lat;
                            maxPoint.lat = points[points.length - 1].lat;

                            minPoint = new ($("#ifmMap")[0].contentWindow.BMap.Point)(minPoint.lng, minPoint.lat);
                            maxPoint = new ($("#ifmMap")[0].contentWindow.BMap.Point)(maxPoint.lng, maxPoint.lat);
                            bounds = new ($("#ifmMap")[0].contentWindow.BMap.Bounds)(minPoint, maxPoint);

                            $.setCenterPoint(bounds.getCenter());
                        }
                        //  更新设备详细信息列表
                        setTimeout(function () { updateMonitorForm($("#divDevicesListInfo table:last"), gpsInfoArr); }, 0);
                        //  更新我的设备表格
                        updateMyDevice($("#VehicleList"), data, gpsInfoArr);
                        $("#allCountSpan").html(gpsInfoArr.length);
                        $("#spanDevicesOnline").html(onlineCount);
                        $("#spanDevicesOffline").html(gpsInfoArr.length - onlineCount);
                    }
                    //  更新谷歌地图
                    else if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Google") {
                        latlngBounds = new ($("#ifmMap")[0].contentWindow.google.maps.LatLngBounds)();
                        for (var i = 0; i < gpsInfoArr.length; i++) {
                            gps = $.modifyGPSData(gpsInfoArr[i]);
                            gps.display = !vehDisp || vehDisp[$.trim(gps.imei)] == null ? true : vehDisp[$.trim(gps.imei)];

                            if (gps.Online) {
                                onlineCount++;
                            } else {
                                offlineCount++;
                            }

                            if (gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
                                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000 &&
                                gps.display) {
                                $("#ifmMap")[0].contentWindow.addMarker(gps, function (imei) {
                                    var $table = $("#tbMyDevice"),
                                        $tr = null, $check = null;

                                    if ($table.length > 0) {
                                        $check = $table.find(":input[value=\"" + imei + "\"]");

                                        if ($check.length > 0) {
                                            $tr = $check.parents("tr:first");
                                            if (!$tr.attr("selected")) {
                                                $tr.click();
                                                $(window).resize();
                                            }
                                        }
                                    }
                                });
                                latlngBounds.extend(new ($("#ifmMap")[0].contentWindow.google.maps.LatLng)(gps.latitude, gps.longitude));
                            }
                        }
                        //  更新设备详细信息列表
                        setTimeout(function () {
                            updateMonitorForm($("#divDevicesListInfo table:last"), gpsInfoArr);
                        }, 0);
                        //  更新我的设备表格
                        updateMyDevice($("#VehicleList"), data, gpsInfoArr);
                        $("#allCountSpan").html(gpsInfoArr.length);
                        $("#spanDevicesOnline").html(onlineCount);
                        $("#spanDevicesOffline").html(gpsInfoArr.length - onlineCount);
                        if ($.getFirstLoad()) {
                            $.setFirstLoad(false);
                            if (!$.getIsPosition()) {
                                if (gpsInfoArr.length > 0) {
                                    $("#ifmMap")[0].contentWindow.map.fitBounds(latlngBounds);
                                    $.setLatLngBounds(latlngBounds);
                                    //                            $.setCenterPoint(latlngBounds.getCenter());
                                } else {
                                    $("#ifmMap")[0].contentWindow.map.setCenter(new google.maps.LatLng(0, 0));
                                    $("#ifmMap")[0].contentWindow.map.setZoom(3);
                                }
                            }
                            $.setCenterPoint($("#ifmMap")[0].contentWindow.map.getCenter());
                        }
                    }
                    //  更新高德地图
                    else if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Gaode") {
                        for (var i = 0; i < gpsInfoArr.length; i++) {
                            gps = $.modifyGPSData(gpsInfoArr[i]);
                            gps.display = !vehDisp || vehDisp[$.trim(gps.imei)] == null ? true : vehDisp[$.trim(gps.imei)];
                            //                            console.log(gps.display);
                            if (gps.Online) {
                                onlineCount++;
                            } else {
                                offlineCount++;
                            }

                            if (gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
                                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000 &&
                                gps.display) {
                                $("#ifmMap")[0].contentWindow.addMarker(gps, function (imei) {
                                    var $table = $("#tbMyDevice"),
                                        $tr = null, $check = null;

                                    if ($table.length > 0) {
                                        $check = $table.find(":input[value=\"" + imei + "\"]");

                                        if ($check.length > 0) {
                                            $tr = $check.parents("tr:first");
                                            if (!$tr.attr("selected")) {
                                                $tr.click();
                                                $(window).resize();
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //  更新设备详细信息列表
                        setTimeout(function () {
                            updateMonitorForm($("#divDevicesListInfo table:last"), gpsInfoArr);
                        }, 0);
                        //  更新我的设备表格
                        updateMyDevice($("#VehicleList"), data, gpsInfoArr);
                        $("#allCountSpan").html(gpsInfoArr.length);
                        $("#spanDevicesOnline").html(onlineCount);
                        $("#spanDevicesOffline").html(gpsInfoArr.length - onlineCount);
                        if ($.getFirstLoad()) {
                            $.setFirstLoad(false);
                            if (!$.getIsPosition()) {
                                if (gpsInfoArr.length > 0) {
                                    $("#ifmMap")[0].contentWindow.map.setFitView();
                                } else {
                                    $("#ifmMap")[0].contentWindow.map.setCenter($("#ifmMap")[0].contentWindow.map.getCenter());
                                    $("#ifmMap")[0].contentWindow.map.setZoom(3);
                                }
                            }
                            $.setCenterPoint($("#ifmMap")[0].contentWindow.map.getCenter());
                        }
                    } else if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "soso") {
                        latlngBounds = new ($("#ifmMap")[0].contentWindow.qq.maps.LatLngBounds)();
                        for (var i = 0; i < gpsInfoArr.length; i++) {
                            gps = $.modifyGPSData(gpsInfoArr[i]);
                            gps.display = !vehDisp || vehDisp[$.trim(gps.imei)] == null ? true : vehDisp[$.trim(gps.imei)];
                            if (gps.Online) {
                                onlineCount++;
                            } else {
                                offlineCount++;
                            }

                            if (gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
                                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000 &&
                                gps.display) {
                                $("#ifmMap")[0].contentWindow.addMarker(gps, function (imei) {
                                    var $table = $("#tbMyDevice"),
                                        $tr = null, $check = null;

                                    if ($table.length > 0) {
                                        $check = $table.find(":input[value=\"" + imei + "\"]");

                                        if ($check.length > 0) {
                                            $tr = $check.parents("tr:first");
                                            if (!$tr.attr("selected")) {
                                                $tr.click();
                                                $(window).resize();
                                            }
                                        }
                                    }
                                });
                                latlngBounds.extend(new ($("#ifmMap")[0].contentWindow.qq.maps.LatLng)(gps.latitude, gps.longitude));
                            }
                        }
                        var icon = $("#ifmMap")[0].contentWindow.GetSOSOIcon(32, "Online", 0);
                        //  更新设备详细信息列表
                        setTimeout(function () {
                            updateMonitorForm($("#divDevicesListInfo table:last"), gpsInfoArr);
                        }, 0);
                        //  更新我的设备表格
                        updateMyDevice($("#VehicleList"), data, gpsInfoArr);
                        $("#allCountSpan").html(gpsInfoArr.length);
                        $("#spanDevicesOnline").html(onlineCount);
                        $("#spanDevicesOffline").html(gpsInfoArr.length - onlineCount);
                        if ($.getFirstLoad()) {
                            $.setFirstLoad(false);
                            if (!$.getIsPosition()) {
                                if (gpsInfoArr.length > 0) {
                                    $("#ifmMap")[0].contentWindow.map.fitBounds(latlngBounds);
                                    $.setLatLngBounds(latlngBounds);
                                    //                            $.setCenterPoint(latlngBounds.getCenter());
                                } else {
                                    $("#ifmMap")[0].contentWindow.map.setCenter(new qq.maps.LatLng(25.502, 115.932));
                                    $("#ifmMap")[0].contentWindow.map.setZoom(6);
                                }
                            }
                            $.setCenterPoint($("#ifmMap")[0].contentWindow.map.getCenter());
                        }
                    }
                    $("#tbRealTimeCtrl").find("tr[status=\"online\"]").prependTo($("#tbRealTimeCtrl"));
                    $.setGpsInfo(gpsInfoArr);
                } else {
                    if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Baidu") {
                        $.setCenterPoint($("#ifmMap")[0].contentWindow.map.getCenter());
                    } else if ($.trim($("#selMap", $("#ifmMap").contents()).val()) == "Google") {
                        $("#ifmMap")[0].contentWindow.map.setCenter($("#ifmMap")[0].contentWindow.map.getCenter());
                        $("#ifmMap")[0].contentWindow.map.setZoom($("#ifmMap")[0].contentWindow.map.getZoom());
                    }
                }
            }
            EndTime = new Date();
            TimeInfo = EndTime - StartTime;

            //  后台偏移量处理代码执行时间监视信息
            /*if (data.stopwatchInfo != null) {
            $("#ifmMap").contents().find("#IntervalTime").html(data.stopwatchInfo + "js更新列表用时：" + TimeInfo + "毫秒。");
            }*/
        }
    });
}

function toggVehDisp($check, ev) {
    var imei = "", gpsInfoArr = null, gpsInfo = null, vehDisp = null;

    if ($check.length == 0) {
        return;
    }

    ev = ev || window.event;
    imei = $.trim($check.parents("tr:first").find(":input[name=\"imei\"]").val());
    gpsInfoArr = $.getGpsInfo();
    vehDisp = $.getVehDisp() == null ? {} : $.getVehDisp();
    for (var gpsIndex in gpsInfoArr) {
        if ($.trim(gpsInfoArr[gpsIndex].imei) == $.trim(imei)) {
            gpsInfo = gpsInfoArr[gpsIndex];
            break;
        }
    }
    if ($check.attr("checked")) {
        if (gpsInfo != null) {
            $("#ifmMap")[0].contentWindow.addMarker(gpsInfo, function (imei) {
                var $table = $("#tbMyDevice"),
                    $tr = null, $check = null;

                if ($table.length > 0) {
                    $check = $table.find(":input[value=\"" + imei + "\"]");

                    if ($check.length > 0) {
                        $tr = $check.parents("tr:first");
                        if (!$tr.attr("selected")) {
                            $tr.click();
                            $(window).resize();
                        }
                    }
                }
            });
        }

        vehDisp[$.trim(imei)] = true;
    } else {
        if ($("#ifmMap")[0].contentWindow.MrkArr[imei] != null) {
            $("#ifmMap")[0].contentWindow.HideDeviceInfo($.trim(imei));
            $("#ifmMap")[0].contentWindow.MapRemoveOneMrk($.trim(imei));
        }

        vehDisp[$.trim(imei)] = false;
    }
    $.setVehDisp(vehDisp);

    ev.stopPropagation();
}

var alertBeidaoIds = [];
var showMoreDivDeviceArr = [];
var openDeviceDivID = null;
var lastChangeTabState = null;

//  showDevicesTable
function showDevicesTable(s, $table) {
    var gpsArr = null, columnName, columnValue;

    if ($table == null || $table.length == null || $table.length == 0) {
        return;
    }

    gpsArr = $.getGpsInfo();
    $table.find("tr:not(:first)[status=\"online\"]").css(
        "display", (
            $.trim(s).toLowerCase() == "all" || $.trim(s).toLowerCase() == "online" ? "table-row" : "none"
        )
    );
    $table.find("tr:not(:first)[status=\"offline\"]").css(
        "display", (
            $.trim(s).toLowerCase() == "all" || $.trim(s).toLowerCase() == "offline" ? "table-row" : "none"
        )
    );
    columnName = $("#sltVehicleCond").val();
    columnValue = $("#txtSearchInput").val();
    likeSearch(window.event, $table, "gpsInfoArrStr", columnName, columnValue);
}

function getHtmlSize(html) {
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
};



function showMoreDivDevice(id, s) {
    if (openDeviceDivID != id) {
        $("#divLeftMenu").hide();

        var lastidMore = "divTabDeviceMore" + openDeviceDivID;
        var lastidTab = "divTabDevice" + openDeviceDivID;
        $("#" + lastidMore).hide();
        $("#" + lastidTab).removeClass("divDeviceTab");
        var lastDeviceListTRID = "tabTRDevice" + openDeviceDivID;
        $("#" + lastDeviceListTRID).removeClass("divDeviceTab");
        ifmMap.window.setMapCenter(id);

        var idMore = "divTabDeviceMore" + id;
        var idTab = "divTabDevice" + id;
        var deviceListTRID = "tabTRDevice" + id;
        $("#" + idMore).show();
        $("#" + idTab).addClass("divDeviceTab");
        $("#" + deviceListTRID).addClass("divDeviceTab");
        ifmMap.window.ShowDeviceInfo(id); //显示信息框
        ifmMap.window.GetAddress(id);
    } else {
        ifmMap.window.setMapCenter(id);
        ifmMap.window.GetAddress(id);
    }
    openDeviceDivID = id;
}
//iframemap页面切换地图后,左边栏取消选中设备
function removeShowMoreDivDevice() {
    openDeviceDivID = null;
    $("#divLeftMenu").hide();

    var lastidMore = "divTabDeviceMore" + openDeviceDivID;
    var lastidTab = "divTabDevice" + openDeviceDivID;
    var deviceListTRID = "tabTRDevice" + openDeviceDivID;
    $("#" + lastidMore).hide();
    $("#" + lastidTab).removeClass("divDeviceTab");
    $("#" + deviceListTRID).removeClass("divDeviceTab");
}


function init() {
    document.onmousemove = mouseMove;
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



var intervalDeviceMore = null;
var clkGroupItemDeviceID = 0; //用于设备分组
function clkShowMoreMenu(userid, deviceid, model, name, sn, isBeidao, beidaoID) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    clkGroupItemDeviceID = deviceid;
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'ProductUpdate.aspx\',' + deviceid + ');">' + mapPage.divicesInfo + '</a></div>');
    if (isBeidao == "1") {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'BeidaoCheInfo.aspx\',' + beidaoID + ');">' + "案情信息" + '</a></div>');
    }
    if (status != 1) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="Geofences.aspx?id=' + userid + '&deviceid=' + deviceid + '" target="_blank">' + mapPage.geofence + '</a></div>');
    }
    html.push('<div style="padding-top:2px;" class="showdivs" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);">' + mapPage.moveToGroup + '</a>');
    html.push('<div id="divLeftMenuGroup" class="showitems"></div>');
    html.push('</div>');
    if (status != 1) {
        model = loginName == "888" ? 1000 : model;
        //GT06,AW02,GT07,GT06N 断油电,恢复油电,checklocation
        if (model == 12 || model == 18 || model == 15 || model == 17 || model == 26) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'DYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'HFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');

            if (language == "zh-cn") {
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'KKSSTATUS\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "状态查询" + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'KKSRESET\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程重启" + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDivIframe(\'CarCommand.aspx\',' + deviceid + ');">' + "更多指令" + '</a></div>');
            }
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showD2SMS(' + deviceid + ',\'D2SMS\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + '设备发送短信' + '</a></div>');

        } else if (model == 25) {
            //GT06C
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001ON\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001OFF\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Q001\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        } else if (model == 50 || model == 83) {
            //宏远
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV010\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV011\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } else if (model == 51 || model == 52) {
            //TK103
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41141\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41140\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41201\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceFortify + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41200\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceDismiss + '</a></div>');
        } else if (model == 60 || model == 61 || model == 100) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSOSPassword(' + deviceid + ',\'BP11\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "SOS号码" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCellPhone(' + deviceid + ',\'BP05\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "亲情号码" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'BP07\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "上传间隔" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendTxt(' + deviceid + ',\'BP13\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "下发文字" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP020\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程设防" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP021\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程撤防" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP030\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程断油" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP040\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程恢复油" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP120\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听开启" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP121\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听关闭" + '</a></div>');
        } else if (model == 80) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP030\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程断油" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP040\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程恢复油" + '</a></div>');
        } else if ((model > 60 && model < 80) || model >= 110 || model >= 102) {
            if (model > 71 && model < 80) {
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'OBDIndex.aspx\',' + deviceid + ');">' + mapPage.obdChecking + '</a></div>');
            }
            if (model < 100) {
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S201\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S200\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'SCF0\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceFortify + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'SCF1\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceDismiss + '</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDivIframe(\'CarCommand.aspx\',' + deviceid + ');">' + "更多指令" + '</a></div>');
            }
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'S712\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.uploadTime + '</a></div>');
        } else if (model == 40 || model == 43 || model == 44 || model == 45 || model == 46 || model == 47) {
            //明达
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDDYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDHFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } else if (model == 90) {
            //部标
            var loginUserID = $("#hidUserID").val();
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'PHOTO\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "设备拍照" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Lock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门加锁" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Unlock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门解锁" + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="openPage(\'DeviceImgs.aspx\',' + loginUserID + ',' + deviceid + ')" >' + "查看照片" + '</a></div>');
        }
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');
        if (status != 2) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');
            if (language == "zh-cn") {
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="Geofences2.aspx?id=' + UserId + '&deviceid=' + deviceid + '" target="_blank">电子栅栏(多边形)</a></div>');
                //html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="RoutePlanning.aspx?id=' + UserId + '" target="_blank">路线偏离设置</a></div>');
                html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="POI.aspx?id=' + UserId + '" target="_blank">用户POI管理</a></div>');
            }
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
        marginTop = menuHeight - 10;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    showGroupMenuItems();
    $(".showdivs").mouseover(function () {
        $(".showitems").eq($(".showdivs").index(this)).show();
    }).mouseleave(function () {
        $(".showitems").eq($(".showdivs").index(this)).hide();
    });

}

function hideMoreItems() {//隐藏更多功能选项

    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    intervalDeviceMore = setInterval(function () {
        document.getElementById("divLeftMenu").style.display = "none";
        clearInterval(intervalDeviceMore);
    }, 1000);

}

var intervalGroupItem = null;
function hideGroupItems() {//隐藏设备分组

    if (intervalGroupItem) clearInterval(intervalGroupItem);
    intervalGroupItem = setInterval(function () {
        document.getElementById("divLeftMenuGroup").style.display = "none";
        clearInterval(intervalGroupItem);
    }, 1000)

}

var commandType = null; //命令类型
var commandDeviceID = 0; //选中下发命令设备
var commandDeviceSN = null; //选中下发命令的设备IMEI号
var commandModel = 0;
var commandPort = 0; //明达设备下发端口
function showPassword(id, t, name, sn, model) {
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    if (t == "MDDYD" || t == "MDHFYD") {
        $("#trPort").show();
    } else {
        $("#trPort").hide();
    }
    if (t == "DYD" || t == "C001ON" || t == "MDDYD" || t == "41141" || t == "BP030" || t == "S201") {
        $("#lblInputPassTitle").html(mapPage.cutOffPetrol);
    } else if (t == "HFYD" || t == "C001OFF" || t == "MDHFYD" || t == "41140" || t == "BP040" || t == "S200") {
        $("#lblInputPassTitle").html(mapPage.restorePetrol);
    } else if (t == "BP020" || t == "41201" || t == "SCF0") {
        $("#lblInputPassTitle").html(mapPage.deviceFortify);
    } else if (t == "BP021" || t == "41200" || t == "SCF1") {
        $("#lblInputPassTitle").html(mapPage.deviceDismiss);
    } else if (t == "BP120") {
        $("#lblInputPassTitle").html("远程开启监听");
    } else if (t == "BP121") {
        $("#lblInputPassTitle").html("远程关闭监听");
    } else if (t == "Lock") {
        $("#lblInputPassTitle").html("车门加锁");
    } else if (t == "Unlock") {
        $("#lblInputPassTitle").html("车门解锁");
    } else if (t == "PHOTO") {
        $("#lblInputPassTitle").html("设备拍照");
    } else if (t == "CheckLocation" || t == "Q001") {
        $("#lblInputPassTitle").html(mapPage.checkLocatoin);
    } else if (t == "CWT70" || t == "KKSSTATUS") {
        $("#lblInputPassTitle").html("状态查询");
    } else if (t == "CWT71") {
        $("#lblInputPassTitle").html("版本查询");
    } else if (t == "KKSRESET") {
        $("#lblInputPassTitle").html("远程重启");
    }

    if (t == "CheckLocation" || t == "Q001" || t == "PHOTO") {
        $("#txtInputpassword").val("000000");
        document.getElementById("txtInputpassword").disabled = true;
    } else {
        $("#txtInputpassword").val("");
        document.getElementById("txtInputpassword").disabled = false;
    }
    $("#spanPassDeviceName").html(name);
    showDiv('divInputPass');
}

function showSOSPassword(id, t, name, sn, model) {
    $("#txtSOSPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSOSDeviceName").html(name);
    showDiv('divSOSPhone');
    getPhones(id, 0);
}

function showCellPhone(id, t, name, sn, model) {
    $("#txtCellPhone1").val("");
    $("#txtCellPhone2").val("");
    $("#txtCellPhone3").val("");
    $("#txtCellPhone4").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanCellPhoneDeviceName").html(name);
    showDiv('divCellPhone');
    getPhones(id, 1);
}

function showD2SMS(id, t, name, sn, model) {
    $("#txtDevice2SMSUserPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanD2SMSDeviceName").html(name);
    showDiv('divSetDevice2SMS');
}


function showDeviceInterval(id, t, name, sn, model) {
    $("#txtSetInterval").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanIntervalDeviceName").html(name);
    showDiv('divInterval');
}

function showSendTxt(id, t, name, sn, model) {
    $("#txtSendTxtContent").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSendTxtDeviceName").html(name);
    showDiv('divSendTxt');
}

function getPhones(deviceid, t) {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAdditionalAjax.asmx/GetPhoneByDeviceID",
        contentType: "application/json",
        data: "{DeviceID:" + deviceid + ",TypeID:" + t + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            if (t == 0) {
                $("#txtSOSPhone").val(result.d);
            } else if (t == 1) {
                var arr = result.d.split(',');
                $("#txtCellPhone1").val(arr[0]);
                $("#txtCellPhone2").val(arr[1]);
                $("#txtCellPhone3").val(arr[2]);
                $("#txtCellPhone4").val(arr[3]);
            }

        }
    });
}


//验证密码
function sendCmdInfo() {
    //不用验证密码
    var loginUserID = $("#hidUserID").val();
    if (commandType == "CheckLocation" || commandType == "Q001" || commandType == "PHOTO") {
        $("#spanSendMsg").html(mapPage.sendMsg1);
        sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
    } else {
        var pass = $("#txtInputpassword").val();
        if (pass == "") {
            alert(mapPage.passNull);
        } else {
            $("#spanSendMsg").html(mapPage.sendMsg1);
            $.ajax({
                type: "post",
                url: "Ajax/UsersAjax.asmx/ValidPassword",
                contentType: "application/json",
                data: "{UserID:" + loginUserID + ",Pass:'" + pass + "'}",
                dataType: "json",
                error: function (res) {
                    //alert(res.responseText);
                },
                success: function (result) {
                    var res = parseInt(result.d);
                    if (res == 1) {
                        var isMDDevices = '';
                        //判断是否明达设备
                        isMDDevices = commandType.substr(0, 2);
                        if (isMDDevices == "MD") {
                            commandPort = $("#selPort").val();
                            sendCommandMD(commandDeviceSN, commandDeviceID, commandType, 0, commandModel, commandPort);
                        }
                        else {
                            sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
                        }
                    } else {
                        alert(mapPage.passError);
                        $("#spanSendMsg").html("");
                    }
                }
            });
        }
    }
}

function sendCommand(sn, deviceId, command, trueOrFalse, model) {
    //型号83是宏远协议
    if (model == 83) {
        model = 50;
    }
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommand",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}

//尚锐标准协议用
function sendCmdPhone(t) {
    var phones = "";
    if (t == 0) {
        phones = $("#txtSOSPhone").val();
    } else if (t == 1) {
        phones = $("#txtCellPhone1").val() + "," + $("#txtCellPhone2").val() + "," + $("#txtCellPhone3").val() + "," + $("#txtCellPhone4").val();
    } else if (t == 2) {
        var seconds = $("#txtSetInterval").val();
        if (seconds == "") {
            return;
        } else if (parseInt(seconds) < 5) {
            alert("间隔不能小于5秒!");
            return;
        } else if (parseInt(seconds) > 9999) {
            alert("间隔不能大于9999秒!");
            return;
        }
        commandType = $("#selSetUploadTime").val();
        phones = seconds;
    } else if (t == 3) {
        var content = $("#txtSendTxtContent").val();
        if (content == "") {
            return;
        } else {
            phones = content;
        }
    } else if (t == 5) {
        var selD2SMSType = $("#selD2SMSType").val();
        var d2smsPhone = $("#txtDevice2SMSUserPhone").val();
        phones = selD2SMSType + "" + d2smsPhone;
    }
    sendPhoneCommand(commandDeviceSN, commandDeviceID, commandType, commandModel, phones);
}


function sendPhoneCommand(sn, deviceId, command, model, phones) {

    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandByPhone",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',Model:" + model + ",Phones:'" + phones + "'}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 1);
                } else if (command == "BP05") {
                    GetResponse(result.d, 0, 2);
                    $("#spanSendMsgCellPhone").html(mapPage.sendSuccess);
                } else if (command == "BP07" || command == "S7122" || command == "S7123") {
                    $("#spanSendMsgInterval").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 3);
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 4);
                } else if (command == "D2SMS") {
                    alert("命令已经发送成功!");
                    closeDiv('divSetDevice2SMS');
                }

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html("");
                } else if (command == "BP05") {
                    $("#spanSendMsgCellPhone").html("");
                } else if (command == "BP07") {
                    $("#spanSendMsgInterval").html("");
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html("");
                } else if (command == "D2SMS") {
                    $("#spanSendMsgD2SMS").html("");
                }
            }

        }
    });
}

//明达下发
function sendCommandMD(sn, deviceId, command, trueOrFalse, model, port) {
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandMD",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + ",Port:" + port + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}


function GetResponse(id, index, t) {
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetResponse",
        contentType: "application/json",
        data: "{CommandID:" + id + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            index++;
            var str = result.d;
            if (str == "" || str == null || str == "null" || str == undefined) {
                if (index == 3) {
                    alert(mapPage.responseNull);
                    if (t == 0) {
                        $("#spanSendMsg").html("");
                        closeDiv('divInputPass');
                    } else if (t == 1) {
                        $("#spanSendMsgSOS").html("");
                        $("#txtSOSPhone").val("");
                        closeDiv('divSOSPhone');
                    } else if (t == 3) {
                        $("#spanSendMsgInterval").html("");
                        $("#txtSetInterval").val("");
                        closeDiv('divInterval');
                    } else if (t == 4) {
                        $("#spanSendMsgTxt").html("");
                        $("#txtSendTxtContent").val("");
                        closeDiv('divSendTxt');
                    } else if (t == 2) {
                        $("#spanSendMsgCellPhone").html("");
                        $("#txtCellPhone1").val("");
                        $("#txtCellPhone2").val("");
                        $("#txtCellPhone3").val("");
                        $("#txtCellPhone4").val("");
                        closeDiv('divCellPhone');
                    }
                } else {
                    setTimeout(function () {
                        GetResponse(id, index, t);
                    }, 8000);
                }
            } else {
                var cxaStr = mapPage.responseSuccess + str;
                alert(cxaStr);

                if (t == 0) {
                    $("#spanSendMsg").html("");
                    closeDiv('divInputPass');
                } else if (t == 1) {
                    $("#spanSendMsgSOS").html("");
                    $("#txtSOSPhone").val("");
                    closeDiv('divSOSPhone');
                } else if (t == 2) {
                    $("#spanSendMsgCellPhone").html("");
                    $("#txtCellPhone1").val("");
                    $("#txtCellPhone2").val("");
                    $("#txtCellPhone3").val("");
                    $("#txtCellPhone4").val("");
                    closeDiv('divCellPhone');
                } else if (t == 3) {
                    $("#spanSendMsgInterval").html("");
                    $("#txtSetInterval").val("");
                    closeDiv('divInterval');
                } else if (t == 4) {
                    $("#spanSendMsgTxt").html("");
                    $("#txtSendTxtContent").val("");
                    closeDiv('divSendTxt');
                }
            }
        }, error: function (e) {
            alert(mapPage.responseNull);

            if (t == 0) {
                $("#spanSendMsg").html("");
                closeDiv('divInputPass');
            } else if (t == 1) {
                $("#spanSendMsgSOS").html("");
                $("#txtSOSPhone").val("");
                closeDiv('divSOSPhone');
            } else if (t == 2) {
                $("#spanSendMsgCellPhone").html("");
                $("#txtCellPhone1").val("");
                $("#txtCellPhone2").val("");
                $("#txtCellPhone3").val("");
                $("#txtCellPhone4").val("");
                closeDiv('divCellPhone');
            } else if (t == 3) {
                $("#spanSendMsgInterval").html("");
                $("#txtSetInterval").val("");
                closeDiv('divInterval');
            } else if (t == 4) {
                $("#spanSendMsgTxt").html("");
                $("#txtSendTxtContent").val("");
                closeDiv('divSendTxt');
            }
        }
    });
}

function showCommandList(id, sn, pageNo) {

    showDiv('divCommandList');
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetCommandList",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + id + ",PageNo:" + pageNo + ",PageCount:" + pageCount + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                writeCommandTable(eval("(" + result.d + ")"));
            }
        }, error: function (res) {
            //alert(res.responseText);
        }
    });
}

function showDivIframe(url, id) {
    var w = $(this).width();
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "ProductUpdate.aspx") {
        $("#spanIframeTitle").html(mapPage.divicesInfo);
        $("#divIframe").css("width", "552px").css("height", "408px");
        $("#ifmPage").attr("height", "370").attr("width", "550");
        $("#divIframe").css("left", (w - 552) / 2 + "px");
        $("#ifmPage").attr("src", url + "?deviceid=" + id + "&randon=" + randomnumber);
    } else if (url == "BeidaoCheInfo.aspx") {
        $("#spanIframeTitle").html("被盗车辆信息");
        $("#divIframe").css("width", "502px").css("height", "328px");
        $("#ifmPage").attr("height", "300").attr("width", "550");
        $("#divIframe").css("left", (w - 502) / 2 + "px");
        $("#ifmPage").attr("src", url + "?userid=" + UserId + "&id=" + id + "&randon=" + randomnumber);
    } else if (url == "DownloadLocation.aspx") {
        $("#spanIframeTitle").html(mapPage.downloadLocation);
        $("#divIframe").css("width", "552px").css("height", "390px");
        $("#ifmPage").attr("height", "340").attr("width", "550");
        $("#divIframe").css("left", (w - 552) / 2 + "px");
        $("#ifmPage").attr("src", url + "?id=" + UserId + "&deviceid=" + id + "&randon=" + randomnumber);
    } else if (url == "OBDIndex.aspx") {
        $("#spanIframeTitle").html(mapPage.obdChecking);
        $("#divIframe").css("width", "752px").css("height", "420px");
        $("#ifmPage").attr("height", "370").attr("width", "750");
        $("#divIframe").css("left", (w - 752) / 2 + "px");
        var p = IDEncryption(id);
        $("#ifmPage").attr("src", url + "?id=" + UserId + "&deviceid=" + id + "&randon=" + randomnumber + "&p=" + p);
    } else if (url == "CarCommand.aspx") {
        $("#spanIframeTitle").html("指令列表");
        $("#divIframe").css("height", "410px");
        $("#ifmPage").attr("height", "360");
        $("#ifmPage").attr("src", url + "?deviceid=" + id + "&randon=" + randomnumber);
    }
    showDiv("divIframe");
}

function writeCommandTable(json) {
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="1" cellpadding="0" class="tab">');
    html.push('<tbody>');
    html.push('<tr height="25" style="background:#F5F5F5;font-weight:bold;">');
    html.push('<td align="center" width="25">' + allPage.num + '</td>');
    html.push('<td align="center" height="25" width="80">' + mapPage.cmdType + '</td>'); //指令类型
    html.push('<td align="center" width="90">' + mapPage.cmdState + '</td>'); //状态
    html.push('<td align="center">' + mapPage.responseText + '</td>'); //响应信息
    html.push('<td align="center" width="130">' + mapPage.responseTime + '</td>'); //响应时间
    html.push('<td align="center" width="130">' + mapPage.sendTime + '</td>'); //发送时间
    html.push('</tr>');
    if (json.commandArr.length == 0) {//没有查询到数据
        html.push('<td align="center" height="25" colspan="6" style="color:#ff0000;">' + allPage.noData + '</td>');
    } else {
        var nowPage = parseInt(json.nowPage);
        var start = (nowPage - 1) * pageCount + 1;
        for (var i = 0; i < json.commandArr.length; i++) {

            var commandName = json.commandArr[i].commandName;
            if (commandName == "CheckLocation" || commandName == "Q001") {
                commandName = mapPage.checkLocation;
            } else if (commandName == "HFYD" || commandName == "C001OFF" || commandName == "BP040" || commandName == "41140" || commandName == "S200") {
                commandName = mapPage.hfyd;
            } else if (commandName == "DYD" || commandName == "C001ON" || commandName == "BP030" || commandName == "41141" || commandName == "S201") {
                commandName = mapPage.dyd;
            } else if (commandName == "BP020" || commandName == "41201" || commandName == "SCF0") {
                commandName = mapPage.deviceFortify;
            } else if (commandName == "BP021" || commandName == "41200" || commandName == "SCF1") {
                commandName = mapPage.deviceDismiss;
            } else if (commandName == "BP05" || commandName == "S7102") {
                commandName = mapPage.setQinqing;
            } else if (commandName == "BP11" || commandName == "KKSSOS") {
                commandName = mapPage.setSOS;
            } else if (commandName == "BP120") {
                commandName = "监听开启";
            } else if (commandName == "BP121") {
                commandName = "监听关闭";
            } else if (commandName == "BP07") {
                commandName = "上传间隔";
            } else if (commandName == "BP13") {
                commandName = "下发文字";
            } else if (commandName == "S7101") {
                commandName = mapPage.setZhukong;
            } else if (commandName == "S7103") {
                commandName = mapPage.setPassword;
            } else if (commandName == "S7106111") {
                commandName = mapPage.setAutoFortify;
            } else if (commandName == "S7106000") {
                commandName = mapPage.setAutoFortifyClose;
            } else if (commandName == "S7107111") {
                commandName = mapPage.setCutFortifyAuto;
            } else if (commandName == "S7107000") {
                commandName = mapPage.setCutFortifyAutoClose;
            } else if (commandName == "S7108") {
                commandName = mapPage.setVIBTime;
            } else if (commandName == "S7109") {
                commandName = mapPage.setVIBLmd;
            } else if (commandName == "S7109SOS") {
                commandName = mapPage.setSOSType;
            } else if (commandName == "S7110") {
                commandName = mapPage.setWeiyiWarn;
            } else if (commandName == "S7111") {
                commandName = mapPage.setOverspeed;
            } else if (commandName == "S7112") {
                commandName = mapPage.setSMSGPRS;
            } else if (commandName == "R8") {
                commandName = mapPage.setJianting;
            } else if (commandName == "R1" || commandName == "KKSRESET") {
                commandName = mapPage.setYccq;
            } else if (commandName == "S7113") {
                commandName = mapPage.setHfcc;
            } else if (commandName == "S7114") {
                commandName = mapPage.setLanguage;
            } else if (commandName == "S7115") {
                commandName = mapPage.setTimezone;
            } else if (commandName == "S7116") {
                commandName = mapPage.setXiumian;
            } else if (commandName == "S71171") {
                commandName = mapPage.setJiantingType;
            } else if (commandName == "S71170") {
                commandName = mapPage.setDingweiType;
            } else if (commandName == "S7118" || commandName == "S7119") {
                commandName = mapPage.setParam;
            } else if (commandName == "S7120") {
                commandName = mapPage.setAutoFortifyTime;
            } else if (commandName == "S7121") {
                commandName = mapPage.setAutoDismissTime;
            } else if (commandName == "S7122") {
                commandName = mapPage.setUploadMoveTime;
            } else if (commandName == "S7123") {
                commandName = mapPage.setUploadStopTime;
            } else if (commandName == "S7124") {
                commandName = mapPage.setYcqd;
            } else if (commandName == "S7125") {
                commandName = mapPage.setYcxh;
            } else if (commandName == "S21") {
                commandName = mapPage.setGeofence;
            } else if (commandName == "S7130") {
                commandName = mapPage.setOBDUploadTime;
            } else if (commandName == "I7") {
                commandName = mapPage.setOBDCMD;
            } else if (commandName == "I8") {
                commandName = mapPage.setOBDGg;
            } else if (commandName == "S82") {
                commandName = "透传";
            } else if (commandName == "D2SMS") {
                commandName = "设备发送短信";
            } else if (commandName == "CWT70" || commandName == "KKSSTATUS") {
                commandName = "状态查询";
            } else if (commandName == "CWT71") {
                commandName = "版本查询";
            } else if (commandName == "CWT103") {
                commandName = "设置里程";
            }

            var state = "";
            var responseMsg = "";
            var responseDate = "";
            var sendDate = "";
            if (json.commandArr[i].isResponse == 1) {
                state = mapPage.deviceResponse;
                responseMsg = json.commandArr[i].responseText;
                responseDate = json.commandArr[i].responseDate;
                sendDate = json.commandArr[i].sendDate;
            } else if (json.commandArr[i].isSend == 1) {
                state = mapPage.sendSuccess2;
                sendDate = json.commandArr[i].sendDate;
            } else {
                state = mapPage.noSend;
            }

            html.push('<tr height="25" onmouseover=\'this.style.backgroundColor="#FAFAFA";\' onmouseout="this.style.backgroundColor=\'\';">');
            html.push('<td align="center">' + (start + i) + '</td>');
            html.push('<td align="center">' + commandName + '</td>');
            html.push('<td align="center">' + state + '</td>');
            html.push('<td width=\"360\" style=\"word-break:break-all;over-flow:hidden;\" >' + responseMsg + '</td>');
            html.push('<td align="center">' + responseDate + '</td>');
            html.push('<td align="center">' + sendDate + '</td>');
            html.push('</tr>');
        }
        var pageStr = "";
        var size = parseInt(json.resSize);
        var pageSize = size % pageCount == 0 ? size / pageCount : size / pageCount + 1;
        pageStr = showCheckCommand(parseInt(json.deviceID), json.sn, json.nowPage, pageSize);
        html.push('<tr><td colspan="6" bgcolor="#FFFFFF" align="center">' + pageStr + '</td></tr>');
    }
    html.push('</tbody>');
    html.push('</table>');
    $("#divCommandListTable").html(html.join(''));
}

function searchInput(t) {
    var input = $("#txtSearchInput").val();
    if (t == "f") {
        if (input == mapPage.searchInput) {
            $("#txtSearchInput").val('');
            input = "";
        }
        showSearchDevices(input);
        $("#divLeftSearchDevices").show();
    } else {
        if (input == '') {
            $("#txtSearchInput").val(mapPage.searchInput);
        }
        $("#divLeftSearchDevices").hide();
    }
}

function searchInput2() {
    var display = document.getElementById("divLeftSearchDevices");
    if (display.style.display == "block" || display.style.display == "") {
        $("#divLeftSearchDevices").hide();
    } else {
        var sTxt = $("#txtSearchInput").val();
        if (sTxt == mapPage.searchInput) {
            sTxt = "";
        }
        //showSearchDevices(sTxt);
        $("#divLeftSearchDevices").show();
    }
}

function showSearchDevices(n) {
    //    if (allDevices) {
    //        likeSearch(n, allDevices);
    //    }
}

//模糊搜索,设备名,车牌号
function likeSearch(e, $table, key, columnName, columnValue) {
    var html = [], arr = null, lockHeight = 0, state = "", $overli = null;

    e = e == null ? window.event : e;
    if (zTree.getSelectedNode() == null) {
        return;
    }
    //  前台处理模糊查询
    $overli = $("#myNavigate li.navigate_item_over");
    state = $overli.text().indexOf("在线") > -1 ? "online" :
        $overli.text().indexOf("离线") > -1 ? "offline" : "";
    columnValue = $.trim(columnValue) == "请输入车牌号/设备名/Sim卡号" ? "" : columnValue;
    if ($.trim(columnValue) != "") {
        $table.find("tbody tr").each(function (keys, value) {
            if ($(value).find(":input[name=\"" + columnName + "\"]").val().indexOf(columnValue) > -1) {
                $(value).css("display", "table-row");
                if ($.trim($table.attr("id")) == "tbMyDevice" && state != "") {
                    if ($(value).attr("status") != state) {
                        $(value).css("display", "none");
                    }
                }
            } else {
                $(value).css("display", "none");
            }
        });
    } else {
        if ($.trim($table.attr("id")) == "tbMyDevice") {
            if ($.trim(state) != "") {
                $table.find("tbody tr").each(function (keys, value) {
                    if ($.trim($(value).attr("status")) == state) {
                        $(value).css("display", "table-row");
                    } else {
                        $(value).css("display", "none");
                    }
                });
            } else {
                $table.find("tbody tr").css("display", "table-row");
            }
        } else {
            $table.find("tbody tr").css("display", "table-row");
        }
    }

    if ($.trim($table.attr("id")) == "tbRealTimeCtrl") {
        $.FixTable(
            $table.attr("id"), 0, $("#divDevicesList").width(),
            $("#divDevicesListInfo").height() - 24
        );
    } else if ($.trim($table.attr("id")) == "tbMyDevice") {
        $.FixTable($table.attr("id"), 0, $("#VehicleList").width(), $("#VehicleList").height());
    }


    //  后台处理模糊查询
    //    $.ajax({
    //        
    //    });
}

function searchTableClk(id, name, state) {
    if (state != "LoggedOff") {
        showMoreDivDevice(id, 1);
        $("#divLeftSearchDevices").hide();
        $("#txtSearchInput").val(name)
    }
}

function showDiv(id) {
    closeOpenShow();
    $("#" + id).show();
}

function closeDiv(id) {
    $("#" + id).hide();
    if (id == "divCommandList") {
        $("#divCommandListTable").html("");
    }
}

function closeOpenShow() {
    $("#divCommandList").hide();
    $("#divInputPass").hide();
    $("#divSOSPhone").hide();
    $("#divCellPhone").hide();
    $("#divInterval").hide();
    $("#divSendTxt").hide();
    $("#divSetDevice2SMS").hide();
}



function openPage(url, userid, deviceid) {
    //var maptype = ifmMap.window.document.getElementById("selMap").value;
    var p = IDEncryption(deviceid);
    var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;
    window.open(openUrl);
}


function clkInputGroup(t) {
    if (t == 0) {
        $("#divAddGroup").hide();
        $("#divInputGroup").show();
    } else if (t == 1) {
        $("#divInputGroup").hide();
        $("#divAddGroup").show();
    }
}

//给点击的用户创建分组
function saveGroup() {
    var inputGroupName = $("#txtGroupName").val();
    if (inputGroupName != "") {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/AddGroup",
            contentType: "application/json",
            data: "{UserID:" + UserId + ",GroupName:'" + inputGroupName + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#txtGroupName").val("");
                    clkInputGroup(1);

                    var html = [];
                    var id = "divGroup-" + res;
                    var spanID = "spanGroup-" + res;
                    var spanNameID = "spanGroupName-" + res;
                    var divEditID = "divEditGroup-" + res;
                    var inputID = "editGroup-" + res;
                    var divMainID = "divMainGroup-" + res;
                    html.push('<div id="' + divMainID + '" style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">');
                    html.push('<div style="float:left;width:140px;">&nbsp;<img src="Images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                    html.push('<span id="' + spanNameID + '">' + inputGroupName + '</span><input id="' + inputID + '" onblur="saveGroupName(' + res + ');" style="width:80px;display:none;" />');
                    html.push('(<span id="' + spanID + '">0</span>)</div>');
                    html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + res + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + res + ',\'' + inputGroupName + '\');">' + allPage.deletes + '</a></div>');
                    html.push('</div>');
                    html.push('<div id="' + id + '" style="clear:left;">');
                    html.push("</div>");

                    allGroupsDivIDs.push(id);
                    $("#divDevicesTable").append(html.join(''));
                    addGroupMouse(divMainID, divEditID);
                    var str = "{id:" + res + ",name:'" + inputGroupName + "'}";
                    allGroups.push(eval("(" + str + ")"));
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//获取用户的设备分组
function getGroup() {
    var html = [], divMainIDs = [], divEditIDs = [];
    html.push('<div style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">&nbsp;<img src="Images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + "divGroup-0" + '\');" />&nbsp;' + mapPage.defaultGroup + '(<span id="spanGroup-0">0</span>)');
    html.push('</div>');
    html.push('<div id="divGroup-0">');
    html.push("</div>");
    allGroupsDivIDs.push("divGroup-0");

    $.ajax({
        type: "post",
        //        url: "Ajax/UserTreeAjax.aspx?action=getDeviceInfoByComId",
        url: "../Ajax/UserTreeAjax.aspx?action=getDeviceInfoByComId",
        contentType: "application/json",
        data: "{UserID:" + UserId + "}",
        dataType: "json",
        success: function (result) {
            alert(result);
            if (result.d != "") {
                var json = eval("(" + result.d + ")");
                allGroups = json.arr;
                for (var i = 0; i < allGroups.length; i++) {
                    var id = "divGroup-" + allGroups[i].id;
                    var spanID = "spanGroup-" + allGroups[i].id;
                    var spanNameID = "spanGroupName-" + allGroups[i].id;
                    var divEditID = "divEditGroup-" + allGroups[i].id;
                    var inputID = "editGroup-" + allGroups[i].id;
                    var divMainID = "divMainGroup-" + allGroups[i].id;
                    html.push('<div id="' + divMainID + '" style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">'); //
                    html.push('<div style="float:left;width:140px;">&nbsp;<img src="Images/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                    html.push('<span id="' + spanNameID + '">' + allGroups[i].name + '</span><input id="' + inputID + '" onblur="saveGroupName(' + allGroups[i].id + ');" style="width:80px;display:none;" />');
                    html.push('(<span id="' + spanID + '">0</span>)</div>');
                    html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + allGroups[i].id + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + allGroups[i].id + ',\'' + allGroups[i].name + '\');">' + allPage.deletes + '</a></div>');
                    html.push('</div>');
                    html.push('<div id="' + id + '" style="clear:left;">');
                    html.push("</div>");

                    divMainIDs.push(divMainID);
                    divEditIDs.push(divEditID);
                    allGroupsDivIDs.push(id);
                }
            }
            //showGroupMenuItems();
            $("#divDevicesTable").html(html.join(''));
            for (var i = 0; i < divMainIDs.length; i++) {
                var divMainID = divMainIDs[i];
                var divEditID = divEditIDs[i];
                addGroupMouse(divMainID, divEditID);
            }
            initGetDevices();
        }, error: function (res) {
            //            alert(res.responseText);
            $("#divDevicesTable").html(html.join(''));
            //showGroupMenuItems();
            initGetDevices();
        }
    });
}

function addGroupMouse(divMainID, divEditID) {
    $("#" + divMainID).mouseover(function () {
        if (!groupInput) {
            $("#" + divEditID).show();
        }
    }).mouseleave(function () {
        if (!groupInput) {
            $("#" + divEditID).hide();
        }
    });

}

function showGroupMenuItems() {
    $("#divLeftMenuGroup").html("");
    var grouphtml = [];
    grouphtml.push('<div style="margin-top:5px;">');
    grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + "-1" + ');">' + mapPage.defaultGroup + '</a></div>');
    for (var i = 0; i < allGroups.length; i++) {
        grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + allGroups[i].id + ');">' + allGroups[i].name + '</a></div>');
    }
    grouphtml.push('</div>');
    $("#divLeftMenuGroup").html(grouphtml.join(''));
}

function clearGroupDivTxt() {
    $("#divGroup-0").html("");
    $("#spanGroup-0").html("0");
    for (var i = 0; i < allGroups.length; i++) {
        $("#divGroup-" + allGroups[i].id).html("");
        $("#spanGroup-" + allGroups[i].id).html("0");
    }
}
var groupInput = false;
function editGroupName(id) {
    groupInput = true;
    $("#spanGroupName-" + id).hide();
    $("#editGroup-" + id).val($("#spanGroupName-" + id).html()).show();
    document.getElementById("editGroup-" + id).focus();
    $("#divEditGroup-" + id).hide();
}

function saveGroupName(id) {
    groupInput = false;
    var oldStr = $("#spanGroupName-" + id).html();
    var newStr = $("#editGroup-" + id).val();
    if (oldStr != newStr) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/UpdateGroupName",
            contentType: "application/json",
            data: "{GroupID:" + id + ",GroupName:'" + newStr + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#spanGroupName-" + id).html(newStr);
                    for (var i = 0; i < allGroups.length; i++) {
                        if (allGroups[i].id == id) {
                            allGroups[i].name = newStr;
                            break;
                        }
                    }
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
    $("#editGroup-" + id).hide();
    $("#spanGroupName-" + id).show();
}

//编辑name状态下,禁用
function showGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).show();
    }
}

function closeGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).hide();
    }
}


function displyGroupDiv(t, id) {
    var display = document.getElementById(id).style.display;
    if (display == "block" || display == "") {
        t.src = "Images/g_c.gif";
        document.getElementById(id).style.display = "none";
    } else {
        t.src = "Images/g_o.gif";
        document.getElementById(id).style.display = "block";
    }
}
function showMoveGroup(deviceID) {
    //if (intervalGroupItem) clearInterval(intervalGroupItem);
    //$("#divLeftMenuGroup").css({ "marginTop": mousetop - 5, "marginLeft": mouseleft + 20 }).show();
    $("#divLeftMenuGroup").show();
}

function hideMoveGroup() {
    $("#divLeftMenuGroup").hide();
}

function moveGroup(groupID) {
    if (clkGroupItemDeviceID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/DevicesAjax.asmx/UpdateDeviceGroupID",
            contentType: "application/json",
            data: "{DeviceID:" + clkGroupItemDeviceID + ",GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    ajaxGetDevices();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

function comfirmDelGroup(groupID, groupName) {
    var name = groupName;
    for (var i = 0; i < allGroups.length; i++) {
        if (allGroups[i].id == groupID) {
            name = allGroups[i].name;
            break;
        }
    }
    return confirm(cusPage.delUserConfirm + name + mapPage.delGroupConfirm) ? delGroup(groupID) : void (0);
}

function delGroup(groupID) {
    if (groupID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/DelGroup",
            contentType: "application/json",
            data: "{GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    initUserDevices();
                    getGroup();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//隐藏左边栏
function showHideLeft() {
    var display = $("#divLeft").css("display");
    var leftWidth = 265;
    var mWidth = 260;
    if (display == "block") {
        mWidth = 0;
        $("#divMenuLeftImg").css("left", 0 + "px");
        //$("#imgProductSearch").hide();
        $("#divLeftSearchDevices").hide();
        $("#divLeft").hide();
    } else {
        $("#divMenuLeftImg").css("left", 260 + "px");
        $("#divLeft").show();
    }
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "11px" || p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
    var w = $(this).width() - 12;
    var mapWidth = w - mWidth;
    $("#ifmMap").css("width", mapWidth + "px");
}

function overMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "33px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "44px");
    } else if (p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "11px");
    }
}

function outMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "44px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else if (p == "11px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
}



//判断长度,一个中文为2
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


function strIsSChinese(strTemp) {
    var isCn = false;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {

        }
        else {
            isCn = true;
        }
    }
    return isCn;
}

//  table表格鼠标特效，移入移出，选择
function toggleTbSlt($table) {

}

//  显示隐藏公司树窗口
function toggleCustTree(e, $source, $toggle) {
    var $adult = null, $tr = null;

    e = e || window.event;
    if ($toggle.css("display") == "none") {
        $toggle.show();
        $source.css("background", "url(/GPS/icon/icons.gif) no-repeat 0px 0px");
    } else {
        $toggle.hide();
        $source.css("background", "url(/GPS/icon/icons.gif) no-repeat 0px -30px");
    }
    $(window).resize();

    e.stopPropagation();
}
