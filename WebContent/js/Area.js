(function ($) {
    var loadCity = true,
        drawingManager = null,
        currRacts = [],
        AddNewsBounds = null,
        isRect = false;

    $.setLoadCity = function (result) {
        if (!/boolean/.test(typeof result)) {
            return;
        }

        loadCity = result;
    };
    $.getLoadCity = function () {
        return loadCity;
    };
    $.getDrawingManager = function () {
        var styleOptions = {
            strokeColor: "#a0b1c5",    //边线颜色。
            fillColor: "silver",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };

        drawingManager = drawingManager == null ? new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                scale: 0.8, //工具栏缩放比例
                drawingModes: [BMAP_DRAWING_RECTANGLE]
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        }) : drawingManager;
        return drawingManager;
    };
    $.addCurrRacts = function (overlay) {
        //        currRact = overlay;
        currRacts.push(overlay);
    };
    $.getCurrRacts = function (overlay) {
        return currRacts;
    };
    $.getAddNewsBounds = function () {
        return AddNewsBounds;
    };
    $.setAddNewsBounds = function (bounds) {
        AddNewsBounds = bounds;
    };
    $.setIsRect = function (rectResult) {
        if (!/boolean/.test(typeof rectResult)) {
            return;
        }

        isRect = rectResult;
    };
    $.getIsRect = function () {
        return isRect;
    };
})(jQuery);

$(document).ready(function () {
    var localCity = new BMap.LocalCity({
        renderOptions: {
            map: map,
            autoViewport: true
        }
    }),
        styleOptions = {
            strokeColor: "red",    //边线颜色。
            fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };

    initBaiduMap2(0, 0, 0);
    $("#map_canvas").css({
        "width": ($(window).width() - 50) + "px",
        "height": ($(window).height() - 55) + "px",
        "margin-left": "25px"
    });
    localCity.get(function (cityResult) {
        map.centerAndZoom(cityResult.name);
    });
    loadProvince();
    //    drawingManager.open();
    $("#rectSearchPanel").css({
        top: "50px",
        left: ($(window).width() - $("#btnRectSearch").outerWidth(true) - 150) + "px"
    });
    map.addEventListener("click", showInfo);
    //    alert($("#hfProvince").val());
});
function confim() {

    var flg = check();
    if (flg != true) {
        return;
    }
    var blng = $("#lng").val();
    var blat = $("#lat").val();
    var adname = $("#adname").val();
    var adpath = $("#hid_attach_filepath").val()
    var city = $("#sltCity").find("option:selected").text();
    
    $.ajax({
        url: "AddNews.aspx",
        type: "POST",
        dataType: "json",
        data: { blng: blng, blat: blat, adname: adname, adpath: adpath,city:city, queryType: "提交广告" },
        success: function (data) {
            
            if (data == "1") {
                alert("提交成功");
                $("#HistoryTbPanel").hide();
            } 
        }
    })
}

function check() {
    var flg = true;
    if ($("#lng").val() == "") {
    alert("纬度不能为空");
        flg = false;
        return;
    }
    if ($("#lat").val() == "") {
        alert("经度不能为空");
        flg = false;
        return;
    }
    if ($("#adname").val() == "") {
        alert("文件名不能为空");
        flg = false;
        return;
    }
    if ($("#sltCity").find("option:selected").text() == "请选择") {
        alert("请选择当前城市");
        flg = false;
        return;    
    }
    if ($("#hid_attach_filepath").val() == "" || $("#hid_attach_filepath").val() == undefined) {
        alert("请上传附件");
        flg = false;
        return;
    }
    return flg;
}
function showInfo(e) {
    
    $("#lat").val(e.point.lat)
    $("#lng").val(e.point.lng)
    $("#upload").remove();
    $("#adname").val("")
    $("#HistoryTbPanel").show();
}
function loadProvince() {
    var provinces = JSON.parse($("#hfProvince").val()), 
        $province = $("#sltProvince"),
        localCity = new BMap.LocalCity({
            map: map
        }), 
        geocoder = new BMap.Geocoder();
    if (provinces != null) {
        for (var i = 0; i < provinces.length; i++) {
            if ($province.find("option[value=\"" + provinces[i].ID + "\"]").length == 0) {
                $province.append(
                    "<option value=\"" + provinces[i].PID + "\">" + provinces[i].Name + "</option>"
                );
            }
        }
    }

    localCity.get(function (result) {
        geocoder.getLocation(new BMap.Point(result.center.lng, result.center.lat), function (geoResult) {
            var currProvince = geoResult.addressComponents.province,
                provinceId = "",
                $provinceOpt = $province.find("option");

            for (var i = 0; i < $provinceOpt.length; i++) {
                if (currProvince.indexOf($.trim($provinceOpt.eq(i).text())) >= 0 || $provinceOpt.eq(i).text().indexOf($.trim(currProvince)) >= 0) {
                    $province.find("option[selected=\"selected\"]").attr("selected", false);
                    $provinceOpt.eq(i).attr("selected", "selected");
                    provinceId = $provinceOpt.eq(i).val();
                    provinceName = $provinceOpt.eq(i).text();
                    break;
                }
            }

            changeProvince(provinceId);
        });
    });
}

function changeProvince(provinceId) {
    var $city = $("#sltCity"),
        localCity = new BMap.LocalCity({
            map: map
        });

    $city.find("option:not(:first)").remove();
    $("#txtPlaceName").val();
    $.ajax({
        url: "AddNews.aspx",
        type: "POST",
        dataType: "json",
        data: { provinceId: provinceId, queryType: "更换省" },
        success: function (data) {
            if (data == null || !/object/.test(typeof data)) {
                return;
            }

            if (data.length != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $city.append(
                        "<option value=\"" + data[i].CID + "\">" + data[i].Name + "</option>"
                    );
                }

//                if ($.getLoadCity()) {
//                    $.setLoadCity(false);

                    localCity.get(function (cityResult) {
                        var currCity = cityResult.name,
                        cityId = "",
                        $cityOpt = $city.find("option");

                        for (var i = 0; i < $cityOpt.length; i++) {
                            if (currCity.indexOf($.trim($cityOpt.eq(i).text())) >= 0 || $cityOpt.eq(i).text().indexOf($.trim(currCity)) >= 0) {
                                $city.find("option[selected=\"selected\"]").attr("selected", false);
                                $cityOpt.eq(i).attr("selected", "selected");
                                cityId = $cityOpt.eq(i).val();
                                break;
                            }
                        }
                        $.setLoadCity(true);
                        //                        changeCity(provinceId, cityId);
//                        alert($city.val());
                        if ($.trim($city.val()) == "") {
                            $("#txtPlaceName").attr("disabled", "disabled");
                        } else {
                            $("#txtPlaceName").attr("disabled", false);
                        }
                        changePosition();
                    });
//                }
            }
        }
    });
}

function changeCity(provinceId, cityId) {
    var $district = $("#sltDistrict"),
        localCity = new BMap.LocalCity({
            map: map
        });

        $.ajax({
            url: "AddNews.aspx",
            type: "POST",
            dataType: "json",
            data: { provinceId: provinceId, cityId: cityId, queryType: "更换市" },
            success: function (data) {
                if (data == null || !/object/.test(typeof data)) {
                    return;
                }

                $district.find("option:not(:first)").remove();
                if (data.length != null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $district.append(
                            "<option value=\"" + data[i].CID + "\">" + data[i].Name + "</option>"
                        );
                    }
                }

                //                changeDistrict();
                if ($.trim($("#sltCity").val()) == "") {
                    $("#txtPlaceName").attr("disabled", "disabled");
                } else {
                    $("#txtPlaceName").attr("disabled", false);
                }
                changePosition();
            }
        });
}

function changeDistrict() {
    changePosition();
}

function changePosition() {
//    var key = $.trim($("#sltProvince option:selected").text()) + $.trim($("#sltCity option:selected").text()) +
//        $.trim($("#sltDistrict option:selected").text()),
    var key = $.trim($("#sltProvince option:selected").text()) + $.trim($("#sltCity option:selected").text()) +
        $.trim($("#txtPlaceName").val()),
    localSearch = window.map != null ? new BMap.LocalSearch(map, {
        "renderOptions": {
            "map": map,
            "autoViewport": true
        },
        "onMarkersSet": function (pois) {
            for (var i = 0; i < pois.length; i++) {
                map.removeOverlay(pois[i].marker);
            }
        },
        "onSearchComplete": function (lsResult) {
        }
    }) : null;
    geocoder = new BMap.Geocoder();

    key = key.replace(/请选择/gi, "");
    if (localSearch != null) {
        localSearch.search(key);
    }
}

function setLocation() {
    var address = "";

    address += $.trim($("#sltProvince").val()) != "" ? $.trim($("#sltProvince option:selected").text()) : "";
    address += $.trim($("#sltCity").val()) != "" ? $.trim($("#sltCity option:selected").text()) : "";
    address += $.trim($("#sltDistrict").val()) != "" ? $.trim($("#sltDistrict option:selected").text()) : "";
    if ($.trim(address) == "") {
        return;
    }

//    map.centerAndZoom("辽宁省营市大石桥");
    map.centerAndZoom(address);

}

function rectArea() {
    var drawingManager = $.getDrawingManager();

    drawingManager.addEventListener("rectanglecomplete", function (overlay) {
        var gpsInfoArr = null, bounds = null;

        if (overlay.getBounds().toSpan().lng == 0 || overlay.getBounds().toSpan().lat == 0) {
            return;
        }

        if ($.getCurrRacts().length > 0) {
            for (var i = 0; i < $.getCurrRacts().length; i++) {
                map.removeOverlay($.getCurrRacts()[i]);
            }
        }
        map.addOverlay(overlay);
        $.addCurrRacts(overlay);
        $.setAddNewsBounds(overlay.getBounds());
    });
    drawingManager.open();
    drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
}

function searchArea() {
    var bounds = null,
        drawingManager = $.getDrawingManager(), 
        startTime = null, endTime = null;

    startTime = $.trim($("#txtBdate").val());
    endTime = $.trim($("#txtEdate").val());
    startTime = $.StringToDate("yyyy-MM-dd HH:mm:ss", startTime);
    endTime = $.StringToDate("yyyy-MM-dd HH:mm:ss", endTime);

    if (startTime.getTime() > endTime.getTime()) {
        if (startTime.getTime() + (1000 * 60 * 60 * 24) > (new Date()).getTime()) {
            startTime = new Date(endTime.getTime() - (1000 * 60 * 60 * 24));
            $("#txtBdate").val($.DateToString("yyyy-MM-dd HH:mm", startTime));
        } else {
            endTime = new Date(startTime.getTime() + (1000 * 60 * 60 * 24));
            $("#txtEdate").val($.DateToString("yyyy-MM-dd HH:mm", endTime));
        }
    } else {
        startTime.setDate(startTime.getDate() + 1);
        if (startTime.getTime() < endTime.getTime()) {
            $("#txtEdate").val($.DateToString("yyyy-MM-dd HH:mm", startTime));
        }
    }
    bounds = $.getAddNewsBounds();


    $.ajax({
        url: "AddNews.aspx",
        type: "POST",
        data: {
            blng: bounds._swLng, blat: bounds._swLat, elng: bounds._neLng, elat: bounds._neLat,
            bdate: $("#txtBdate").val(), edate: $("#txtEdate").val(), queryType: "拉框查车历史数据",
            datedata: new Date().toString()
        },
        success: function (data) {
            var $history = $("#tbHistoryCtrl"),
                    sessionUser = null, isRight = false, comIds = [];

            //                data = /object/.test(typeof data) ? data : /string/.test(typeof data) ? JSON.parse(data) : null;
            data = $.responseData(data);
            if (data == null) {
                return;
            }

            sessionUser = data.SessionUser;
            data = data.Vehicle;
            $history.find("tbody tr").remove();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $history.find("tbody").append(
                            "<tr style=\"background: #F5F5F5; font-family: 微软雅黑;\">" +
                                "<td style=\"text-align: center; padding: 0px;\">" +
                                    data[i].plateno +
                                "</td>" +
                                "<td style=\"text-align: center; padding: 0px;\">" +
                                    "<a href=\"Playback.aspx?deviceid=" + data[i].imei + "&bdate=" + $.trim($("#txtBdate").val()) + "&edate=" + $.trim($("#txtEdate").val()) + "&source=拉框查询历史车辆播放轨迹\" target=\"_blank\">轨迹回放</a>" +
                                "</td>" +
                            "</tr>"
                        )
                }

            }

            $("#HistoryTbPanel").css({
                "top": (($(window).height() - 500) / 2) + "px",
                "left": (($(window).width() - 200) / 2) + "px",
                "display": "block"
            });
            if ($("#HistoryTbPanel").offset().top < 0) {
                $("#HistoryTbPanel").css("top", 0 + "px");
            }

            $.FixTable("tbHistoryCtrl", 0, $("#HistoryTbPanel").width(), $("#HistoryTbPanel").height() - 26);
        }
    });

    $.getDrawingManager().close();
}
