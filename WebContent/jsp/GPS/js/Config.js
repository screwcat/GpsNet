var GPSXITONGAPI = "/Ajax/POIService.asmx/GetAddressByLatlng";

/*谷歌地图获取地址原方法*/
//function GetAddressByGoome(lat, lng) {
//    $.ajax({
//        type: "post",
//        url: GPSXITONGAPI,
//        contentType: "application/json",
//        data: "{Lat:" + lat + ",Lng:" + lng + ",MapType:'BAIDU',Language:'ZH-CN'}",
//        dataType: "json",
//        error: function (res) {
//        },
//        success: function (result) {
//            $('#divMarkerAddress').html(result.d);
//        }
//    });

//}

/*谷歌地图获取地址方法改*/
function GetAddressByGoome(lat, lng) {
    var geocoder = null, point = null;

    geocoder = new google.maps.Geocoder();
    point = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ "latLng": point }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                
                //                $('#divMarkerAddress').html(results[0].formatted_address.split(" ")[0]);
            }
        } else {
//            alert("Geocoder failed due to: " + status);
        }
    });
}


function GetAddressByGoomeGoogle(t, lat, lng) {
    $.ajax({
        type: "post",
        url: GPSXITONGAPI,
        contentType: "application/json",
        data: "{Lat:" + lat + ",Lng:" + lng + ",MapType:'GOOGLE',Language:'ZH-CN'}",
        dataType: "json",
        error: function (res) {
        },
        success: function (result) {
            $(t).parent().html(result.d);
        }
    });
}

