var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var GeofenceID = 0;
var UserID = 0;

var PageIndex = 0;     //页面索引初始值  
var PageSize = 2;     //每页显示条数初始化，修改显示条数，修改这里即可  
var colName = "";
var colValue = "";
var ds = "";

$(document).ready(function () {

    $("#divAddGeofence").easydrag();
    $("#divAddGeofence").setHandler("divAddGeofenceTitle");

    DeviceName = $("#hidDeviceName").val();
    var title = "Geofence";
    document.title = title + ":" + DeviceName;
    initLanguage();
    syncSize();
    initmap();

    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();
    UserID = $("#hidUserID").val();

    ajaxGetTracking();
    if (DeviceID != "" || DeviceID != "undefined") {
        getAllGeofence();
    }
});

function initLanguage() {
    $("#btnSave").val(" " + allPage.save + " ");
    $("#btnCancel").val(" " + allPage.cancel + " ");
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 5;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    $("#divLeft").css("height", h + "px");

    $("#divAddGeofence").css("left", (w - 220) / 2 + 100 + "px");
    $("#divAddGeofence").css("top", (h - 150) / 2 + 100 + "px");
}

function ajaxGetTracking() {
    Url = "/Ajax/DevicesAjax.aspx?DeviceID=" + DeviceID + "&TimeZone=" + TimeZone;
    $.ajax({
        type: "post",
        //url: "/Ajax/DevicesAjax.aspx",
        url: Url,
        //contentType: "application/json",
        //data: "{DeviceID:" + DeviceID + ",TimeZone:'" + TimeZone + "'}",
        //dataType: "json",
        error: function (res) {
            //alert(res.responseText);
            //alert("error");
        },
        success: function (result) {
            //alert(result);
            //if (result.d != "" && result.d != "{}") {
            if (result != "" && result != "{}") {
                var json = eval("(" + result + ")");
                showMarker(json);
            }
        }
    });
}


function addGeofence() {
    if (!editCircle) {
        GeofenceID = 0;
        MapDrawCanEditCircle();
        showDiv("divAddGeofence");
    }

}


function showDiv(id) {
    $("#" + id).show();
}

function closeDiv(id) {
    closeCircle();
    $("#" + id).hide();
    $("#txtGeofenceName").val("");
    $("#txtGeofenceRemark").val("");
    $("#txtGeofenceType").val("");
    $("#txtGraphAlarm").val("");
}

function addSaveGeofence() {
    var name = $("#txtGeofenceName").val();
    var remark = $("#txtGeofenceRemark").val();
    var gType = $("#txtGeofenceType").val();
    var gAlarm = $("#txtGraphAlarm").val();
    if (name == "") {
        alert(geofencesPage.geoNameNull);
        return;
    }
    SaveGeofence(name, remark,gType,gAlarm);

}

var geofenceArr = [];
function getAllGeofence() {
    GetDevices();
    $("#Pagination").pagination(ds, {
        callback: PageCallback,
        prev_text: '上一页',       //上一页按钮里text  
        next_text: '下一页',       //下一页按钮里text  
        items_per_page: PageSize,  //显示条数  
        num_display_entries: 2,    //连续分页主体部分分页条目数  
        current_page: PageIndex,   //当前页索引  
        num_edge_entries: 1        //两侧首尾分页条目数  
    });

    function GetDevices() {
        var GeoUrl = "/Ajax/GeofenceAjax.aspx?action=getCount&DeviceID=" + DeviceID + "&TimeZone=" + TimeZone + "&PageIndex=" + (PageIndex + 1) + "&PageSize=" + PageSize;
        $.ajax({
            type: "Post",
            url: GeoUrl,
            async: false,
            data: "",
            dataType: "json",
            error: function (result) {
                //alert(result);
            },
            success: function (result) {
                if (result != null) {
                    ds = result;
                    //alert(ds);
                }
            }
        });
    }


    //翻页调用  
    function PageCallback(index, jq) {
        InitTable(index);
    }

    function InitTable(PageIndex) {
        clearGeofence();
        var GeoUrl = "/Ajax/GeofenceAjax.aspx?action=GetAllGeofences&DeviceID=" + DeviceID + "&TimeZone=" + TimeZone + "&PageIndex=" + (PageIndex+1) + "&PageSize=" + PageSize;
        $.ajax({
            type: "post",
            //url: "Ajax/GeofenceAjax.asmx/GetGeofence",
            url: GeoUrl,
            //contentType: "application/json",
            //data: "{DeviceID:" + DeviceID + ",TimeZone:'" + TimeZone + "'}",
            //dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result != "" && result != "{}") {
                    if (DeviceID != "" && DeviceID != "0") {
                        var json = eval("(" + result + ")");
                        showGeofenceTable(json);
                        showGeofenceMap(json);
                    }
                }
            }
        });
    }


}


    var TypeId = "";

function showGeofenceTable(json) {

    var html = [];
    html.push('<table width="100%" border="0" cellspacing="1" bgcolor="#6699FF" style="font-size:12px;">');
    html.push('<tr>');
    html.push('<td width="15%"  bgcolor="#FFFFFF">' + allPage.no + '</td>');
    html.push('<td width="20%" bgcolor="#FFFFFF">' + allPage.name + '</td>');
    html.push('<td width="20%" bgcolor="#FFFFFF">' + geofencesPage.radius + '</td>');
    html.push('<td width="15%"  bgcolor="#FFFFFF">' + allPage.operation + '</td>');
    html.push('<td width="30%" bgcolor="#FFFFFF">' + "范围类型" + '</td>');
    html.push('</tr>');

    for (var i = 0; i < json.length; i++) {

        var GoogleLat = json[i].Lat;
        var GoogleLng = json[i].Lng;
        var GoogleTypeId = json[i].TypeID;
        if (GoogleTypeId == 0) {
            TypeId = "进电子围栏";
        } else {
            TypeId = "出电子围栏";
        }
        var index = i + 1;
        html.push('<tr>');
        html.push('<td bgcolor="#FFFFFF">' + index + '</td>');
        html.push('<td bgcolor="#FFFFFF"><a href="javascript:void(0);" onclick="clkOneGeofence(' + GoogleLat + ',' + GoogleLng + ',' + GoogleTypeId + ')">' + json[i].GeofenceName + '</a></td>');
        html.push('<td bgcolor="#FFFFFF">' + json[i].Radius + '</td>');
        html.push('<td bgcolor="#FFFFFF"><a href="javascript:void(0);" onclick="return confirm(\'' + geofencesPage.delGeoConfirm + '' + json[i].GeofenceName + '' + geofencesPage.delGeoConfirm2 + '\')?delGeofence(' + json[i].GeofenceID + '):void(0);">' + allPage.del + '</a></td>');
        html.push('<td bgcolor="#FFFFFF">' + TypeId + '</td>');
        html.push('</tr>');

    }

    html.push('</table>');
    $("#divLeftTable").html(html.join(''));
}

function delGeofence(id) {
    var delUrl = "/Ajax/GeofenceAjax.aspx?action=DelGeofences&GeofenceID=" + id + "&DeviceID=" + DeviceID;
    $.ajax({
        type: "post",
        url: delUrl,
        //url: "Ajax/GeofenceAjax.asmx/DelGeofence",
        //contentType: "application/json",
        //data: "{GeofenceID:" + id + ",DeviceID:" + DeviceID + "}",
        //dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result);
            if (res > 0) {
                alert(allPage.delSuccess);
                if (DeviceID != "" || DeviceID != "undefined") {
                    getAllGeofence();
                }
            } else {
                alert(allPage.delFaild);
            }
        }
    });
}