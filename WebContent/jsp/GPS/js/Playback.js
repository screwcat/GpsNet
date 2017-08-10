var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var isShowLBS = 0; //是否显示LBS数据,0只显示GPS,1显示GPS+LBS
var speedLimit = 0;
var isShowEvent = true;
var lastStartOverspeedTime = null, lastEndOverspeedTime = null;  //上一条超速开始时间,最后超速时间
var minLatLng;
var maxLatLng;
var isstop;
var stopTime;
var StartTime = "";
var EndTime = "";
var plateNo = "";

(function ($, win) {
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

    var title = "Playback:";
    DeviceName = $("#hidDeviceName").val();
    document.title = title + DeviceName;
    speedLimit = parseFloat($("#hidSpeedLimit").val());
    initLanguage();
    syncSize();
    initSlider();
    initmap();
    if (isShowEvent) {
        showEventListDiv(1);
    }
    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();
    plateNo = $("#hidPlateNo").val();
    $("#PlaySpeed").slider("option", "value", 300);

    $("#divEventListInfo").html(GetEventTable());
    $("title").html("轨迹回放");

    //  区域查车历史记录自动播放脚本
    if ($.trim($("#hidRequestSource").val()) == "拉框查询历史车辆播放轨迹") {
        $("#sltDate").val("6");
        $("#ShowDate1").css("visibility", "visible");
        $("#txtStartDate").val($.trim($("#hidBdate").val()));
        $("#txtEndDate").val($.trim($("#hidEdate").val()));
        $("#PlaySpeed").slider("option", "value", 300);
        querytype = 6;
        serchLocation();
    }
    //testLine();
});

function GetEventTable() {
    var eventListHtml = [];
    eventListHtml.push('<table id="tblEvent" width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
    eventListHtml.push('<thead>');
    eventListHtml.push('<tr height="25" style="background:#F5F5F5;">');
    eventListHtml.push('<th width="40"></th>');
    eventListHtml.push('<th>' + allPage.startTime + '</th>');
    eventListHtml.push('<th>' + allPage.endTime + '</th>');
    eventListHtml.push('<th>' + overSpeedPage.continueTime + '</th>');
    eventListHtml.push('</tr></thead>');
    eventListHtml.push('</table>');
    return eventListHtml.join('');
}

function initLanguage() {
    $("#btnPlay").val(playbackPage.play);
    $("#btnPause").val(playbackPage.next);
    $("#btnNext").val(playbackPage.pause);
}

function checkShowLBS(c) {
    if (c) {
        isShowLBS = 1;
    } else {
        isShowLBS = 0;
    }
}

function initSlider() {
    $("#PlaySpeed").slider({
        min: 30,
        max: 1000,
        value: 300,
        step: 10,
        animate: true,
        change: function (event, ui) {
            forTimer = ui.value;
            var isPlay = document.getElementById("btnNext").disabled;
            //var isPlay = $("#btnNext").attr(" ");  //这里获取的是字符串,""或underfind
            if (!isPlay) {
                if (forTime) {
                    clearInterval(forTime);
                    showHistoryMap();
                    forTime = setInterval(showHistoryMap, forTimer);
                }
            }
        }
    });
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 30;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    $("#map_canvas").css("width", w + "px");

    var w2 = w - 375;
    $("#divEventList").css("left", w2 + "px");
    var h3 = $(this).height() - 30;
    $("#divEventList").css("top", h3 + "px");
}

function showEventListDiv(t) {
    if (t == 0) {
        $("#divEventListInfo").css("display", "none");
        $("#divEventList").css("height", "25px");
        var h = $(this).height() - 30;
        $("#divEventList").animate({ top: h + "px" }, 300);
    } else {
        $("#divEventListInfo").css("display", "block");
        $("#divEventList").css("height", "450px");
        var h = $(this).height() - 450;
        $("#divEventList").animate({ top: (h) + "px" }, 300);


    }
}

var forTimer = 30;
var querytype = null;
var queryStartDate = null;
var queryEndDate = null;
var isSerachFirst = true;
var index = 0;
var forTime = null;
var isSetZoom = true;
var isFirstShowHistory = true;
var lastMarker = null;
var allLocation = new Array();
var iconType = "22";
var SpeedFilter = null;

var lastAllLocationLength = -1;
var lastLocationID = -1;
var allMarker = [];
var allPolyline = [];
var sdate = "";
var edate = "";
//function serchLocation() {

//    var queryTimetype = $("#sltDate").val();
//    var startDate = $("#txtStartDate").val();
//    var endDate = $("#txtEndDate").val();

//    var diff = DateDiff(startDate, endDate);
//    if (diff <= 0) {
//        alert(playbackpage.timemsg);
//        return false;
//    } else {
//        if (DeviceID > 0) {


//            deleteOverLays(allPolyline);
//            deleteOverLays(allMarker);
//            lastLocationID = -1;
//            querytype = queryTimetype;
//            queryStartDate = startDate;
//            queryEndDate = endDate;
//            isSerachFirst = true;
//            //isSetZoom = true;
//            isFirstShowHistory = true;
//            lastMarker = null;
//            iconType = parseInt($("#hidIcon").val());
//            //过滤速度
//            SpeedFilter = $("#SpeedFilter").val();
//            index = 0;
//            if (forTime) {
//                clearInterval(forTime);
//            }
//            forTime = null;
//            lastStartOverspeedTime = null;
//            lastEndOverspeedTime = null;
//            allLocation = [];
//            lastAllLocationLength = -1;
//            allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
//            $("#divEventListInfo").html(GetEventTable());
//            WebGetHistory();
//        }
//    }
//}
function GetDateT() {
    var d, s;
    d = new Date();
    s = d.getFullYear() + "-";             //取年份
    //    s = s + (d.getMonth() + 1) + "-"; //取月份
    var month = (d.getMonth() + 1).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    s += month + '-';
    s += d.getDate() + " ";         //取日期
    s += d.getHours() + ":";       //取小时
    s += d.getMinutes() + ":";    //取分
    s += d.getSeconds();         //取秒

    return (s);

} 
function serchLocation() {

    var queryTimetype = $("#sltDate").val();
    var startDate = $("#txtStartDate").val();
    var endDate = $("#txtEndDate").val();
    myDate = GetDateT();
    var diff = DateDiff(startDate, endDate);
    if (DeviceID > 0 && queryTimetype == 6) {
        if (startDate.lenght == 0 || endDate.length == 0) {
            alert('请输入正确的查询日期');
            return;
        } else if (endDate.replace(/[^\d]/g, "") > myDate.replace(/[^\d]/g, "")) {
        alert('结束日期不能大于当前日期');
        }
        else if (diff<=0) {
            alert('开始日期不能大于结束日期');
            return;
        } 
         else if (startDate.substring(0, 4) < 2015) {
            //            alert(((myDate.toLocaleString().replace(/年|月/g, '-')).replace(/年|月|日|上午/g, '')).replace(/[^\d]/g, ""));
            alert('暂不支持查询2015年以前的数据');
            return;
        }
        else if (endDate.replace(/[^\d]/g, "") - startDate.replace(/[^\d]/g, "") > "10000") {
            alert('加载失败，请选择1天以内的时间范围！');
            return;
        }
         
        else {
            deleteOverLays(allPolyline);
            deleteOverLays(allMarker);
            lastLocationID = -1;
            querytype = queryTimetype;
            queryStartDate = startDate;
            queryEndDate = endDate;
            isSerachFirst = true;
            //isSetZoom = true;
            isFirstShowHistory = true;
            lastMarker = null;
            iconType = parseInt($("#hidIcon").val());
            //过滤速度
            SpeedFilter = $("#SpeedFilter").val();
            index = 0;
            if (forTime) {
                clearInterval(forTime);
            }
            forTime = null;
            lastStartOverspeedTime = null;
            lastEndOverspeedTime = null;
            allLocation = [];
            lastAllLocationLength = -1;
            allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
            $("#divEventListInfo").html(GetEventTable());
            WebGetHistory();
        }

    }
    else if(DeviceID>0&&queryTimetype==1||queryTimetype==2||queryTimetype==3||queryTimetype==4){
        deleteOverLays(allPolyline);
        deleteOverLays(allMarker);
        lastLocationID = -1;
        querytype = queryTimetype;
        queryStartDate = startDate;
        queryEndDate = endDate;
        isSerachFirst = true;
        //isSetZoom = true;
        isFirstShowHistory = true;
        lastMarker = null;
        iconType = parseInt($("#hidIcon").val());
        //过滤速度
        SpeedFilter = $("#SpeedFilter").val();
        index = 0;
        if (forTime) {
            clearInterval(forTime);
        }
        forTime = null;
        lastStartOverspeedTime = null;
        lastEndOverspeedTime = null;
        allLocation = [];
        lastAllLocationLength = -1;
        allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
        $("#divEventListInfo").html(GetEventTable());
        WebGetHistory();
    }
}



function WebGetHistory() {
    var lastDevice = null;
    if (allLocation.length > 0) {
        lastDevice = allLocation[allLocation.length - 1];
    }
    allLocation.length = 0;
    index = 0;
    document.getElementById("btnPause").disabled = true;
    document.getElementById("btnNext").disabled = true;
    //上一次搜索,最后一条记录,用于添加停止点
    if (lastDevice) {
        allLocation.push(lastDevice);
        index = 1;
    }
    //nowLoading 正在加载数据
    document.getElementById("spanMsg").innerHTML = playbackPage.nowLoading;
    var MapType = $('#selMap').val();
    //alert(MapType);
    //    CollectGarbage();

    Url = "/Ajax/GetDevicesHistory.aspx?DeviceID=" + DeviceID + "&MapType=" + MapType + "&querytype=" + querytype + "&Start=" + queryStartDate + "&End=" + queryEndDate + "&TimeZone=" + TimeZone + "&isShowLBS=" + isShowLBS + "&plateNo=" + plateNo;
    $.ajax({
        type: "post",
        url: Url,
        error: function (res) {
            alert("error");
        },
        success: function (result) {
            if (result != "") {
                if (querytype == 6) {
                    var EndTime = queryEndDate.replace(/[^\d]/g, "");

                    var StartTime = queryStartDate.replace(/[^\d]/g, "");

                    var Time = EndTime - StartTime;

                    if (Time > "10000") {
                        alert("加载失败，请选择1天以内的时间范围！");
                        alert(EndTime);
                        return;
                    } else {
                        WebGetHistoryCallBack(result);
                    }
                } else {
                    WebGetHistoryCallBack(result);
                }
            }
        }
    });
}


function WebGetHistoryCallBack(res) {
    document.getElementById("spanMsg").innerHTML = "";
    if (res != "") {
        var json = eval("(" + res + ")");

        //queryStartDate = json.lastDeviceUtcDate;

        if (querytype == 6) {
            queryStartDate = queryEndDate;
        } else {
            var myDate = new Date();
            //queryStartDate = myDate.toLocaleString();
            queryStartDate = $.DateToString("yyyy-MM-dd HH:mm:ss", myDate);


            //myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getDate() 
        }
        //alert(queryStartDate);
        //var LocationID = parseInt(json.lastLocationID);
        var LocationID = 12;
        if (LocationID == lastLocationID) {
            clearInterval(forTime);
            document.getElementById("btnPause").disabled = true;
            document.getElementById("btnNext").disabled = true;
            alert(playbackPage.playOver);
            return;
        }
        var count = 0;
        for (i = 0; i < json.length; i++) {
            
            if (json[i].Latitude == 0 && json[i].Longitude == 0)
            { } else {
                if (i < json.length - 1) {
                    if (json[i].Latitude == json[i + 1].Latitude && json[i].Longitude == json[i + 1].Longitude) {
                        isstop = 1;
                        count++;
                    }
                    else {
                        if (i > 0) {
                            if (json[i].Latitude == json[i - 1].Latitude && json[i].Longitude == json[i - 1].Longitude) {
                                isstop = 1;
                            } else {
                                isstop = 0
                            }
                            StartDate = json[i - count].SendTime.replace(/[^\d]/g, "");
                            StartTime = StartDate.substring(0, StartDate.length - 2);

                            sdate = json[i - count].SendTime;

                            EndDate = json[i - 1].SendTime.replace(/[^\d]/g, "");
                            EndTime = EndDate.substring(0, EndDate.length - 2);

                            edate = json[i - 1].SendTime;

                            //stopTime = DateDiff(sdate, edate);

                            StartTime = json[i - count].stopTimeMinute;
                            EndTime = json[i - 1].stopTimeMinute;
                            stopTime = (EndTime - StartTime) / 60;
                            stopTime = Math.round(stopTime);
                            
                        }
                        count = 0;
                    }
                    if (i > 0) {
                        if (json[i].Latitude != json[i + 1].Latitude && json[i].Longitude != json[i + 1].Longitude) {

                            allLocation.push({ baiduLat: json[i].Latitude, baiduLng: json[i].Longitude, course: json[i].Direction, deviceUtcDate: json[i].SendTime, PlateNo: json[i].PlateNo, Speed: json[i].Velocity, IsStop: isstop, stopTimeMinute: stopTime, StartTime: sdate, EndTime: edate });
                        }
                    }
                    else {
                        allLocation.push({ baiduLat: json[i].Latitude, baiduLng: json[i].Longitude, course: json[i].Direction, deviceUtcDate: json[i].SendTime, PlateNo: json[i].PlateNo, Speed: json[i].Velocity});
                    }
                }
                else {
                    allLocation.push({ baiduLat: json[i].Latitude, baiduLng: json[i].Longitude, course: json[i].Direction, deviceUtcDate: json[i].SendTime, PlateNo: json[i].PlateNo, Speed: json[i].Velocity, StartTime: StartTime, EndTime: EndTime });
                } 
            }
        }
    }

    if (allLocation.length == 0) {
        if (isSerachFirst) {
            alert(playbackPage.searchNull);
        } else {
            clearInterval(forTime);
            alert(playbackPage.playOver);
        }
    }
    isSerachFirst = false;
    if (allLocation.length > 0) {
        document.getElementById("btnPause").disabled = true;
        document.getElementById("btnNext").disabled = false;
        lastAllLocationLength = allLocation.length;
        //根据最大最小经纬度设置视野大小，缩放等级
        if ($('#selMap').val() == "Google") {
            for (var i = 0; i < allLocation.length; i++) {
                if (minLatLng == null) {
                    minLatLng = new (google.maps.LatLng)(allLocation[i].baiduLat, allLocation[i].baiduLng);
                } else {
                    if (minLatLng.k > allLocation[i].baiduLat) {
                        minLatLng.k = allLocation[i].baiduLat;
                    }
                    if (minLatLng.B > allLocation[i].baiduLng) {
                        minLatLng.B = allLocation[i].baiduLng;
                    }
                }
                if (maxLatLng == null) {
                    maxLatLng = new (google.maps.LatLng)(allLocation[i].baiduLat, allLocation[i].baiduLng);
                } else {
                    if (maxLatLng.k < allLocation[i].baiduLat) {
                        maxLatLng.k = allLocation[i].baiduLat;
                    }
                    if (maxLatLng.B < allLocation[i].baiduLng) {
                        maxLatLng.B = allLocation[i].baiduLng;
                    }
                }
            }

            var Bounds = new google.maps.LatLngBounds(minLatLng, maxLatLng);
            map.fitBounds(Bounds);
        }
        showHistoryAllMap();
    }
}

function changePlay(t) {
    if (t == 0) {
        //继续
        showHistoryMap();
        forTime = setInterval(showHistoryMap, forTimer);
        document.getElementById("btnPause").disabled = true;
        document.getElementById("btnNext").disabled = false;
    } else if (t == 1) {
        //暂停
        clearInterval(forTime);
        document.getElementById("btnPause").disabled = false;
        document.getElementById("btnNext").disabled = true;

    } else if (t == 2) {
    }
}
//比较两个时间
function DateDiff(start, end)  //返回分钟
{
    try {
        start = start.replace(/-/g, '/');
        end = end.replace(/-/g, '/');
        var a = new Date(start);
        a = a.getTime();
        var b = new Date(end);
        b = b.getTime();
        var ticksspan = b - a;
        return ticksspan / 60 / 1000;
    } catch (e) {

    }
}

//分钟转换到天小时分钟格式
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

//轨迹总里程(米),上一个轨迹点的经纬度
var allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
function GetPopupHtml(d, lat, lng) {

    var html = [];
    html.push("<b>" + d.PlateNo + "</b><br />");
    html.push(d.deviceUtcDate + "<br />");
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
    var sspeeds = d.Speed;
    var speedss = new Number(sspeeds);
    var speeds = (speedss * 3.6).toFixed(2);
    if (speeds < 1) {
        speeds = 0.00;
    }
    html.push(allPage.distance2 + ":" + showDistance + disStr + "<br />");
    html.push("<label>" + allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "</label><br />");
    html.push("地址:" + "<label style=\"display: none;\">" + lng + "," + lat + "</label><label style='color:#0077ff' onmouseover='$(this).moveOver(window.event)' onmouseout='$(this).moveOut(window.event)' onclick=\"getAddressByBMap($(this).prev());$(this).hide();\">点击获取地址</label><br />");
    var courseName = GetCoureName(d.course);
    var stopTime = minuteToStr(d.stopTimeMinute);
    if (d.IsStop == 1) {
        html.push(allPage.stopTime + ":" + stopTime + "<br />");
    } else {
        html.push(allPage.drection + ":" + courseName + ",");
        //速度暂时先默认给0
        html.push(allPage.speed + ":" + speeds + "" + allPage.speedKM + "<br />");
        //html.push(allPage.speed + ":" + 0 + "" + allPage.speedKM + "<br />");
    }
    html.push('&nbsp;&nbsp;');
    lastDistanceLat = lat;
    lastDistanceLng = lng;
    return html.join('');
}

//获取地址
function getAddressByBMap($dom, flag) {
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

    //  百度地图获取地址
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
    //  谷歌地图获取地址
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
                }
            } else {
                //                alert("Geocoder failed due to: " + status);
            }
        });
    }
    //高德地图获取地址
    else if ($.trim($("#selMap").val()) == "Gaode") {
        var lnglatXY = [lng, lat];
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function () {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result, $dom);
                }
            });
        });
    }
    //soso地图获取地址
//    else if ($.trim($("#selMap").val()) == "SouSou") {
//        geocoder = new soso.maps.Geocoder();
//        point = new soso.maps.Point(lng, lat);
//        geocoder.geocode({ 'location': point }, function (results, status) {
//            if (status == soso.maps.GeocoderStatus.OK) {
//                if (results[0]) {
//                    if (/input|select|textarea/.test($dom.prop("tagName").toLowerCase())) {
//                        $dom.val(results[0].formatted_address.split(" ")[0]);
//                    } else {
//                        $dom.html(results[0].formatted_address.split(" ")[0] + (flag ? "(" + text + ")" : ""));
//                        $dom.parents("td:first").css("text-align", "center");
//                        $dom.css("text-decoration", "none");
//                        $dom.show();
//                    }
//                }
//            } else {
//            }
//        });
//    }
    return addressStr;
}

function geocoder_CallBack(data, $dom) {
    var address;
    address = data.regeocode.formattedAddress;
    $dom.html(address);
    $dom.show();
}

function GetClkInfo(d, lat, lng) {

    var sspeeds = d.Speed;
    var speedss = new Number(sspeeds);
    var speeds = (speedss * 3.6).toFixed(2);
    if (speeds < 1) {
        speeds = 0.00;
    }
    var html = [];
    html.push("<b>" + d.PlateNo + "</b><br />");
    html.push(d.deviceUtcDate + "<br />");
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    html.push("地址:" + "<label style=\"display: none;\">" + lng + "," + lat + "</label><label style='color:#0077ff' onmouseover='$(this).moveOver(window.event)' onmouseout='$(this).moveOut(window.event)' onclick=\"getAddressByBMap($(this).prev());$(this).hide();\">点击获取地址</label><br />");
    var stopTime = minuteToStr(d.stopTimeMinute);
    //var STime = minuteToStr(d.StartTime);
    //var ETime = minuteToStr(d.EndTime);
    if (d.IsStop == 1) {
        html.push(allPage.startStopTime + ":" + d.StartTime + "<br />");
        html.push(allPage.endStopTime + ":" + d.EndTime + "<br />");
        html.push(allPage.stopTime + ":" + stopTime);

    } else {
        var courseName = GetCoureName(d.course);
        //速度暂时先默认给0;
        html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + speeds + allPage.speedKM);
        html.push(allPage.drection + ":" + courseName + ""　)
        //html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + 0 + allPage.speedKM);
    }
    return html.join('');
}

function appendStopEvent(d) {
    var eventName = reportPage.stopCount;
    var stopTime = minuteToStr(d.stopTimeMinute);
    var html = [];
    html.push("<tr>");
    html.push('<td align="center">' + eventName + '</td>');
    html.push('<td align="center">' + d.deviceUtcDate + '</td>');
    html.push('<td align="center">' + d.serverUtcTime + '</td>');
    html.push('<td align="center">' + stopTime + '</td>');
    html.push("</tr>");
    $("#tblEvent").prepend(html.join(''));
}

function appendOverspeedEvent(d) {
    var isLastOverspeed = false;
    //当前点设备时间距离上一个点时间1分钟内,算一条数据
    if (lastStartOverspeedTime) {
        var overspeedDateDiff = DateDiff(lastEndOverspeedTime, d.deviceUtcDate);
        if (overspeedDateDiff < 1) {
            isLastOverspeed = true;
        }
    }
    if (isLastOverspeed) {
        $("#tblEvent tr:eq(1)").find('td').each(function (i) {
            if (i == 2) {
                $(this).html(d.deviceUtcDate);
            } else if (i == 3) {
                var overspeedTime = minuteToStr(parseInt(DateDiff(lastStartOverspeedTime, d.deviceUtcDate)));
                $(this).html(overspeedTime);
            }
        });
    } else {
        lastStartOverspeedTime = d.deviceUtcDate;
        var eventName = allPage.overspeed;
        var overspeedTime = minuteToStr(parseInt(DateDiff(lastStartOverspeedTime, d.deviceUtcDate)));
        var html = [];
        html.push("<tr>");
        html.push('<td align="center">' + eventName + '</td>');
        html.push('<td align="center">' + d.deviceUtcDate + '</td>');
        html.push('<td align="center">' + d.deviceUtcDate + '</td>');
        html.push('<td align="center">' + overspeedTime + '</td>');
        html.push("</tr>");
        $("#tblEvent").prepend(html.join(''));
    }
    lastEndOverspeedTime = d.deviceUtcDate;
}
