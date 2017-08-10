<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>区域查询</title>
<link rel="stylesheet" href="CSS/all.css" type="text/css" />
<link href="../Themes/Styles/Site.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/monitor.css" />
<link rel="stylesheet"
	href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css" />
<script id="MapSrc" src="http://api.map.baidu.com/api?v=1.3"
	type="text/javascript"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
<%--          <script type="text/javascript" src="http://api.map.baidu.com/getscript?v=1.3&amp;ak=&amp;services=&amp;t=20140506052717"></script>
          <link rel="stylesheet" type="text/css" href="http://api.map.baidu.com/res/13/bmap.css">--%>
<script type="text/javascript"
	src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
<script src="js/json2.js" type="text/javascript"></script>
<script src="JS/jquery-1.6.min.js" type="text/javascript"></script>
<script src="js/language02-zh-cn.js" type="text/javascript"></script>
<script type="text/javascript" src="/My97DatePicker/WdatePicker.js"></script>
<link href="/My97DatePicker/skin/WdatePicker.css" rel="stylesheet"
	type="text/css">
<script src="JS/Config.js?v=20130805" type="text/javascript"></script>
<%--<script src="js/IframeMap.js" type="text/javascript"></script>--%>
<script src="js/IframeMap-Baidu.js" type="text/javascript"></script>
<script src="JS/PublicMap.js" type="text/javascript"></script>
<%--<script src="js/PublicJS.js" type="text/javascript"></script>--%>
<%--<script src="js/Map.js" type="text/javascript"></script>--%>
<script src="JS/_.js" type="text/javascript"></script>
<script src="JS/initmap-Baidu.js" type="text/javascript"></script>
<script src="JS/Tracking-Baidu.js" type="text/javascript"></script>
<script src="JS/popupmarker-Baidu.js" type="text/javascript"></script>
<%--<script src="JS/Tracking.js" type="text/javascript"></script>--%>
<script src="../js/pageExtend.js" type="text/javascript"></script>
<script src="js/extend.js" type="text/javascript"></script>
<script src="js/AreaSearch.js" type="text/javascript"></script>
<style type="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow: hidden;
}

ul, li {
	margin: 0px;
	padding: 0px;
	list-style: none;
	font-size: 12px;
	font-family: 微软雅黑;
}

.container {
	
}
</style>
</head>
<body>
	<form id="form1" runat="server">
		<div class="container"
			style="padding-right: 25px; padding-bottom: 25px; background: #bbd4e8;">
			<div style="margin-left: 25px; height: 30px; line-height: 30px;">
				<ul>
					<li style="float: left; font-weight: bold;">区域查车</li>
					<li style="float: left; margin-left: 20px;">所在省<%--/直辖市/特区--%>
						<select id="sltProvince" onchange='changeProvince($(this).val())'>
							<option value="" selected="selected">请选择</option>
					</select> 所在市 <select id="sltCity"
						onchange='changeCity($("#sltProvince").val(), $(this).val())'>
							<option value="" selected="selected">请选择</option>
					</select> <%--所在区/县--%> <%--<select id="sltDistrict" onchange='changeDistrict()'>
                        <option id="sltCounty" value="" selected="selected">请选择</option>
                    </select>--%> 地名 <input type="text"
						id="txtPlaceName" onkeyup='changePosition()' />
					</li>
					<li style="float: left; margin-left: 10px;"><span>时间:</span> <input
						type="text" id="txtBdate" name="txtBdate"
<%-- 						value='<%=DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd HH:mm")%>' --%>
						onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm"})' /> <input
						type="text" id="txtEdate" name="txtEdate"
<%-- 						value='<%=DateTime.Now.ToString("yyyy-MM-dd HH:mm")%>' --%>
						onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm"})' /></li>
					<li style="float: left; margin-left: 20px;"><input
						type="button" id="btnSetLocation" value="查询" style="width: 60px;"
						onclick='searchArea()' /> <%--<a style="cursor: pointer;" onclick=''>查询</a>--%>
					</li>
					<li style="float: left; margin-left: 20px;"><input
						type="button" id="btnRectSearch" value="拉框选择" onclick='rectArea()'
						style="width: 80px;" /></li>
				</ul>
			</div>
			<div id="map_canvas"
				style="height: 100%; width: 100%; overflow: hidden; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
			</div>
		</div>
		<%--<input type="hidden" id="hidProvince" value='<%= jsonStr %>' />--%>
		<asp:HiddenField ID="hfProvince" runat="server" />
		<asp:HiddenField ID="hfCity" runat="server" />
		<asp:HiddenField ID="hfDeviceId" runat="server" />
	</form>
	<%--<div id="rectSearchPanel" style="position: absolute; top: 30px; left: 600px;">
        <input type="button" id="btnRectSearch" value="拉框选择" onclick='searchArea()' style="width: 80px;" />
    </div>--%>
	<div id="HistoryTbPanel"
		style="width: 300px; height: 525px; overflow: hidden; position: absolute; top: 30px; left: 0px; z-index: 100000; border: 1px solid rgb(56, 115, 201); background: #F5F5F5; display: none;">
		<div
			style="width: 100%; height: 25px; line-height: 25px; background-color: rgb(56, 115, 201); font-family: 微软雅黑;">
			<ul>
				<li style="float: left;">
					<h3 style="font-size: 12px; font-weight: bold; color: White;">车辆信息</h3>
				</li>
				<li style="float: right;"><img alt="关闭"
					src="../Themes/Images/cancel.png" style="cursor: pointer;"
					onclick='$("#HistoryTbPanel").hide();' /></li>
			</ul>
			<%--<ul>
                <li style="float: left;" style="font-size: 12px; font-weight: bold; color: White;">
                    车辆信息
                </li>
            </ul>--%>
		</div>
		<div style="width: 100%; height: 500px; overflow: hidden;">
			<table id="tbHistoryCtrl" border="0" cellspacing="0" cellpadding="0"
				class="grid" style="width: 282px;" singleselect="true">
				<thead>
					<tr style="background: #F5F5F5; font-family: 微软雅黑;">
						<td
							style="text-align: center; padding: 0px; color: #3873c9; width: 50% height: 25px;">
							车牌号</td>
						<td
							style="text-align: center; padding: 0px; color: #3873c9; width: 50% height: 25px;">
							轨迹回放</td>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
		</div>
	</div>
</body>
</html>