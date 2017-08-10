var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var forTimer = 10000;
var forTimeSecond = null;
var language = "zh-cn";
var iconType = "1";
var points = [];
var isShowPoly = false;
var map = null;

$(document).ready(function () {

    //    alert($("#hdVehicleStr").val());
    var title = "Tracking:";

    $("#selMap").val($.trim($("#hidSelMap").val()));
    language = $("#hidLanguage").val();
    DeviceName = $("#hidDeviceName").val();
    iconType = parseInt($("#hidIcon").val());
    syncSize();
    initmap();

    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();

    ajaxGetTracking();
    //    document.title = "实时跟踪:" + DeviceName;
    //    $.trim($("#selMap").val()) == "Baidu" ? ajaxGetTracking() : null;
    //    $("title").text("实时跟踪");
});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 0;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    $("#map_canvas").css("width", w + "px");
}

var isFortime = false;
function forTimeMethod() {

    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        ajaxGetTracking();
        secondIndex = 0;
    }

}


function ajaxGetTracking() {
    var geocoder = null;

    $.ajax({
        type: "post",
        //        url: "/Ajax/DevicesAjax.asmx/GtTracking",
        url: "/Ajax/DevicesAjax.ashx",
        //        contentType: "application/json",
        //        data: "{DeviceID:" + DeviceID + ",TimeZone:'" + TimeZone + "'}",
        data: { "DeviceID": DeviceID, "TimeZone": TimeZone, mapType: $.trim($("#selMap").val()) },
        //        dataType: "json",
        success: function (result) {
            var gpsPoint = null, point, bounds = null;
            //            alert(result);
            //            if (result.d != "" && result.d != "{}") {
            //                var json = eval("(" + result.d + ")");
            //                showMarker(json);
            //            }

//            alert(result);
            if (result != "" && result != "{}") {
                var json = eval("(" + result + ")");
                json = $.modifyGPSData(json);
                if (json.Velocity < 1) {
                    json.speed = json.Velocity = 0;
                }
                //                alert(json.baiduLng + "|" + json.baiduLat);

                if (json.baiduLng * 1000000 < 72000000 || json.baiduLng * 1000000 > 136000000 ||
                    json.baiduLat * 1000000 < 3000000 || json.baiduLat * 1000000 > 54000000) {
                    return;
                }

                DeviceName = $("#hidDeviceName").val(json.PlateNo).val();
                document.title = "实时跟踪:" + DeviceName;
                //  百度地图实时跟踪
                if ($.trim($("#selMap").val()) == "Baidu") {
                    gpsPoint = new BMap.Point(json.Longitude, json.Latitude);
                    BMap.Convertor.translate(gpsPoint, 0, function (correctPoint) {
                        if (correctPoint != null) {
                            json.baiduLng = json.Longitude = correctPoint.lng;
                            json.baiduLat = json.Latitude = correctPoint.lat;
                            points.push(new BMap.Point(correctPoint.lng, correctPoint.lat));
                        }
                        showMarker(json);
                        //                        map.setViewport(points);


                        //                        if ($.trim($("#selMap").val()) == "Baidu") {
                        //                            map.setViewport(points);
                        //                        } else {
                        //                        }
                    });
                }
                //  谷歌地图实时跟踪
                else if ($.trim($("#selMap").val()) == "Google") {
                    showMarker(json);
                }
                //  高德地图实时跟踪
                else if ($.trim($("#selMap").val()) == "Gaode") {
                    showMarker(json);
                }
                //  搜搜地图实时跟踪
                else if ($.trim($("#selMap").val()) == "soso") {
                    showMarker(json);
                }
            }
        }
    });
}

//轨迹总里程(米),上一个轨迹点的经纬度
var allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
function GetPopupHtml(lk, lat, lng) {
    var html = [], geocoder = null, latLng = null;
//    html.push("<b>" + DeviceName + "</b><br />");
    html.push("<b>" + $("#hidDeviceName").val() + "</b><br />");
    html.push(lk.deviceUtcDate + "<br />");
    var disStr = allPage.m;
    var showDistance = 0;
    if (lastDistanceLat) {
        var distance = parseFloat(GetDistance(lastDistanceLat, lastDistanceLng, lat, lng)); //单位米
        allDistance += distance;
        if (allDistance < 1000) {
            disStr = allPage.m;
            showDistance = allDistance;
        } else {
            showDistance = (allDistance / 1000);
            disStr = allPage.km;
        }
        showDistance = showDistance.toFixed(2);
    }
    html.push(allPage.distance2 + ":" + parseFloat(showDistance).toFixed(2) + disStr + "<br />");
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    var courseName = GetCoureName(lk.course);
    html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + lk.speed.toFixed(2) + allPage.speedKM);
//    html.push('<br />&nbsp;&nbsp;');
    html.push('<br />');
    //    if ($.trim($("#selMap").val()) == "Google") {
//        geocoder = new google.maps.Geocoder();
//        latLng = new google.maps.LatLng(lat, lng);
//        geocoder.geocode({ "latLng": latLng }, function (results, status) {
//            if (status == google.maps.GeocoderStatus.OK) {
//                if (results[0]) {
//                    lk.Location = results[0].formatted_address.split(" ")[0];
//                    html.push("地址:" + lk.Location);
//                }
//            } else {
//                alert("Geocoder failed due to: " + status);
//            }
//        });
//    }
    html.push("地址:" + lk.Location);
    lastDistanceLat = lat;
    lastDistanceLng = lng;
    return html.join('');
}

function initmap() {
    //  初始化百度地图
    if ($.trim($("#selMap").val()) == "Baidu") {
        initBaiduMap(0, 0, 8);
    }
    //  初始化谷歌地图
    else if ($.trim($("#selMap").val()) == "Google") {
        initGoogleMap(0, 0, 8);
    }
    //  初始化高德地图
    else if ($.trim($("#selMap").val()) == "Gaode") {
        initGaodeMap(0, 0, 8);
    }
    //  初始化搜搜地图
    else if ($.trim($("#selMap").val()) == "soso") {
        initSOSOMap(0, 0, 8);
    }
}

function changeMap() {
    var m = $('#selMap').val();

    var url = ""

    if (parent != null && parent.removeShowMoreDivDevice != null) {
        parent.removeShowMoreDivDevice();
    } else {
        //        removeShowMoreDivDevice();
    }
    //    parent.removeShowMoreDivDevice();

    url = location.href.indexOf("?") > -1 ? 
        location.href.substring(0, location.href.lastIndexOf("?")) + "?MapType=" + m :
        location.href + "?MapType=" + m;
    if ($("#hidDeviceID").length > 0) {
        url += "&deviceid=" + $.trim($("#hidDeviceID").val());
    }
    location.href = url;
}