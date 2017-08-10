<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>轨迹回放</title>
<link rel="stylesheet" href="CSS/all.css" type="text/css" />
<script src="JS/jquery-1.6.min.js" type="text/javascript"></script>
<script src="js/json2.js" type="text/javascript"></script>
<script src="js/language02-zh-cn.js" type="text/javascript"></script>
<script type="text/javascript" src="/My97DatePicker/WdatePicker.js"></script>
<link href="/My97DatePicker/skin/WdatePicker.css" rel="stylesheet"
	type="text/css" />
<script src="JS/PublicMap.js" type="text/javascript"></script>
<script src="JS/jquery.ui.widget.min.js" type="text/javascript"></script>
<script src="JS/jquery.ui.mouse.min.js" type="text/javascript"></script>
<script src="JS/jquery.ui.core.min.js" type="text/javascript"></script>
<script src="JS/jquery.ui.slider.min.js" type="text/javascript"></script>
<script src="JS/_.js" type="text/javascript"></script>
<script src="JS/Playback.js" type="text/javascript"></script>

<script src="/Themes/Scripts/FunctionJS.js" type="text/javascript"></script>
<script src="/Themes/Scripts/jquery.pullbox.js" type="text/javascript"></script>
<script src="/Themes/Scripts/artDialog/artDialog.source.js"
	type="text/javascript"></script>
<script src="/Themes/Scripts/artDialog/iframeTools.source.js"
	type="text/javascript"></script>

<%-- <script src="JS/initmap-Baidu.js" type="text/javascript"></script>
    <script src="JS/Playback-Baidu.js?v=20140305" type="text/javascript"></script>
    <script src="JS/popupmarker-Baidu.js" type="text/javascript"></script>--%>
<%-- <%=NewSB.ToString()%> --%>
<script src="../js/pageExtend.js" type="text/javascript"></script>
<script type="text/javascript">
	function showDownList($dateDom, $listDom) {
		var x = y = w = h = 0;

		x = $dateDom.offset().left;
		y = $dateDom.offset().top;
		w = $dateDom.outerWidth(true);
		h = $dateDom.outerHeight(true);
		$listDom.css({
			"width" : w + "px",
			"top" : (y + h) + "px",
			"left" : x + "px"
		});
		$listDom.show();
	}

	function setDownListValue(value) {
		$("#downListPanel").hide();
		if ($.trim(value) == "6") {
			WdatePicker({
				el : "txtDate",
				dateFmt : "yyyy-MM-dd HH:mm:ss"
			});
		}
	}

	function testDatePicker($dom) {
		if ($.trim($dom.val()) == "6") {
			//                WdatePicker({
			//                    el: "ShowDate", dateFmt: "yyyy-MM-dd HH:mm:ss",
			//                    onpicked: function () {
			//                        var $opt = $("<option value=\"" + $.trim($("#hdDate").val()) + "\">" + $("#hdDate").val() + "</option>"),
			//                            $other = $("#sltDate option[value=\"其它时间\"]");

			////                        if ($("#sltDate option[value=\"" + $.trim($opt.val()) + "\"]").length == 0) {
			////                            $other.before($opt);
			////                        }
			//                        //                        $("#sltDate").val($opt.val());
			//                        $("#ShowDate").css("visibility", "visible");
			//                    }
			//                });
			$("#ShowDate1").css("visibility", "visible");

		} else {
			$("#ShowDate1").css("visibility", "hidden");

		}
	}
</script>

<script type="text/javascript">
	function changeMap() {
		var MapType = $('#selMap').val();
		var DeviceID = document.getElementById("hidDeviceID").value;
		var PlateNo = document.getElementById("hidPlateNo").value;
		PlateNo = encodeURI(PlateNo);
		location.href = "Playback.aspx?&MapType=" + MapType + "&DeviceID="
				+ DeviceID + "&PlateNo=" + PlateNo;
	}
</script>
<%--<script type="text/javascript"></script>--%>
<style type="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow: hidden;
}
/* Overlays */
.ui-widget-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

/* Component containers
----------------------------------*/
.ui-widget {
	font-family: Verdana, Arial, sans-serif;
	font-size: 1.1em;
}

.ui-widget .ui-widget {
	font-size: 1em;
}

.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button
	{
	font-family: Verdana, Arial, sans-serif;
	font-size: 1em;
}

.ui-widget-content {
	border: 1px solid #aaaaaa;
	background: #ffffff 50% 50% repeat-x;
	color: #222222;
}

.ui-widget-content a {
	color: #222222;
}

.ui-widget-header a {
	color: #222222;
}

/* Interaction states
----------------------------------*/
.ui-state-default, .ui-widget-content .ui-state-default,
	.ui-widget-header .ui-state-default {
	border: 1px solid #3399FF;
	background: #3399FF 50% 50% repeat-x;
	font-weight: normal;
	color: #5c9dc4;
}

.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited
	{
	color: #3399FF;
	text-decoration: none;
}

.ui-state-hover a, .ui-state-hover a:hover {
	color: #3399FF;
	text-decoration: none;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active
	{
	border: 1px solid #3399FF;
	background: #3399FF 50% 50% repeat-x;
	font-weight: normal;
	color: #3399FF;
}

.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited
	{
	color: #3399FF;
	text-decoration: none;
}

.ui-widget :active {
	outline: none;
}

.ui-slider {
	position: relative;
	text-align: left;
}

.ui-slider .ui-slider-handle {
	position: absolute;
	z-index: 2;
	width: 12px;
	height: 12px;
	cursor: e-resize;
}

.ui-slider .ui-slider-range {
	position: absolute;
	z-index: 1;
	font-size: .7em;
	display: block;
	border: 0;
	background-position: 0 0;
}

.ui-slider-horizontal {
	height: .8em;
}

.ui-slider-horizontal .ui-slider-handle {
	top: -.3em;
	margin-left: -.6em;
}

.ui-slider-horizontal .ui-slider-range {
	top: 0;
	height: 100%;
}

.ui-slider-horizontal .ui-slider-range-min {
	left: 0;
}

.ui-slider-horizontal .ui-slider-range-max {
	right: 0;
}

.ui-slider-vertical {
	width: .8em;
	height: 100px;
}

.ui-slider-vertical .ui-slider-handle {
	left: -.3em;
	margin-left: 0;
	margin-bottom: -.6em;
}

.ui-slider-vertical .ui-slider-range {
	left: 0;
	width: 100%;
}

.ui-slider-vertical .ui-slider-range-min {
	bottom: 0;
}

.ui-slider-vertical .ui-slider-range-max {
	top: 0;
}
</style>
<style type="text/css">
#thelayer {
	width: 450px;
	height: 150px;
	border: #E4F5FD 1px solid;
	left: 500px;
	top: 30px;
	z-index: 2;
	position: absolute;
	background: #FFFFFF;
	display: none;
}

/* #MapHistory
        {
            width: 450px;
            height: 150px;
            border: #E4F5FD 1px solid;
            left: 500px;
            top: 200px;
            z-index: 2;
            position: absolute;
            background: #FFFFFF;
            display: none;
        } */
</style>
<script type="text/javascript">
	function CPos(x, y) {
		this.x = x;
		this.y = y;
	}
	function GetObjPos(ATarget) {
		var target = ATarget;
		var pos = new CPos(target.offsetLeft, target.offsetTop);

		var target = target.offsetParent;
		while (target) {
			pos.x += target.offsetLeft;
			pos.y += target.offsetTop;

			target = target.offsetParent
		}

		return pos;
	}
	function showlayer(obj) {
		pos = GetObjPos(obj);
		l = document.getElementById("thelayer");
		l.style.left = pos.x + 40;
		l.style.top = pos.y + 40;
		l.style.display = "block";
	}

	//        function ShowHistory(obj) {
	//            pos = GetObjPos(obj);
	//            l = document.getElementById("MapHistory");
	//            l.style.left = pos.x + 40;
	//            l.style.top = pos.y + 40;
	//            l.style.display = "block";
	//        }
</script>
</head>
<body style="overflow: hidden;">
	<form method="post" id="form1">
		<div>
			<div id="divEventList"
				style="border: 1px solid rgb(204, 204, 204); width: 370px; display: none; position: absolute; z-index: 9999; left: 1545px; top: 744px; height: 450px;">
				<input id="hidMapType" runat="server" type="hidden" />
				<div id="divEventListHead"
					style="background-color: #EFEFEF; height: 25px;">
					<table width="100%" border="0">
						<tbody>
							<tr>
								<td><b> <script type="text/javascript">
									writePage(allPage.event);
								</script> 事件记录
								</b></td>
								<td width="30"><img src="images/iw_min.gif" border="0"
									onclick="showEventListDiv(0);" style="cursor: pointer;">
									<img src="images/iw_max.gif" border="0"
									onclick="showEventListDiv(1);" style="cursor: pointer;">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="divEventListInfo"
					style="height: 425px; background-color: white; overflow-y: auto; display: block;">
					<table id="tblEvent" width="100%" border="0" cellspacing="0"
						cellpadding="2" class="tab">
						<thead>
							<tr style="background: #F5F5F5; height: 25">
								<th width="40"></th>
								<th>开始时间</th>
								<th>结束时间</th>
								<th>持续时间</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div
				style="background-color: #CCCCCC; z-index: 9999; position: absolute; height: 30px; width: 100%;">
				<table border="0">
					<tbody>
						<tr>
							<td width="380px">&nbsp;&nbsp;<span id="lblTargetName"></span>
								&nbsp; <script type="text/javascript">
									//                                writePage(playbackPage.from);
								</script> <%--<input name="txtStartDate" type="text" value="2014-08-19 09:28" id="txtStartDate" class="Wdate" 
                            onclick="WdatePicker({lang:'zh-cn',el:$dp.$('txtStartDate'),dateFmt:'yyyy-MM-dd HH:mm'})">--%>
								<select id="sltDate" onchange='testDatePicker($(this))'>
									<option value="1" selected="selected">最近3小时</option>
									<option value="2">最近6小时</option>
									<option value="3">最近半天</option>
									<option value="4">最近1天</option>
									<option value="6">其它时间</option>
							</select> <input type="text" id="hdDate"
								style="visibility: hidden; position: absolute; top: 0px; left: 0px; z-index: 100;" />
								<div id="ShowDate1"
									style="visibility: hidden; position: absolute; top: 3px; left: 110px;">
									从:<input type="text" name="txtStartDate" id="txtStartDate"
										style="width: 110px"
										onclick="WdatePicker({lang:'zh-cn',el:$dp.$('ShowDate'),dateFmt:'yyyy-MM-dd HH:mm'})" />
									到:<input type="text" name="txtEndDate" id="txtEndDate"
										style="width: 110px"
										onclick="WdatePicker({lang:'zh-cn',el:$dp.$('ShowDate2'),dateFmt:'yyyy-MM-dd HH:mm'})" />
								</div> &nbsp;<script type="text/javascript">
									//                                      writePage(playbackPage.to);
								</script>
								<%--<input name="txtEndDate" type="text" value="2014-08-19 14:28" id="txtEndDate"
                                class="Wdate" onclick="WdatePicker({lang:'zh-cn',el:$dp.$('txtEndDate'),dateFmt:'yyyy-MM-dd HH:mm'})">--%>
								<input type="text" id="hdDate2"
								style="visibility: hidden; position: absolute; top: 0px; left: 150px; z-index: 100;" />
							</td>
							<td>
								<div onclick="showlayer(this)" style="cursor: pointer;">
									详细设置</div>
								<div id="thelayer">
									<table>
										<tr>
											<td>地图类型：</td>
											<td><select style="width: 100px">
													<option value="Baidu Map" selected="selected">Baidu
														Map</option>
											</select></td>
											<td>显示LBS</td>
											<td><input type="checkbox" value=""
												onclick="checkShowLBS(this.checked);" /></td>
										</tr>
										<tr>
											<td>设备居中：</td>
											<td><input type="checkbox" /></td>
											<td>显示点：</td>
											<td><input type="checkbox" /></td>
										</tr>
										<tr>
											<td>过滤漂移：</td>
											<td><input type="checkbox" /></td>
											<td>过滤速度：</td>
											<td><input id="SpeedFilter" type="text" /></td>
										</tr>
										<tr>
											<td>超速设置：</td>
											<td><input type="text" /></td>
										</tr>
									</table>
									<br />
									<div class="frmbottom" style="text-align: center">
										<a class="l-btn" href="javascript:void(0)"
											onclick="javascript:$('#thelayer').hide();"> <span
											class="l-btn-left"> <img
												src="/Themes/Images/cancel.png" alt=""
												style="vertical-align: middle;" />&nbsp;&nbsp;关 闭
										</span></a>
									</div>
								</div> <%-- <div id="MapHistory">
                                <table>
                                    <tr>
                                        <td>
                                            地图类型：
                                        </td>
                                        <td>
                                            <select style="width: 100px">
                                                <option value="Baidu Map" selected="selected">Baidu Map</option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                                <br />
                                <div class="frmbottom" style="text-align: center">
                                    <a class="l-btn" href="javascript:void(0)" onclick="javascript:$('#thelayer').hide();">
                                        <span class="l-btn-left">
                                            <img src="/Themes/Images/cancel.png" alt="" style="vertical-align: middle;" />&nbsp;&nbsp;关
                                            闭</span></a>
                                </div>
                            </div>--%>

							</td>
							<td>&nbsp;&nbsp;<input name="" id="btnPlay"
								onclick="serchLocation()" style="cursor: pointer;" type="button"
								value="播 放" /> <span id="spanMsg" style="color: Red;"></span>&nbsp;&nbsp;<input
								id="btnPause" style="cursor: pointer;" type="button" value="继 续"
								onclick="changePlay(0)" disabled="disabled" /> &nbsp;&nbsp;<input
								id="btnNext" type="button" value="暂 停" style="cursor: pointer;"
								onclick="changePlay(1)" disabled="disabled" />
							</td>
							<td>
								<table width="100%" border="0">
									<tbody>
										<tr>
											<td width="30"><script type="text/javascript">
												//                                                writePage(playbackPage.fast);
											</script> 快</td>
											<td width="125">
												<div id="PlaySpeed" style="height: 7px; width: 120px;"
													class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
													<a class="ui-slider-handle ui-state-default ui-corner-all"
														href="#" style="left: 0%;"> </a>
												</div>
											</td>
											<td><script type="text/javascript">
												//writePage(playbackPage.slow);
											</script> 慢 &nbsp;&nbsp;&nbsp; <%--<input type="checkbox" value="" onclick="checkShowLBS(this.checked);" />
                                            <script type="text/javascript">
                                                //writePage(playbackPage.showLBS);
                                            </script>
                                            显示LBS--%></td>
											<td><select name="select" id="selMap" runat="server"
												onchange="changeMap();">
													<option value="Google">谷歌地图</option>
													<option value="Baidu" selected="selected">百度地图</option>
													<option value="Gaode">高德地图</option>
													<%--<option  value="SouSou">搜搜地图</option>--%>
											</select></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>



			<div id="map_canvas"
				style="position: absolute; top: 28px; height: 744px; width: 1920px; overflow: hidden; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
			</div>
			<span id="spanMapPopupContentSize"></span> <input
				name="hidSpeedLimit" type="hidden" id="hidSpeedLimit" value="0.00" />
			<input name="hidUserID" type="hidden" id="hidUserID" value="2" />
			<%--<input name="hidDeviceID" type="hidden" id="hidDeviceID" value="6146" />--%>
			<input name="hidDeviceID" type="hidden" id="hidDeviceID"
				runat="server" /> <input name="hidPlateNo" type="hidden"
				id="hidPlateNo" runat="server" /> <input name="hidIcon"
				type="hidden" id="hidIcon" value="22" /> <input name="hidTimeZone"
				type="hidden" id="hidTimeZone" value="China Standard Time" /> <input
				name="hidDeviceName" type="hidden" id="hidDeviceName"
				value="LK200B-54141" /> <input type="hidden" id="hidBdate"
				runat="server" /> <input type="hidden" id="hidEdate" runat="server" />
			<input type="hidden" id="hidRequestSource" runat="server" />
		</div>
	</form>
</body>
</html>