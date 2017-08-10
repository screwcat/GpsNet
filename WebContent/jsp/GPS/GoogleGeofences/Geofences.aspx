<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Geofences.aspx.cs" Inherits="LM.Web.GPS.GoogleGeofences.Geofences" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="../css/all.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
        <script id="MapSrc" src="http://ditu.google.cn/maps/api/js?sensor=false&language=cn"
        type="text/javascript"></script>
    <script src="../js/language02-zh-cn.js" type="text/javascript"></script>
    <script src="../js/jquery-1.6.min.js" type="text/javascript"></script>
    <script src="../js/jquery.easydrag.js" type="text/javascript"></script>
    <script src="../js/_.js" type="text/javascript"></script>
    <script src="../js/initmap-Google.js" type="text/javascript"></script>
    <script src="../js/popupmarker-Google.js" type="text/javascript"></script>
    <script src="../js/Geofences-Google.js" type="text/javascript"></script>
    <script src="../js/Geofences.js" type="text/javascript"></script>
    <script src="../../Themes/Scripts/Pagination/jquery.pagination.js" type="text/javascript"></script>
    <link href="../../Themes/Scripts/Pagination/tablecloth.css" rel="stylesheet" type="text/css" />
    <link href="../../Themes/Scripts/Pagination/paginations.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        body
        {
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
        }
    </style>
    <%--<script type="text/javascript">
        $(document).keydown(function (e) {
            e = e || window.event;
            if (e.keyCode == 9) {
                $("#divLeft").css({ "width":"300px","display": "block", "top": "20px", "left": ($(window).width() - $("#divLeft").outerWidth(true)) + "px", "position": "absolute" });
                $("#map_canvas").css({ "width": ($(window).width() - $("#divLeft").outerWidth(true))+ "px" });
            }
        });
    </script>--%>

    <script type="text/javascript">
        function altRows(id) {
            if (document.getElementsByTagName) {

                var table = document.getElementById(id);
                var rows = table.getElementsByTagName("tr");

                for (i = 0; i < rows.length; i++) {
                    if (i % 2 == 0) {
                        rows[i].className = "evenrowcolor";
                    } else {
                        rows[i].className = "oddrowcolor";
                    }
                }
            }
        }

        window.onload = function () {
            altRows('alternatecolor');
        }
</script>


    <style type="text/css">
        table.altrowstable {
	        font-family: verdana,arial,sans-serif;
	        font-size:11px;
	        color:#333333;
	        border-width: 1px;
	        border-color: #a9c6c9;
	        border-collapse: collapse;
        }
        table.altrowstable th {
	        border-width: 1px;
	        padding: 8px;
	        border-style: solid;
	        border-color: #a9c6c9;
        }
        table.altrowstable td {
	        border-width: 1px;
	        padding: 8px;
	        border-style: solid;
	        border-color: #a9c6c9;
        }
        .oddrowcolor{
	        background-color:#d4e3e5;
        }
        .evenrowcolor{
	        background-color:#c3dde0;
        }
</style>
</head>
<body style="overflow: hidden;">
    <form method="post" action="Geofences.aspx?id=2&amp;deviceid=16879&amp;p=123980311c03405" id="form1">
    <div class="aspNetHidden">
        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUINTA2MzAxMTNkZBdXYtw4xhTbBuiFToUdu0js1GESJ++4aImhZ6R4xlWm" />
    </div>
    <div class="aspNetHidden">
        <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWBQK5vqKXAQKeqNjdAwKK0ZqbBgKBoNXCCwKL1MvKAmLi54r1t7nkAB/Ljt2dEO9JQYPJftw2uS7hTOKItXKh" />
    </div>
    <div id="divAddGeofence" style="position: absolute; width: 250px; height: 200px;
        border: 3px solid #66CCFF; z-index: 999; background-color: White; display: none;">
        <div id="divAddGeofenceTitle" style="height: 25px; background-color: #3399FF; color: #FFFFFF;">
            <table width="100%" border="0">
                <tr>
                    <td>
                        <b>
                            <script type="text/javascript">
                                writePage(geofencesPage.geofence);
                            </script>
                        </b>
                    </td>
                    <td width="20">
                        <img src="../images/GoogleGeofences/iw_close.gif" " border="0" onclick="closeDiv('divAddGeofence')" style="cursor: pointer;" />
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <table width="100%" border="0">
                <tr>
                    <td>
                        <script type="text/javascript">
                            writePage(allPage.name);
                        </script>
                        :
                    </td>
                    <td>
                        <input type="text" id="txtGeofenceName" style="width: 120px;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        范围类型：
                    </td>
                    <td>
                        <select id="txtGeofenceType" style="width:120px">
                            <option value="0">进电子围栏</option>
                            <option value="1">出电子围栏</option>                        
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        图形类别：
                    </td>
                    <td>
                        <select id="txtGraphAlarm"  style="width:120px">
                            <option value="circle">圆形</option>
                            <option value="polygon">多边形</option>
                            <option value="rectangle">矩形</option>
                            <option value="track">轨迹</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <script type="text/javascript">
                            writePage(allPage.desc);
                        </script>
                        :
                    </td>
                    <td>
                        <textarea id="txtGeofenceRemark" cols="" rows="" style="width: 150px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <input id="btnSave" name="" class="btn_submit" type="button" value="" onclick="addSaveGeofence();" />&nbsp;&nbsp;
                        <input id="btnCancel" name="" class="btn_reset" type="reset" value="" onclick="closeDiv('divAddGeofence');" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div>
        <div>
            <table width="100%" border="0">
                <tr>
                <td width="70%" valign="top">
                    <div id="map_canvas" style="width: 100%;">
                    </div>
               </td>
                <td valign="top">
                        <div id="divLeft" style="border: 1px solid #99CCCC; overflow: auto; ">
                        <table class="altrowstable" id="alternatecolor" width="100%" border="0">
                            <tr>
                                <td align="right">
                                    <a href="#" onclick="addGeofence();">
                                        <%--<script type="text/javascript">
                                            writePage(geofencesPage.addGeofence);
                                        </script>--%>
                                        <input type="button" value="新增电子围栏" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="divLeftTable">
                                    </div>
                                    <div id="Pagination" style="width:100px;height:20px; position:absolute; left:55%">
                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    
                </td>
                </tr>
            </table>
        </div>
    </div>
  
    <input name="hidUserID" type="hidden" id="hidUserID" value="2" />
    <%--<input name="hidDeviceID" type="hidden" id="hidDeviceID" value="16879" />--%>
    <input name="hidDeviceID" runat="server" type="hidden" id="hidDeviceID" />
    <input name="hidTimeZone" type="hidden" id="hidTimeZone" value="China Standard Time" />
    <input name="hidDeviceName" type="hidden" runat="server" id="hidDeviceName" />
    </form>
</body>
</html>