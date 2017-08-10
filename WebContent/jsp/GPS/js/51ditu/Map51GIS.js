
Map51GIS = {
    IntiMap: function (fun) {
        this.map = new LTMaps("mapDiv");
        var LoC = new LTPoint(loginTip.DefaultLng * 100000, loginTip.DefaultLat * 100000);
        this.map.centerAndZoom(LoC, 7);
        this.map.addControl(new LTStandMapControl());
        this.map.handleMouseScroll(true);
        Map51 = this;
        if (fun != undefined) {
            fun();
        }
    },
    RemoveAll: function () {
        //if (GoogleGIS.deviceinfo != null) {
        //    GoogleGIS.deviceinfo.setMap(null);
        //}
        //this.Mrk.RemoveActivityPoint();
    }, PanToCenter: function (lat, Lng) {
        //var Local = new google.maps.LatLng(lat, Lng);
        //this.map.panTo(Local);
    },
    deviceinfo: null,
    ShowdeviceInfo: function (data) {
        var Po = new LTPoint(data.LastLocation.OffsetLng * 100000, data.LastLocation.OffsetLat * 100000);
        Map51GIS.map.overlayManager.removeOverLaysByType("marker");
        var option = new LTMarkerOptions();
        option.point = Po;
        Map51GIS.deviceinfo = new LTMarkerOverlay(option);
        Map51GIS.map.overlayManager.addOverLay(Map51GIS.deviceinfo, true);

    },
    Mrk: {
        AddManyMrk: function () { }
    }
    ,
    Geofence: {
        Polygon: null,
        PolygonList: new Array(),
        AddManyGeofence: function (GeofenceList) {
            for (var i in Map51GIS.Geofence.PolygonList) {
                try {
                    Map51GIS.map.overlayManager.removeOverLay(Map51GIS.Geofence.PolygonList[i]);
                } catch (e) {

                }
            }
        },
        ShowGeofenceInfo: function (data) {
            var PointArr = new Array();
            var PointArrStr = data.geography.split(';');
            for (var ix in PointArrStr) {
                var PStr = PointArrStr[ix];
                if (PStr == "") {
                    continue;
                }
                PStr = PStr.split(',')
                var Po = new LTPoint(parseFloat(PStr[1]) * 100000, parseFloat(PStr[0]) * 100000);
                PointArr.push(Po);
            }
            var option = new LTPolygonOptions();
            option.points = PointArr;
            option.color = "blue";
            option.weight = 2;
            Map51GIS.Geofence.PolygonList[data._id] = new LTPolygonOverlay(option);
            Map51GIS.map.overlayManager.addOverLay(Map51GIS.Geofence.PolygonList[data._id], true);

        },
        hideGeofence: function (data) {
            Map51GIS.map.overlayManager.removeOverLay(Map51GIS.Geofence.PolygonList[data._id]);
        },
        GetGeofenceData: function () {
            if (Map51GIS.Geofence.PoArr.length < 3) {
                alert("请至少绘制三个点");
                return "";
            }
            var s = "";
            var Data = Map51GIS.Geofence.PoArr;
            for (var i in Data) {
                s = s + Data[i].getLatitude() / 100000 + "," + Data[i].getLongitude() / 100000 + ";";
            }
            return s;
        },
        ClearDw: function () {
            if (Map51GIS.Geofence.Polygon != null) {
                Map51GIS.map.overlayManager.removeOverLay(Map51GIS.Geofence.Polygon);
            }
            LTEvent.removeListener(Map51GIS.Geofence.ClickFun);
            Map51GIS.map.setMapCursor("pointer", "move");
        },
        ladata: null,
        ClickFun: null,
        DrawGeofence: function () {
            Map51GIS.Geofence.PoArr = new Array();

            var option = new LTPolygonOptions();
            option.points = Map51GIS.Geofence.PoArr;
            option.color = "red";
            option.weight = 2;
            Map51GIS.Geofence.Polygon = new LTPolygonOverlay(option);
            Map51GIS.Geofence.Polygon.setEditable(true);
            Map51GIS.map.overlayManager.addOverLay(Map51GIS.Geofence.Polygon, false);

            Map51GIS.Geofence.ClickFun = LTEvent.addListener(Map51GIS.map, "click", function (point) {
                Map51GIS.Geofence.PoArr.push(Map51GIS.map.getPointLatLng(point));
                Map51GIS.Geofence.Polygon.setPoints(Map51GIS.Geofence.PoArr);
            });
            Map51GIS.map.setMapCursor("hand", "move");
        }
    }
}