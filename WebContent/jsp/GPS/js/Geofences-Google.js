var map = null;

function initmap() {
    initGoogleMap(0, 0, 0);
}


function showMarker(lk) {

    if (lk) {

        var latlng = new google.maps.LatLng(lk.Latitude, lk.Longitude);
        var html = DeviceName;
        var icon = "../icons/carIcon/22_0.png";
        var marker = new PopupMarker({
            position: latlng,
            map: map,
            icon: icon,
            text: html,
            showpop: true,
            id: lk.locationID
        });

        map.setCenter(latlng);
        map.setZoom(14);
    }

}
var editCircle = null;
function MapDrawCanEditCircle() {
    var ct = map.getCenter();
    editCircle = new google.maps.Circle({
        center: ct,
        radius: 500,
        map: map,
        editable: true
    });


}

function GetLocation() {
    var loc = new Object();
    loc.Radius = editCircle.getRadius();
    loc.lat = editCircle.getCenter().lat();
    loc.lng = editCircle.getCenter().lng();
    return loc;
}


function closeCircle() {

    if (editCircle) {
        editCircle.setMap(null);
        editCircle = null;
    }
}

function SaveGeofence(name, remark,gType,gAlarm) {
    var lat = editCircle.getCenter().lat();
    var lng = editCircle.getCenter().lng();
    var radius = editCircle.getRadius();
    var Url = "/Ajax/GeofenceAjax.aspx?action=AddGeofences&UserID=" + UserID + "&DeviceID=" + DeviceID + "&GeofenceName=" + name + "&Remark=" + remark + "&Lat=" + lat + "&Lng=" + lng + "&Radius=" + radius + "&GeofenceID=" + 0 + "&gType=" + gType + "&gAlarm=" + gAlarm;
    $.ajax({
        type: "post",
        //url: "Ajax/GeofenceAjax.asmx/SaveGeofence",
        url: Url,
        //contentType: "application/json",
        //data: "{UserID:" + UserID + ",DeviceID:" + DeviceID + ",GeofenceName:'" + name + "',Remark:'" + remark + "',Lat:" + lat + ",Lng:" + lng + ",Radius:" + radius + ",GeofenceID:0,TypeID:0}",
        //dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result);
            if (res > 0) {
                alert(geofencesPage.addSuccess);
                closeDiv('divAddGeofence');
                getAllGeofence();

            } else {
                alert(geofencesPage.addFaild);
            }
        }
    });
}
var allMarkerArr = [];
function showGeofenceMap(json) {

    for (var i = 0; i < json.length; i++) {
        //if (json[i].TypeID == 0) {
            var latlng = new google.maps.LatLng(json[i].Lat, json[i].Lng);
            var circle = new google.maps.Circle({
                center: latlng,
                radius: json[i].Radius,
                map: map,
                editable: false
            });
            geofenceArr.push(circle);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: json[i].GeofenceName
            });

            addGoogleClkListener(marker, json[i]);
            allMarkerArr.push(marker);
        //}
    }

}

function clearGeofence() {

    for (var i = 0; i < geofenceArr.length; i++) {
        if (geofenceArr[i]) {
            geofenceArr[i].setMap(null);
        }
    }
    geofenceArr.length = 0;

    for (var y = 0; y < allMarkerArr.length; y++) {
        if (allMarkerArr[y]) {
            allMarkerArr[y].setMap(null);
        }
    }

    closeWindow();
}

var inforwindowArr = [];
function addGoogleClkListener(marker, g) {
    try {
        var html = GetClkInfo(g);
        var infowindow2 = new google.maps.InfoWindow({ content: html });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow2.open(map, marker);
        });
        inforwindowArr.push(infowindow2);
    } catch (ex) { }

}
function closeWindow() {
    for (var i = 0; i < inforwindowArr.length; i++) {
        inforwindowArr[i].close();
    }
    inforwindowArr.length = 0;
}

function GetClkInfo(g) {

    var html = [];
    html.push(allPage.name + ":" + g.GeofenceName + "<br />");
    html.push(allPage.lat + ":" + g.Lat + "," + allPage.lng + ":" + g.Lng + "<br />");
    html.push(geofencesPage.radius + ":" + g.Radius + "<br />");
    html.push(allPage.desc + ":" + g.Remark + "<br />");
    html.push(allPage.time + ":" + g.cDate + "<br />");
    html.push('<a href="javascript:void(0);" onclick="return confirm(\'' + geofencesPage.delGeoConfirm + '' + g.GeofenceName + '' + geofencesPage.delGeoConfirm2 + '\')?delGeofence(' + g.GeofenceID + '):void(0);">' + allPage.del + '</a><br />');
    return html.join('');
}

function clkOneGeofence(lat, lng, typeId) {
    //if (typeId == 0) {
        var latlng = new google.maps.LatLng(lat, lng);
        map.panTo(latlng);
    //}
}