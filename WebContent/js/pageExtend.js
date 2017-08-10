
//名词说明：
//1.json对象：满足json数据格式的js对象

(function ($, win) {
    //初始化全局变量 
    //    window.


    //对jQuery对象的扩展 
    /*==============================================================================*/
    $.fn.trClick = function ($dom) {
        var $self = this,
            $table = null, $currTable = null, $selectTr = null, gps = null, gpsArr = null, imeiStr = "",
            columnName = "", columnValue = "";

        if (!/tr/.test($self.prop("tagName").toLowerCase()) || $self.length == 0) {
            return;
        }

        //gpsInfoArrStr
        //        alert($dom.attr("gpsInfoArrStr"));
        $table = $self.parents("table:first");
        $selectTr = $table.find("tr[selected=\"selected\"]");
        if ($selectTr.length > 0) {
            $selectTr.attr("selected", false);
            $selectTr.find("td").css("background-color", "transparent");
        }
        $self.attr("selected", "selected");
        $self.find("td").css("background-color", "#e0eccc");

        imeiStr = $self.find(":input[type=\"hidden\"]").val();
        if ($dom != null && $dom.length > 0) {
            //            gpsArr = eval("(" + $dom.attr("gpsInfoArrStr") + ")");
            gpsArr = $.getGpsInfo();
            //            alert(gpsArr.length);
            gps = $.getObj("imei", gpsArr, imeiStr);

            //            if (gps.Online) {
            //                showGPSHtml(imeiStr);
            //            } else {
            ////                alert("该设备已下线！");
            //            }
            if (gps != null && gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000) {
                showGPSHtml(imeiStr);
            } else {
                //                alert("该设备已下线！");
            }
        }

        //        if ($.trim($table.attr("id")) == "tbMyDevice") {
        //            columnName = $("#sltVehicleCond").val();
        //            columnValue = $("#txtSearchInput").val();
        //            likeSearch(window.event, $table, "gpsInfoArrStr", columnName, columnValue);
        //        }




        //        $currTable = $self.parents("table:first"); 
        //        $selectTr = $currTable.find("tr[selected=\"selected\"]");
        //        if ($selectTr.length > 0) {
        //            $selectTr.attr("selected", false);
        //            $selectTr.find("td").css("background-color", "transparent");
        //        }
        //        $self.attr("selected", "selected");
        //        $self.find("td").css("background-color", "#e0eccc");

        //        imeiStr = $self.find(":input[type=\"hidden\"]").val();
        //        if ($dom != null && $dom.length > 0) {
        //            //            gpsArr = eval("(" + $dom.attr("gpsInfoArrStr") + ")");
        //            gpsArr = $.getGpsInfo();
        //            //            alert(gpsArr.length);
        //            gps = $.getObj("imei", gpsArr, imeiStr);

        //            //            if (gps.Online) {
        //            //                showGPSHtml(imeiStr);
        //            //            } else {
        //            ////                alert("该设备已下线！");
        //            //            }
        //            if (gps != null && gps.Longitude * 1000000 >= 72000000 && gps.Longitude * 1000000 <= 136000000 &&
        //                gps.Latitude * 1000000 >= 3000000 && gps.Latitude * 1000000 <= 54000000) {
        //                showGPSHtml(imeiStr);
        //            } else {
        //                //                alert("该设备已下线！");
        //            }
        //        }

        //        if ($.trim($currTable.attr("id")) == "tbMyDevice") {
        //            columnName = $("#sltVehicleCond").val();
        //            columnValue = $("#txtSearchInput").val();
        //            likeSearch(window.event, $currTable, "gpsInfoArrStr", columnName, columnValue);
        //        }




        //  处理表格滚动距离
        //        if ($self.offset().top >= ($("#tbMyDevice_tableData").outerHeight(true))) {
        //            if ($("#tbMyDevice_tableData").scrollTop() != 0) {
        //                $("#tbMyDevice_tableData").scrollTop(0);
        //            }
        //            $("#tbMyDevice_tableData").scrollTop($self.offset().top - $("#tbMyDevice_tableData").outerHeight(true));
        //        }
    };

    $.fn.trOver = function () {
        var $self = this, $table = null;

        if (!/tr/.test($self.prop("tagName").toLowerCase()) || $self.length == 0) {
            return;
        }

        $table = $self.parents("table:first");

        if ($.trim($self.attr("selected")) != "selected") {
            $self.find("td").css("background-color", "#e0eccc");
        }
    }

    $.fn.trOut = function () {
        var $self = this, $table = null;

        if (!/tr/.test($self.prop("tagName").toLowerCase()) || $self.length == 0) {
            return;
        }

        $table = $self.parents("table:first");

        if ($.trim($self.attr("selected")) != "selected") {
            $self.find("td").css("background-color", "transparent");
        }
    }

    $.fn.setVal = function (data) {
        var $self = this,
            replaceStr = "", markStr = "", $domObj, $form;

        if (/\s*<\s*body\s*>\s*/.test(data)) {
            markStr = data.match(/\s*<\s*body\s*>\s*/)[0];
            replaceStr = data.substring(0, data.indexOf(markStr) + markStr.length);
            data = data.replace(replaceStr, "");
        }

        if (/\s*<\s*\/\s*body\s*>\s*/.test(data)) {
            markStr = data.match(/\s*<\s*\/\s*body\s*>\s*/)[0];
            replaceStr = data.substring(data.indexOf(markStr) + 1, data.length);
            data = data.replace(replaceStr, "");
        }

        $form = $(data);
        $domObj = $($form.html());
        $domObj.find(":input[type=\"hidden\"][name=\"__VIEWSTATE\"]").remove();
        $self.append($form.prev());
        $self.append($domObj.filter(":not(:input[type=\"hidden\"][name=\"__VIEWSTATE\"])"));
        $self.append($form.next());
    };
    $.fn.makeVertical = function () {
        var $self = this, $siblings = null,
            totalHeight = 0, windowHeight = $(window).height();

        if ($self.length > 0) {
            $siblings = $self.siblings();

            $siblings.each(function (key, value) {
                totalHeight += $(value).outerHeight(true);
            });
            //            alert(windowHeight + "|" + totalHeight);
            $self.css("height", (windowHeight - totalHeight - 400) + "px");
        }
    }
    //form表单元素聚焦事件
    $.fn.focusEvent = function (clearValue) {
        var $self = this;

        if ($self.length == 0 || !/input|textarea|select/.test($self.prop("tagName").toLowerCase())) {
            return;
        }

        if ($.trim($self.val()) == $.trim(clearValue)) {
            $self.val("");
        }
    }
    //  form表单元素失焦事件
    $.fn.blurEvent = function (clearValue) {
        var $self = this;

        if ($self.length == 0 || !/input|textarea|select/.test($self.prop("tagName").toLowerCase())) {
            return;
        }

        if ($.trim($self.val()) == "") {
            $self.val(clearValue);
        }
    };
    //  form表单元素按键抬起事件
    $.fn.keyupEvent = function (e, code, $btn, eventName) {
        e = e ? e : window.event;

        if (code == null || !/number/.test(typeof code) ||
            $btn == null || $btn.length == null || $btn.length == 0 ||
            !/string/.test(typeof eventName)) {
            return;
        }

        if (e.keyCode == code) {
            $btn[eventName]();
        }
    };
    //  刷新按钮事件，重加载
    $.fn.reload = function () {
        location = location.href;
    }
    //  查询地图地理位置
    $.fn.searchPosition = function (keyword, mapType) {
        var positionMrkArr = null, local = null, geocoder = null, bounds = null,
            northEast = null, southWest = null;

        //  百度地图定位功能
        if ($.trim(mapType) == "Baidu") {
            positionMrkArr = win.positionMrkArr == null ? new Array() : win.positionMrkArr;
            local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: true
                },
                "onMarkersSet": function (pois) {
                    for (var i = 0; i < positionMrkArr.length; i++) {
                        map.removeOverlay(positionMrkArr[i]);
                        positionMrkArr.splice(i, 1);
                        i--;
                    }

                    for (var i = 0; i < pois.length; i++) {
                        if (i > 0) {
                            map.removeOverlay(pois[i].marker);
                        } else {
                            positionMrkArr.push(pois[i].marker);
                            win.positionMrkArr = positionMrkArr;
                        }
                    }
                },
                "onSearchComplete": function (result) {

                }
            });
            local.search(keyword);
        }

            //  谷歌地图定位功能
        else if ($.trim(mapType) == "Google") {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': keyword }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0]);
                    if (results[0]) {
                        bounds = results[0].geometry.bounds != null ? results[0].geometry.bounds :
                            new google.maps.LatLngBounds();
                        if (bounds.toSpan().B == 0 || bounds.toSpan().k == 0) {
                            bounds.extend(results[0].geometry.viewport.getNorthEast());
                            bounds.extend(results[0].geometry.viewport.getSouthWest());
                        }
                        map.fitBounds(bounds);
                    }
                } else {
                    //                    alert("Geocoder failed due to: " + status);
                }
            });
        }

            //  高德地图定位功能
        else if ($.trim(mapType) == "Gaode") {
            geocoder = new AMap.Geocoder({
                radius: 1000
            });

            //            map.bind(geocoder, "complete", function (geoData) {
            //                console.log(geoData.geocodes);
            //            });

            //            console.log(geocoder.getLocation);
            geocoder.geocode(keyword, function (reoResult) {
                map.setCenter(new AMap.LngLat(reoResult.list[0].x, reoResult.list[0].y));
                //                map.setCity(map.getCity());
                console.log(map.getCity);
            });
        }

        if (parent != null && parent.$ != null && parent.$.setIsPosition != null) {
            parent.$.setIsPosition(true);
        }
    }

    //    $.fn.searchArea = function () {
    //        var rectSearch = new BMapLib.SearchInRectangle(map, "沈阳", {
    //            renderOptions: {
    //                map: map,
    //                strokeWeight: 3,
    //                strokeColor: "red",
    //                fillColor: "white",
    //                opacity: 0.5,
    //                followText: "拖拽鼠标搜索" + "沈阳" + "",
    //                autoClose: true,
    //                autoViewport: false,
    //                alwaysShowOverlay: false
    //            }
    //        });
    //        RectSearch.setLineStyle("dashed");
    //        window.rectSearch = rectSearch;
    //        rectSearch = window.rectSearch;
    //        rectSearch.open();
    //    };
    /*==============================================================================*/



    //对jQuery本身的扩展 
    /*==============================================================================*/
    $.DateToString = function (fmt, date) {
        var dateStr = "";

        if (fmt == null || date == null || !/object/.test(typeof date) || !/string/.test(typeof fmt) || date.constructor !== Date) {
            return;
        }

        if (/string/.test(typeof fmt)) {
            if (/(yyyy(-MM(-dd( HH(:mm(:ss)?)?)?)?)?)/.test(fmt)) {
                //                dateStr += date.getFullYear();
                //                dateStr += /-MM/.test(fmt) ? "-" + (date.getMonth() + 1) : "";
                //                dateStr += /-dd/.test(fmt) ? "-" + (date.getDate()) : "";
                //                dateStr += / HH/.test(fmt) ? " " + (date.getHours()) : "";
                //                dateStr += /:mm/.test(fmt) ? ":" + (date.getMinutes()) : "";
                //                dateStr += /:ss/.test(fmt) ? ":" + (date.getSeconds()) : "";
                dateStr += date.getFullYear();
                dateStr += /-MM/.test(fmt) ? "-" + $.NumberToString((date.getMonth() + 1), 2) : "";
                dateStr += /-dd/.test(fmt) ? "-" + $.NumberToString((date.getDate()), 2) : "";
                dateStr += / HH/.test(fmt) ? " " + $.NumberToString((date.getHours()), 2) : "";
                dateStr += /:mm/.test(fmt) ? ":" + $.NumberToString((date.getMinutes()), 2) : "";
                dateStr += /:ss/.test(fmt) ? ":" + $.NumberToString((date.getSeconds()), 2) : "";
            }
        }

        return dateStr;
    };
    $.NumberToString = function (num, len) {
        var numStr = "",
            numLenth = num.toString().length,
            cha = 0;

        if (num == null || len == null || !/number/.test(typeof num) || !/number/.test(typeof len)) {
            return;
        }

        if (numLenth >= len) {
            numStr += num.toString();
        } else {
            cha = len - numLenth;
            for (var i = 0; i < cha; i++) {
                numStr += "0";
            }
            numStr += num.toString();
        }

        return numStr;
    }
    $.StringToDate = function (fmt, dateStr) {
        var date = null,
            year = month = day = hours = minutes = seconds = 0;

        if (!/string/.test(typeof fmt) || !/string/.test(typeof dateStr)) {
            return;
        }

        if (/(yyyy(-MM(-dd(\sHH(:mm(:ss)?)?)?)?)?)/.test(fmt)) {
            year = $.trim(dateStr.split(" ")[0].split("-")[0]) != "" ? parseInt(dateStr.split(" ")[0].split("-")[0], 10) : 0;
            month = $.trim(dateStr.split(" ")[0].split("-")[1]) != "" ? parseInt(dateStr.split(" ")[0].split("-")[1], 10) - 1 : 0;
            day = $.trim(dateStr.split(" ")[0].split("-")[2]) != "" ? parseInt(dateStr.split(" ")[0].split("-")[2], 10) : 0;
            hours = $.trim(dateStr.split(" ")[1].split(":")[0]) != "" ? parseInt(dateStr.split(" ")[1].split(":")[0], 10) : 0;
            minutes = $.trim(dateStr.split(" ")[1].split(":")[1]) != "" ? parseInt(dateStr.split(" ")[1].split(":")[1], 10) : 0;
            seconds = $.trim(dateStr.split(" ")[1].split(":")[2]) != "" ? parseInt(dateStr.split(" ")[1].split(":")[2], 10) : 0;
        }
        date = new Date(year, month, day, hours, minutes, seconds);

        return date;
    };
    //获取单个json对象(满足json数据格式的js对象)
    $.getObj = function (key, arr, para) {
        /// 参数说明
        /// <param name="key" type="string">json对象的属性名，筛选的依据，方法会根据这个属性的值筛选满足条件的唯一一个对象</param>
        /// <param name="arr" type="Array">对象数组，筛选的主体，方法会从该数组中筛选出满足条件的唯一一个对象</param>
        /// <param name="para" type="string|object">如果是string，则对应数组arr中每个元素的属性"key"的值，如果是object，则对应对象para中属性"key"的值</param>
        var obj = null;

        /// 变量说明
        /// <veriable name="obj" type="object">满足条件的js对象，用于返回</param>
        if (arr.constructor == null || arr.constructor !== Array) {
            return;
        }

        for (var i = 0; i < arr.length; i++) {
            if (/string/.test(typeof para)) {
                if ($.trim(arr[i][key]) == $.trim(para)) {
                    obj = arr[i];
                    break;
                }
            } else if (/object/.test(typeof para)) {
                if ($.trim(arr[i][key]) == $.trim(para[key])) {
                    obj = arr[i];
                    break;
                }
            }
        }

        return obj;
    };
    //修改json对象“gps”的属性
    //主要用于向百度地图添加地标
    //添加地标方法addMarker()是项目原来就写好的
    //里边的地标对象marker用在弹窗信息处的属性与原GPSData类中的属性存在不同
    //此处修改为了增加和修改GPSData类中的属性，以同步添加地标方法addMarker()中的属性
    //添加地标方法addMarker()在GPS/js/IframeMap-Baidu.js文件中
    $.modifyGPSData = function (gps, vehicle, countOnline) {
        /// 参数说明
        /// <param name="gps" type="object">json对象，是根据后台获取GPSData类对应的json格式字符串反序列化得到的</param>
        /// <param name="vehicle" type="object">json对象，是根据后台获取VehicleEntity类对应的json格式字符串反序列化得到的</param>
        /// <returns>无</returns>
        var arrieveTime = gpsTime = "", timeDiffer = 0, dataGps = null;

        /// 变量说明
        /// <veriable name="arrieveTime" type="string">到达时间，对应本地系统时间</param>
        /// <veriable name="gpsTime" type="string">定位时间，对应json对象gps的SendTime</param>
        if (gps != null) {
            gps.serverUtcDate = gps.SendTime;
            if (gps.SendTime.indexOf("T") > -1) {
                gps.SendTime = $.DateToString(
                    "yyyy-MM-dd HH:mm:ss",
                    new Date(
                        parseInt(gps.SendTime.split("T")[0].split("-")[0], 10),
                        parseInt(gps.SendTime.split("T")[0].split("-")[1], 10) - 1,
                        parseInt(gps.SendTime.split("T")[0].split("-")[2], 10),
                        parseInt(gps.SendTime.split("T")[1].split(":")[0], 10),
                        parseInt(gps.SendTime.split("T")[1].split(":")[1], 10),
                        parseInt(gps.SendTime.split("T")[1].split(":")[2], 10)
                    )
                );
            }

            gpsTime = $.DateToString("yyyy-MM-dd HH:mm:ss", new Date($.StringToDate("yyyy-MM-dd HH:mm:ss", gps.SendTime)));
            arrieveTime = $.DateToString("yyyy-MM-dd HH:mm:ss", new Date());

            timeDiffer = Date.parse($.StringToDate("yyyy-MM-dd HH:mm:ss", arrieveTime)) / (1000 * 60) -
                Date.parse($.StringToDate("yyyy-MM-dd HH:mm:ss", gpsTime)) / (1000 * 60);
            //            gps.Online = Math.round(timeDiffer) < 0 ? null : Math.round(timeDiffer) >= 10 ? false : true;
            if (gps.Online) {
                //                if (countOnline && /number/.test(typeof countOnline)) {
                //                    countOnline++;
                //                }
            }

            gps.baiduLng = gps.Longitude = parseFloat(parseFloat(gps.Longitude, 10).toFixed(6), 10);
            gps.baiduLat = gps.Latitude = parseFloat(parseFloat(gps.Latitude, 10).toFixed(6), 10);
            //            gpsAdd = $.Coordinate(gps, "VehicleListPage.aspx");
            //            gps.Longitude = gpsAdd != null ? parseFloat(gpsAdd.lng) : gps.Longitude;
            //            gps.Latitude = gpsAdd != null ? parseFloat(gpsAdd.lat) : gps.Latitude;
            //            gps.Location = gpsAdd != null ? gpsAdd.location : gps.Location;
            gps.id = gps.imei;
            gps.baiduLng = gps.longitude = gps.Longitude;
            gps.baiduLat = gps.latitude = gps.Latitude;
            gps.name = gps.PlateNo;
            gps.course = gps.Direction;
            gps.status = gps.Online ? "" : "Offline";
            gps.Status = gps.Online ? "在线" : "离线";
            gps.icon = 32;
            gps.sn = gps.imei;
            gps.speed = gps.Velocity;
            gps.deviceUtcDate = gpsTime;
            gps.img = "icons/carIcon/2.png";
            if (vehicle != null) {
                gps.SimNo = vehicle.SimNo;
                gps.CarIndustry = vehicle.CarIndustry;
                gps.VehicleId = vehicle.VehicleId;
            }

            //            $.ajax({
            //                url: "VehicleListPage.aspx",
            //                type: "POST",
            //                data: { lng: gps.Longitude, lat: gps.Latitude },
            //                async: false,
            //                success: function (data) {
            //                    gps.Location = data
            //                }
            //            });
            dataGps = gps;
        }

        return dataGps;
    };
    //百度地图经纬度纠偏
    //通过移动设备采集到的百度地图经纬度存在很大位置偏移，
    //通过此方法纠正位置偏移，精确定位坐标
    //    $.Coordinate = function (gps, url) {
    //        /// 参数说明
    //        /// <param name="gps" type="object">json对象，是根据后台获取GPSData类对应的json格式字符串反序列化得到的</param>
    //        /// <param name="url" type="string">发送地址，用于Ajax发送请求</param>
    //        /// <returns name="coord" type="object">json对象，纠偏后经纬度，内部固有两个属性，lng(经度)、lat(纬度)</returns>
    //        /// 特殊说明
    //        /// 由于之后还需要根据百度地图经纬度获取实际地理地址
    //        /// 获取实际地理地址需要调用服务器端方法
    //        /// 为减缓前后台交互过程造成的时间流失，
    //        /// 将获取实际地理地址的过程放到该方法中一起处理
    //        /// 获取到的实际地理地址存放在json对象gps的location属性
    //        var coord = null;

    //        /// 变量说明
    //        /// <veriable name="coord" type="object" proper="lng,lat,location">json对象，纠偏后的经纬度及实际地理地址，用于返回</param>
    //        $.ajax({
    //            url: url,
    //            type: "POST",
    //            data: { lng: gps.Longitude, lat: gps.Latitude },
    //            async: false,
    //            success: function (data) {
    //                if ($.trim(data) != "") {
    //                    coord = JSON.parse(data);
    //                }
    //                coord = /object/.test(typeof coord) ? coord : null;
    //            }
    //        });

    //        return coord;
    //    };
    $.FixTable = function (TableID, FixColumnNumber, width, height) {
        /// <summary>
        ///     锁定表头和列
        ///     <para> sorex.cnblogs.com </para>
        /// </summary>
        /// <param name="TableID" type="String">
        ///     要锁定的Table的ID
        /// </param>
        /// <param name="FixColumnNumber" type="Number">
        ///     要锁定列的个数
        /// </param>
        /// <param name="width" type="Number">
        ///     显示的宽度
        /// </param>
        /// <param name="height" type="Number">
        ///     显示的高度
        /// </param>
        if ($("#" + TableID + "_tableLayout").length != 0) {
            $("#" + TableID + "_tableLayout").before($("#" + TableID));
            $("#" + TableID + "_tableLayout").empty();
        }
        else {
            $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");
        }

        $('<div id="' + TableID + '_tableFix"></div>'
    + '<div id="' + TableID + '_tableHead"></div>'
    + '<div id="' + TableID + '_tableColumn"></div>'
    + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");


        var oldtable = $("#" + TableID);

        var tableFixClone = oldtable.clone(true);
        tableFixClone.attr("id", TableID + "_tableFixClone");
        $("#" + TableID + "_tableFix").append(tableFixClone);
        var tableHeadClone = oldtable.clone(true);
        tableHeadClone.attr("id", TableID + "_tableHeadClone");
        $("#" + TableID + "_tableHead").append(tableHeadClone);
        var tableColumnClone = oldtable.clone(true);
        tableColumnClone.attr("id", TableID + "_tableColumnClone");
        $("#" + TableID + "_tableColumn").append(tableColumnClone);
        $("#" + TableID + "_tableData").append(oldtable);

        $("#" + TableID + "_tableLayout table").each(function () {
            $(this).css("margin", "0");
        });


        var HeadHeight = $("#" + TableID + "_tableHead thead").height();
        HeadHeight += 2;
        $("#" + TableID + "_tableHead").css("height", HeadHeight);
        $("#" + TableID + "_tableFix").css("height", HeadHeight);


        var ColumnsWidth = 0;
        var ColumnsNumber = 0;
        $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function (key, value) {
            ColumnsWidth += $(this).outerWidth(true);
            ColumnsNumber++;
        });
        ColumnsWidth += 2;
        if ($.browser.msie) {
            switch ($.browser.version) {
                case "7.0":
                    if (ColumnsNumber >= 3) ColumnsWidth--;
                    break;
                case "8.0":
                    if (ColumnsNumber >= 2) ColumnsWidth--;
                    break;
            }
        }
        $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
        $("#" + TableID + "_tableFix").css("width", ColumnsWidth);


        $("#" + TableID + "_tableData").scroll(function () {
            $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
            $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
        });

        $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "Silver" });
        $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width - 17, "position": "relative", "z-index": "45", "background-color": "Silver" });
        $("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height - 17, "position": "relative", "z-index": "40", "background-color": "Silver" });
        $("#" + TableID + "_tableData").css({ "overflow": "scroll", "width": width, "height": height, "position": "relative", "z-index": "35" });

        if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
            $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
            $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
        }
        if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
            $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
            //            $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            $("#" + TableID + "_tableData").css(
                "height",
                ($("#" + TableID + "_tableColumn table").height() + 17) >= height ?
                    ($("#" + TableID + "_tableColumn table").height() + 17) :
                    height
            );
        }

        $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
    };
    /*==============================================================================*/
})(jQuery, window);
