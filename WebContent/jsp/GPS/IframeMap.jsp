<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>地图内嵌</title>
<script type="text/javascript">
	var runIndex = 0, secondTimer;
	function runMap() {
		if (runIndex == 0) {
			var id = '2';
			var n = '888';
			var m = 'Baidu';
			if (m == "Google") {
				location.href = "IframeMap.aspx?id=" + id + "&n=" + n
						+ "&m=OSM";
			} else {
				location.href = "IframeMap.aspx?id=" + id + "&n=" + n
						+ "&m=Baidu";
			}
		}
	}
</script>
<link rel="stylesheet" href="${ctx}/jsp/GPS/css/all.css" type="text/css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/jsp/GPS/css/monitor.css" />
<link rel="stylesheet"
	href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css"
	id="linkMap" runat="server" />
<link href="${ctx}/css/Site1.css" rel="stylesheet" type="text/css" />

<script src="${ctx}/jsp/GPS/js/jquery-1.6.min.js" type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/jquery.easydrag.js"
	type="text/javascript"></script>
<%-- <%=SbJs.ToString()%> --%>
<script src="${ctx}/js/pageExtend.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$("#spanSecond").html(30);
		$("#disSecond").hide();
	});
</script>
<script src="${ctx}/jsp/GPS/js/language01-zh-cn.js?v=20130918"
	type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/language02-zh-cn.js?v=20130918"
	type="text/javascript"></script>
<style type="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}

ul, li {
	margin: 0px;
	padding: 0px;
	list-style: none;
}
</style>
</head>
<body style="overflow: hidden;">
	<form method="post"
		action="IframeMap.jsp?id=2&amp;n=888&amp;p=6432272401" id="form1">
		<div id="divMapTool"
			style="position: absolute; width: 118px; height: 17px; border: 1px #000000 solid; z-index: 999999; top: 30px; right: 450px;">
			<img src="images/zoomIn.gif" onclick="zoomIn();" border="0"
				width="16" height="16" title="放大" style="cursor: pointer;"> <img
				src="images/split.gif" width="2"> <img
				src="images/zoomOut.gif" onclick="zoomOut();" border="0" width="16"
				height="16" title="缩小" style="cursor: pointer;"> <img
				src="images/split.gif" width="2"> <img src="images/ruler.gif"
				onclick="mapDistance();" border="0" width="16" height="16"
				title="测距" style="cursor: pointer;"> <img
				src="images/split.gif" width="2"> <img src="images/full.gif"
				onclick="mapFull();" border="0" width="16" height="16" title="全国"
				style="cursor: pointer;"> <img src="images/split.gif"
				width="2"> <img src="images/clean.gif" onclick="mapClear();"
				border="0" width="16" height="16" title="清除"
				style="cursor: pointer;">
		</div>

		<div id="disSecond"
			style="position: absolute; width: 210px; height: 15px; background-color: White; margin-left: 70px; font-size: 12px; margin-top: 30px; z-index: 999;">
			<span id="spanSecond" style="color: Red;"></span>
			<script type="text/javascript">
				writePage(trackingPage.secondMsg);
			</script>
			<%--秒后刷新! --%>
		</div>
		<div id="IntervalTime"
			style="position: absolute; right: 10px; bottom: 10px; z-index: 100; background-color: White"></div>
		<div id="divLeftMenu"
			style="position: absolute; width: 95px; height: auto; background-color: White; display: none; font-size: 12px; z-index: 9999; border: 1px #C8C8C8 solid;">
			<div id="divLeftMenuContext" style="font-size: 11px;"></div>
		</div>
		<div
			style="z-index: 99999; height: 25px; position: absolute; width: 100%; background-color: White;">
			<table width="100%" border="0">
				<tbody>
					<tr>
						<td width="60%">
							<div id="divMarkerAddress"
								style="background-color: White; font-size: 12px;">
								<input type="text" id="txtSearchPosition" value="请输入位置"
									class="searchinput"
									style="float: left; vertical-align: middle; border: 1px solid #ccc; margin: 0px 10px 0px 0px;"
									onfocus='$(this).focusEvent("请输入位置")'
									onblur='$(this).blurEvent("请输入位置")'
									onkeydown='javascript:if (event.keyCode == 13) { return false;}'
									onkeyup='$(this).keyupEvent(event, 13, $("#lbtnSearchPosition"), "click")' />
								<%--<select id="sltType" style="float: left; margin-top: 0px;">
                                <option value="当前" selected="selected">
                                    当前
                                </option>
                                <option value="历史">
                                    历史
                                </option>
                            </select>--%>
								<%--<a id="lbtnSearchPosition" style="cursor: pointer;" onclick='$(this).searchPosition($("#txtSearchPosition"), "^$|^请输入位置$", "请输入位置！")'>
                                <span style="display: block; float: left; width: 25px; height: 20px; 
                                    background: url(${ctx}/img/searchMap.png) no-repeat center center;">
                                </span>
                                <span style="display: block; float: left; width: auto; height: 20px; line-height: 20px; margin: 0px 10px 0px 0px;">
                                    查询
                                </span>
                            </a>--%>
								<a id="lbtnSearchPosition" style="cursor: pointer;"
									onclick='$(this).searchPosition($("#txtSearchPosition").val(), $.trim($("#selMap").val()))'>
									<span
									style="display: block; float: left; width: 25px; height: 20px; background: url(${ctx}/img/searchMap.png) no-repeat center center;">
								</span> <span
									style="display: block; float: left; width: auto; height: 20px; line-height: 20px; margin: 0px 10px 0px 0px;">
										定位 </span>
								</a> <a id="lbtnSearchArea" style="cursor: pointer;"
									onclick='searchArea()'> <span
									style="display: block; float: left; width: 25px; height: 20px; background: url(${ctx}/img/searchMap.png) no-repeat center center;">
								</span> <span
									style="display: block; float: left; width: auto; height: 20px; line-height: 20px; margin: 0px 10px 0px 0px;">
										区域查询 </span>
								</a> <a id="lbtnFreshMap" style="cursor: pointer;"> <span
									style="display: block; float: left; width: 25px; height: 20px; background: url(${ctx}/img/reloadMap.png) no-repeat center center;">
								</span> <%--<span style="display: block; float: left; width: auto; height: 20px; line-height: 20px; margin: 0px 0px 0px 0px;" 
                                    onclick='$(this).reload()'>
                                    刷新
                                </span>--%> <span
									style="display: block; float: left; width: auto; height: 20px; line-height: 20px; margin: 0px 0px 0px 0px;"
									onclick='refreshAtIframe()'<%-- onclick='location="IframeMap.aspx?m="+$.trim($("#selMap").val());' --%>>
										刷新 </span>
								</a>
							</div>
						</td>
						<td style="width: 80px;"><select name="select" id="selMap"
							onchange="changeMap();">
								<option value="Baidu" selected="selected">百度地图</option>
								<option value="Google">谷歌地图</option>
								<option value="Gaode">高德地图</option>
								<option value="soso">搜搜地图</option>
								<%--<option value="OSM">OpenStreetMap</option>--%>
								<%--<option value="MapABC">MapABC</option>--%>
						</select></td>
						<td><a id="lbtnSetBMapCenter" style="cursor: pointer;"
							onclick='setBMapCenter()'> <span
								style="display: block; float: left; height: 20px; line-height: 20px; margin-left: 10px">
									<img src="${ctx}/img/16/world_go.png"
									style="vertical-align: middle;" /> 将当前位置设为地图中心
							</span>
						</a></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id="map_canvas"
			style="border: 0px solid rgb(204, 204, 255); width: 100%; position: absolute; overflow: hidden; top: 20px; height: 100%; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;"></div>

		<span id="spanMapPopupContentSize"></span> <input name="hidLanguage"
			type="hidden" id="hidLanguage" value="zh-cn"> <input
			name="hidLoginName" type="hidden" id="hidLoginName" value="888">
		<input name="hidSelMap" type="hidden" id="hidSelMap" value="Baidu"
			runat="server"> <input name="hidStatus" type="hidden"
			id="hidStatus" value="-1"> <input name="hidUserID"
			type="hidden" id="hidUserID" value="2"> <input
			name="hidTimeZone" type="hidden" id="hidTimeZone"
			value="China Standard Time">
	</form>

	<div id="areaListPanel"
		style="width: 550px; height: 225px; overflow: hide; position: absolute; top: 30px; left: 0px; z-index: 100000; border: 1px solid rgb(56, 115, 201); background: #F5F5F5; display: none;">
		<div id="areaDragPanel">
			<div id="areaListHead"
				style="width: 100%; height: 25px; line-height: 25px; background-color: rgb(56, 115, 201); font-family: 微软雅黑;">
				<ul>
					<li style="float: left;">
						<h3 style="font-size: 12px; font-weight: bold; color: White;">车辆信息</h3>
					</li>
					<li style="float: right;"><img alt="关闭"
						src="${ctx}/img/cancel.png" style="cursor: pointer;"
						onclick='$("#areaListPanel").hide();' /></li>
				</ul>
			</div>
			<div style="width: 550px; height: 200px; overflow: auto;">
				<table id="tbRealTimeCtrl" border="0" cellspacing="0"
					cellpadding="0" class="grid" style="width: 608px;"
					singleselect="true">
					<thead>
						<tr height="25" style="background: #F5F5F5; font-family: 微软雅黑;">
							<td style="text-align: center; width: 30px; padding: 0px;">
								序号</td>
							<td style="text-align: center; width: 100px; padding: 0px;">
								车牌号</td>
							<%--<td style="text-align: center; width: 80px; padding: 0px;">
                                Sim卡号
                            </td>
                            <td style="text-align: center; width: 120px; padding: 0px;">
                                设备序列号
                            </td>--%>
							<%--<td style="text-align: center; width: 48px; padding: 0px;">
                                超速限制
                            </td>--%>
							<td style="text-align: center; width: 40px; padding: 0px;">
								速度</td>
							<td style="text-align: center; width: 36px; padding: 0px;">
								方向</td>
							<%--<td style="text-align: center; width: 72px; padding: 0px;">
                                总里程(公里)
                            </td>--%>
							<td style="text-align: center; width: 58px; padding: 0px;">
								在线状态</td>
							<td style="text-align: center; width: 48px; padding: 0px;"
								class="watch">打表状态</td>
							<%--<td style="text-align: center; width: 120px; padding: 0px;">
                                定位时间
                            </td>
                            <td style="text-align: center; width: 120px; padding: 0px;">
                                到达时间
                            </td>--%>
							<td style="text-align: center; padding: 0px;">地址</td>
							<%--<th style="text-align: center; border-top: 1px dotted #ccc; border-right: 1px dotted #ccc;">
                                纬度
                            </th>
                            <th style="text-align: center; border-top: 1px dotted #ccc; border-right: 1px dotted #ccc;">
                                经度
                            </th>--%>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>