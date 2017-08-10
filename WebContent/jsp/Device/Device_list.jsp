<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<%@ include file="/checklogin.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="${ctx}/js/jquery.pullbox.js" type="text/javascript"></script>
<script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
<script type="text/javascript">
	function serch_onclick() {

	}

	function LockConfig(url, parm) {
		showConfirmMsg('注：您确认要锁定这台设备吗？', function(r) {
			if (r) {
				getAjax(url, parm, function(rs) {
					if (parseInt(rs) > 0) {
						showTipsMsg("锁定成功！", 2000, 4);
						windowload();
					} else if (parseInt(rs) == 0) {
						showTipsMsg("锁定失败，0 行受影响！", 3000, 3);
					} else {
						showTipsMsg(
								"<span style='color:red'>锁定失败，请稍后重试！</span>",
								4000, 5);
					}
				});
			}
		});
	}

	function UnLockConfig(url, parm) {
		showConfirmMsg('注：您确认要解锁这台设备吗？', function(r) {
			if (r) {
				getAjax(url, parm, function(rs) {
					if (parseInt(rs) > 0) {
						showTipsMsg("解锁成功！", 2000, 4);
						windowload();
					} else if (parseInt(rs) == 0) {
						showTipsMsg("解锁失败，0 行受影响！", 3000, 3);
					} else {
						showTipsMsg(
								"<span style='color:red'>解锁失败，请稍后重试！</span>",
								4000, 5);
					}
				});
			}
		});
	}
</script>
<script type="text/javascript">
	//回车键
	document.onkeydown = function(e) {
		if (!e)
			e = window.event; //火狐中是 window.event
		if ((e.keyCode || e.which) == 13) {
			var obtnSearch = document.getElementById("lbtSearch");
			obtnSearch.click();
		}
	}
	$(function() {
		// 		$(".div-body").PullBox({
		// 			dv : $(".div-body"),
		// 			obj : $("#table1").find("tr")
		// 		});
		divresize(90);
		FixedTableHeader("#table1", $(window).height() - 118);
	})
	//添加
	function add() {
		var url = "${ctx}/jsp/Device/Device_Form.jsp";
		top.openDialog(url, 'DeviceForm', '设备信息 - 添加', 450, 150, 50, 50);
	}
	//修改
	function edit() {
		var key = CheckboxValue();
		if (IsEditdata(key)) {
			var url = "${ctx}/jsp/Device/Device_Edit.jsp?action=edit&Id=" + key;
			top.openDialog(url, 'DeviceForm', '设备信息 - 编辑', 450, 150, 50, 50);
		}
	}
	//删除
	function Delete() {
		var key = CheckboxValue();
		if (IsDelData(key)) {
			var delparm = 'action=devicedelete&module=Device&tableName=Base_DeviceInfo&pkName=DId&Id='
					+ key;
			delConfig('${ctx}/Delete_Device', delparm)
		}
	}
	//导入        
	function inport() {
		var url = "/ImportExport/Import.aspx?action=ImportDevice";
		top.openDialog(url, 'Import', '设备信息 - 导入', 700, 700, 50, 50);
	}
	//导出
	function Export() {
		document.getElementById("btnInputExcel").click()
	}
	//分配设备
	function allotDevice() {
		var key = CheckboxValue();
		if (IsEditdata(key)) {
			var url = "${ctx}/jsp/Device/AllotDevice.jsp?key=" + key;
			top.openDialog(url, 'DeviceForm', '设备信息 - 分配设备', 1200, 700, 50, 50);
		}
	}
	//刷新
	function refresh() {
		parent.main.location.reload();
	}
	//锁定
	function lock() {
		//var data = CheckboxValue();
		//var strArr = data.split(",", 2);
		//var key = strArr[0];
		var key = CheckboxValue();
		var oper = 0;
		if (IsEditdata(key)) {
			var delparm = 'action=LockOrUnlockDevice&Id=' + key + "&oper="
					+ oper;
			LockConfig('${ctx}/Delete_Device', delparm)
		}
	}
	//解锁
	function Unlock() {
		//var data = CheckboxValue();
		//var strArr = data.split(",", 2);
		//var key = strArr[0];
		var key = CheckboxValue();
		var oper = 1;
		if (IsEditdata(key)) {
			var delparm = 'action=LockOrUnlockDevice&Id=' + key + "&oper="
					+ oper;
			UnLockConfig('${ctx}/Delete_Device', delparm)
		}
	}
</script>
<style type="text/css">
.paginator a {
	color: #286231;
	border: 1px solid #85efe9;
	background-color: #75a7db;
	margin: 0px 4px;
	padding: 3px 8px;
	line-height: 10px;
	height: 10px;
	font-size: 14px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	background: -moz-linear-gradient(top, white, #75a7db 100%);
	background: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff),
		to(#75a7db));
	text-decoration: none;
}

.paginator a:hover {
	color: rgb(215, 157, 206);
	background: -moz-linear-gradient(top, #75a7db, white 100%);
	background: -webkit-gradient(linear, 0 0, 0 100%, from(#75a7db),
		to(#ffffff));
	background-color: rgb(218, 88, 99);
}

.paginator .disabledpage:hover, .easypager .disabledpage {
	color: #ddd;
	border: 1px dashed #ddd;
	background: #fff;
}

.paginator .easypagerCurrpage {
	font-size: 14px;
	color: #8d3525;
	margin: 0px 4px;
	padding: 3px 8px;
	line-height: 10px;
	height: 10px;
	font-size: 14px;
}
</style>
</head>
<body>
	<form id="form1">
		<div class="btnbartitle">
			<div>设备管理信息列表</div>
		</div><%@include file="../common/common.jsp"%>
		<div class="btnbarcontetn">

			<div style="float: left;">
				<select id="Searchwhere" class="Searchwhere">
					<option value="imei">设备序列号</option>
					<option value="PlateNo">车牌号码</option>
					<option value="SimNo">SIM卡号</option>
				</select> <input type="text" id="txt_SearchNew" class="txtSearch SearchImg"
					style="width: 120px; float: right; height:21px; margin-top: 3px; border: solid 1px #565656;" />
			</div>

			<input type="button" ID="btnInputExcel" Text="导出Excel" type="hidden"
				Style="height: 22px; display: none;" /> 
				&nbsp;<input type="button" ID="btnSearch"
				value="查 询" Style="height: 21px; margin-top: 3px; border: solid 1px #565656;"/>
			<%-- 			<%=this.dr.Info%>||<%=this.sReq%> --%>
		</div>
		<div class="div-body">
			<div id="ToExcel" style="border: 0;" runat="server">
				<table id="table1" class="grid" singleselect="true">
					<thead>
						<tr>
							<td style="width: 20px;"><label id="Label1"
								onclick="CheckAllLine()" title="全选"> &nbsp;</label></td>
							<td style="text-align: center; width: 130px;">设备序列号</td>
							<td style="text-align: center; width: 130px;">车牌号码</td>
							<td style="text-align: center; width: 130px;">流量卡号</td>
							<td style="text-align: center; width: 130px;">车主电话</td>
							<td style="text-align: center; width: 130px">激活时间</td>
							<td style="text-align: center; width: 130px;">过期时间</td>
							<td style="text-align: center; width: 130px;">设备型号</td>
							<td style="text-align: center; width: 130px">是否安装</td>
							<td style="text-align: center; width: 130px">是否锁定</td>
							<td style="text-align: center; width: 130px">是否授权</td>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${Device.list}" var="device">
							<tr>
								<td style="width: 20px; text-align: left;"><input
									type="checkbox" value="${device.id}" name="checkbox" /></td>
								<td style="width: 130px; text-align: left;">${device.imei}</td>
								<td style="width: 130px; text-align: center;">${device.plateno}
								</td>
								<td style="width: 130px; text-align: center;">${device.simno}
								</td>
								<td style="width: 130px; text-align: center;">${device.carphone}
								</td>
								<td style="width: 130px; text-align: center;">${device.cdate}
								</td>
								<td style="width: 130px; text-align: center;">${device.udate}
								</td>
								<td style="width: 130px; text-align: center;">${device.tcpprotocol}
								</td>
								<td style="width: 130px; text-align: center;">
								<c:choose>
										<c:when test="${device.isinstall==0}">否</c:when>
										<c:otherwise>是</c:otherwise>
								</c:choose>
								</td>
								<td style="width: 130px; text-align: center;">
								<c:choose>
									<c:when test="${device.islocked==0}">是</c:when>
									<c:otherwise>否</c:otherwise>
									</c:choose>
								</td>
								<td>
								<c:choose>
									<c:when test="${device.isauthorization==0}">否</c:when>
									<c:otherwise>是</c:otherwise>
									</c:choose>
								</td>
							</tr>
						</c:forEach>

					</tbody>
				</table>
			</div>
			<div>
				<div id="AspNetPager1" class="paginator"
					pageindexboxtype="DropDownList" showpageindexbox="Always"
					textafterpageindexbox="页" textbeforepageindexbox="转到"
					layouttype="Table" style="height: 20px; white-space: nowrap;">
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						style="height: 20px;">
						<tbody>
							<tr>
								<td valign="bottom" align="notset" nowrap="true"><c:forEach
										items="${Device.navigatePageNumbers}" var="PageNumber">
										<a class="paginator" href="${PageNumber}"
											style="margin-right: 5px;">${PageNumber}</a>
									</c:forEach></td>
								<td class="paginators" valign="bottom" align="left"
									nowrap="true" style="width:;">第${Device.pageNumber}页，共${Device.pages}页，每页30条，共${Device.total}条记录</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</form>
</body>
</html>
