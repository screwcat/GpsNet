<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="${ctx}/jsp/GPS/js/language01-zh-cn.js?v=20130918"
	type="text/javascript"></script>
<title>Map</title>
<link rel="stylesheet" type="text/css"
	href="${ctx}/jsp/GPS/css/dialog.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/jsp/GPS/css/global.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/jsp/GPS/css/monitor.css" />
<link href="${ctx}/jsp/GPS/jquery-ui-1.11.1.custom/jquery-ui.min.css"
	rel="stylesheet" type="text/css" />
<link href="${ctx}/css/zTreeStyle/zTreeStyle.css" rel="stylesheet"
	type="text/css" />
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css"
	href="http://api.map.baidu.com/res/13/bmap.css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/easyui/jquery.easyui.min.js"
	type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/jquery-ui-1.11.1.custom/jquery-ui.min.js"
	type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/json2.js" type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/Valid.js?version=2"
	type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/PublicMap.js?v=20131228"
	type="text/javascript"></script>
<script src="${ctx}/jsp/GPS/js/PublicJS.js" type="text/javascript"></script>
<script src="${ctx}/css/zTreeStyle/jquery.ztree-2.6.js"
	type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/css/zTreeStyle/demoTools.js"></script>
<script src="${ctx}/jsp/GPS/js/Map.js?v=20140621" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/FunctionJS.js"></script>
<script src="${ctx}/js/pageExtend.js" type="text/javascript"></script>
<style type="text/css">
.divDeviceTab {
	background-color: #EFEFEF;
	border: 1px #A3D1E2 solid;
}

.showitems {
	position: absolute;
	left: 40px;
	top: 35px;
	width: auto;
	height: auto;
	background-color: White;
	display: none;
	font-size: 12px;
	z-index: 10000;
	border: 1px #C8C8C8 solid;
}

.cust_update {
	margin: 0 0 22px 10px;
}

.cust_update th {
	padding: 4px 8px;
	text-align: right;
}

.cust_update td {
	padding: 4px 3px;
}

.cust_update input.txt {
	width: 170px;
}

.cust_update input.txt_2 {
	width: 100%;
}

.cust_update .top {
	color: red;
}

.cust_update .type input {
	vertical-align: middle;
}

.cust_update .type label {
	padding: 0 8px 0 4px;
}

.cust_update .warning input {
	vertical-align: middle;
	margin-right: 4px;
}

.cust_update .submit .btn_x {
	float: left;
}

.cust_update .submit .btn_reset {
	float: left;
	margin: 6px 0 0 18px;
}

input.txt {
	border: 1px solid #cfcfcf;
	height: 24px;
	line-height: 24px;
	display: inline-block;
	padding: 0 6px;
}

.btnUpd {
	display: block;
}
</style>
<link href="${ctx}/js/zTreeStyle/zTreeStyle.css" rel="stylesheet"
	type="text/css" />
</head>
<body>
	<div id="panelListenInfo"
		style="position: absolute; width: 800px; height: auto; top: 0px; left: 300px; background-color: Silver;"></div>
	<span id="spanMapPopupContentSize" style="display: none;"></span>
	<div id="divSOSPhone" class="gm_dialog"
		style="width: 310px; height: 180px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<span id="span1">设置SOS号码</span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divSOSPhone');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanSOSDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right">SOS号码：</td>
						<td><input autocomplete="off" type="text" id="txtSOSPhone"
							class="txt"></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdPhone(0);">
								<button id="btnSendSOSPhone" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="btnCloseSOSPhone" onclick="closeDiv('divSOSPhone')"> 取消 </a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsgSOS"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divSetDevice2SMS" class="gm_dialog"
		style="width: 310px; height: 210px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<span id="span6">设备发送短信</span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divSetDevice2SMS');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanD2SMSDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right">请选择：</td>
						<td><select name="selD2SMSType" id="selD2SMSType">
								<option value="0">发送设备号码</option>
								<option value="1">发送当前位置</option>
						</select></td>
					</tr>
					<tr>
						<td align="right">接收手机：</td>
						<td><input autocomplete="off" type="text"
							id="txtDevice2SMSUserPhone" class="txt"></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdPhone(5);">
								<button id="btnSendD2SMS" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="btnCloseSendD2SMS" onclick="closeDiv('divSetDevice2SMS')">
								取消 </a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsgD2SMS"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divInterval" class="gm_dialog"
		style="width: 310px; height: 200px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<span id="span2"> <script type="text/javascript">
					writePage(mapPage.setDeviceUploadTime)
				</script> 设置设备上传间隔
				</span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divInterval');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanIntervalDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.type)
						</script> 类型:</td>
						<td><select id="selSetUploadTime">
								<option value="S7122">
									<script type="text/javascript">
										writePage(mapPage.setUploadMoveTime)
									</script> 运动上传频率
								</option>
								<option value="S7123">
									<script type="text/javascript">
										writePage(mapPage.setUploadStopTime)
									</script> 静止上传频率
								</option>
						</select></td>
					</tr>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(mapPage.uploadTime)
						</script> 上传间隔：</td>
						<td><input autocomplete="off" type="text" id="txtSetInterval"
							class="txt" style="width: 50px;" maxlength="4">(<script
								type="text/javascript">
								writePage(mapPage.danwei5s)
							</script>单位秒,最小5秒)</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdPhone(2);">
								<button id="btnInterval" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="btnCloseInterval" onclick="closeDiv('divInterval')"> 取消 </a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsgInterval"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divSendTxt" class="gm_dialog"
		style="width: 310px; height: 180px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<span id="span3">给设备下发文字信息</span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close" href="javascript:closeDiv('divSendTxt');">
					<img src="${ctx}/jsp/GPS/images/iw_close.gif">
				</a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanSendTxtDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right">文字内容：</td>
						<td><textarea id="txtSendTxtContent" class="txt"></textarea>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdPhone(3);">
								<button id="btnSendTxt" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="btnCloseSendTxt" onclick="closeDiv('divSendTxt')"> 取消 </a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsgTxt"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divCellPhone" class="gm_dialog"
		style="width: 310px; height: 260px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<span id="span4">设置亲情号码</span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divCellPhone');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanCellPhoneDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right">亲情号码1：</td>
						<td><input autocomplete="off" type="text" id="txtCellPhone1"
							class="txt"></td>
					</tr>
					<tr>
						<td align="right">亲情号码2：</td>
						<td><input autocomplete="off" type="text" id="txtCellPhone2"
							class="txt"></td>
					</tr>
					<tr>
						<td align="right">亲情号码3：</td>
						<td><input autocomplete="off" type="text" id="txtCellPhone3"
							class="txt"></td>
					</tr>
					<tr style="">
						<td align="right">亲情号码4：</td>
						<td><input autocomplete="off" type="text" id="txtCellPhone4"
							class="txt"></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdPhone(1);">
								<button id="btnCellPhone" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="btnCloseCellPhone" onclick="closeDiv('divCellPhone')"> 取消
						</a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsgCellPhone"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divMenuLeftImg" onclick="showHideLeft();"
		onmouseover="overMenuLeft();" onmouseout="outMenuLeft();"
		style="position: absolute; width: 11px; height: 53px; background-position: 33px; left: 260px; z-index: 9999; top: 165px;">
	</div>
	<div id="divDevicesList"
		style="border: 1px solid rgb(56, 115, 201); display: block; width: 1165px; position: absolute; z-index: 9999; margin-left: 0px; top: 526px; height: 200px; left: 265px; display: none;">
		<div id="divDevicesListHead"
			style="background-color: #E0ECFF; margin: 1px; height: 22px; color: black;">
			<table width="100%" border="0">
				<tbody>
					<tr>
						<td><b> <script type="text/javascript">
							writePage(mapPage.deviceDetailList);
						</script> <%--设备详细信息列表--%>
						</b></td>
						<td width="30" style="text-align: right;"><a
							style="cursor: pointer; display: block; float: right; width: 16px; height: 16px; background: url(${ctx}/jsp/GPS/images/accordion_arrows.png) no-repeat 0px 0px; margin-top: 3px;"
							onclick='showDevicesListDiv(resizeState)'></a></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id="divDevicesListInfo"
			style="height: 175px; margin: 1px; background-color: white; overflow: hidden;">
			<div>
				<table cellpadding="0" cellspacing="0"
					style="height: 18px; margin: 0px;">
					<tr>
						<td
							style="font-weight: bold; padding-right: 0px; width: 75px; text-align: right;">
							查询设备信息</td>
						<td class="tc"><select id="sltCondition"
							onchange='likeSearch(event, $("#tbRealTimeCtrl"), "gpsInfoArrStr", $(this).val(), $("#txtCondition").val())'>
								<option value="PlateNo" selected="selected">车牌号</option>
								<option value="imei">设备号</option>
								<option value="SimNo">Sim卡号</option>
						</select></td>
						<td class="tc"><input id="txtCondition" type="text" value=""
							style="width: 200px;"
							onkeyup='likeSearch(event, $("#tbRealTimeCtrl"), "gpsInfoArrStr", $("#sltCondition").val(), $(this).val())' />
						</td>
						<td class="tc" style="width: 100px;"></td>
					</tr>
				</table>
			</div>
			<table id="tbRealTimeCtrl" border="0" cellspacing="0" cellpadding="0"
				class="grid" style="width: 1504px;" singleselect="true">
				<thead>
					<tr height="25" style="background: #F5F5F5;">
						<td style="text-align: center; width: 60px; padding: 0px;">
							车牌号</td>
						<td style="text-align: center; width: 80px; padding: 0px;">
							Sim卡号</td>
						<td style="text-align: center; width: 120px; padding: 0px;">
							设备序列号</td>
						<td style="text-align: center; width: 114px; padding: 0px;">
							超速限制(km/h)</td>
						<td style="text-align: center; width: 94px; padding: 0px;">
							速度(km/h)</td>
						<td style="text-align: center; width: 36px; padding: 0px;">
							方向</td>
						<td style="text-align: center; width: 72px; padding: 0px;">
							总里程(km)</td>
						<td style="text-align: center; width: 180px; padding: 0px;">
							状态</td>
						<td style="text-align: center; width: 48px; padding: 0px;"
							class="watch">打表状态</td>
						<td style="text-align: center; width: 120px; padding: 0px;">
							定位时间</td>
						<td style="text-align: center; width: 120px; padding: 0px;">
							到达时间</td>
						<td style="text-align: center; padding: 0px;">地址</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div class="gm_dialog" id="divCommandList"
		style="width: 800px; height: 420px; margin-top: 10px; overflow: auto; margin-left: 560px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<label id="lbldivCommandListTitle"> 查询指令记录</label>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divCommandList');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div id="divCommandListTable" style="margin-top: 10px;"></div>
	</div>
	<div class="gm_dialog" id="divIframe"
		style="width: 552px; left: 30%; height: 368px; top: 10px;">
		<div id="divIframeTitle" class="gm_dialog_head" style="cursor: move;">
			<div class="gm_dialog_title">
				<span id="spanIframeTitle"></span>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close" href="javascript:closeDiv('divIframe');">
					<img src="${ctx}/jsp/GPS/images/iw_close.gif">
				</a>
			</div>
		</div>
		<div>
			<iframe frameborder="0" id="ifmPage" src="" width="550"></iframe>
		</div>
	</div>
	<div class="gm_dialog" id="divInputPass"
		style="width: 310px; height: 220px; margin-top: 80px; margin-left: 805px;">
		<div class="gm_dialog_head">
			<div class="gm_dialog_title">
				<label id="lblInputPassTitle"> </label>
			</div>
			<div class="gm_dialog_func">
				<a class="gm_dialog_close"
					href="javascript:closeDiv('divInputPass');"> <img
					src="${ctx}/jsp/GPS/images/iw_close.gif"></a>
			</div>
		</div>
		<div style="margin-top: 10px;">
			<table class="cust_update">
				<tbody>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.device)
						</script> 设备 ：</td>
						<td><span id="spanPassDeviceName"></span></td>
					</tr>
					<tr>
						<td align="right"><script type="text/javascript">
							writePage(allPage.password)
						</script> 密码 ：</td>
						<td><input autocomplete="off" type="password"
							id="txtInputpassword" class="txt"></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><script
								type="text/javascript">
							writePage(mapPage.sendConfirm);
						</script> 发指令前请再次确认登录账号 <span id="spanUserName">体验用户</span> <script
								type="text/javascript">
							writePage(loginPage.password)
						</script> 密码</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="btn-submit" onclick="sendCmdInfo();">
								<button id="sendBtn" type="button">确定</button>
						</span>&nbsp;<a href="javascript:void(0);" style="color: Black;"
							id="closeBtn" onclick="closeDiv('divInputPass')"> 取消 </a></td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 25px"><span
							id="spanSendMsg"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div id="divLeftMenu"
		style="position: absolute; line-height: 1.0; width: 95px; height: auto; background-color: White; display: none; font-size: 12px; z-index: 9999; border: 1px #C8C8C8 solid;">
		<div id="divLeftMenuContext" style="font-size: 11px;"></div>
	</div>
	<div id="divLeftSearchDevices"
		style="position: absolute; width: 218px; height: 180px; overflow: auto; background-color: White; display: none; margin-top: 215px; margin-left: 10px; z-index: 9999; border: 1px #C8C8C8 solid;">
		<table width="100%" border="0">
			<tbody>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(3772,'GRTQ-02213','Offline')">
					<td>GRTQ-02213</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(5200,'HY-51477','Offline')">
					<td>HY-51477</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(5262,'GRTQ-53588','LoggedOff')">
					<td>GRTQ-53588</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(5441,'LK200B-52799','Offline')">
					<td>LK200B-52799</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(6146,'LK200B-54141','Offline')">
					<td>LK200B-54141</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(6385,'LK200B-52437','LoggedOff')">
					<td>LK200B-52437</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10464,'TQ-01093','LoggedOff')">
					<td>TQ-01093</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10827,'TQ-01528','Offline')">
					<td>TQ-01528</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10952,'TQ-01653','Offline')">
					<td>TQ-01653</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10957,'TQ-01658','Offline')">
					<td>TQ-01658</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10960,'TQ-01661','Offline')">
					<td>TQ-01661</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10964,'TQ-01665','Offline')">
					<td>TQ-01665</td>
				</tr>
				<tr style="cursor: pointer;"
					onclick="searchTableClk(10966,'TQ-01667','Offline')">
					<td>TQ-01667</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div id="divLeft"
		style="width: 265px; display: block; float: left; background-color: rgb(160, 177, 197); height: 548px;">
		<!-- 用户树 -->
		<div class="mod-userTree" id="selectCustTitle" style="display: block;">
			<div class="com-titlebar"
				onclick='toggleCustTree(event, $("#deptShowName_Div"), $(this).next())'>
				<h3 id="deptShowName_Div" style="cursor: pointer;">
					<span id="lblUserName">客户</span>
				</h3>
			</div>
			<div>
				<div
					style="width: 100%; height: 200px; overflow-y: auto; background-color: #FFFFFF;">
					<ul id="tree" class="tree"
						style="width: 230px; height: auto; overflow: auto;">
						<asp:DropDownList ID="DropDownList1" runat="server"
							AutoPostBack="True">
						</asp:DropDownList>
					</ul>
				</div>
				<div class="expand" onmousedown="" style="height: 6px;">
					<img src="${ctx}/jsp/GPS/images/tree_uclose_04.gif">
				</div>
			</div>
		</div>
		<div class="mod-prolist">
			<div id="myProlistTitle" class="com-titlebar">
				<h3>
					<script type="text/javascript">
						writePage(allPage.myDevice)
					</script>
					<%--我的设备--%>
				</h3>
			</div>
			<!-- 设备搜索： -->
			<div class="searchcvs" style="padding: 0px;">
				<div class="ctnr" style="background:;">
					<div style="float: left;">
						<select id="sltVehicleCond" style="width: 62px;"
							onchange='likeSearch(event, $("#tbMyDevice"), "gpsInfoArrStr", $(this).val(), $("#txtSearchInput").val())'>
							<option value="PlateNo" selected="selected">车牌号</option>
							<option value="imei">设备号</option>
							<option value="SimNo">Sim卡号</option>
						</select> <input autocomplete="off" id="txtSearchInput" type="text"
							value="请输入车牌号/设备名/Sim卡号" class="searchinput"
							style="width: 164px; border: 1px solid gray;"
							onfocus='$(this).focusEvent("请输入车牌号/设备名/Sim卡号")'
							onblur='$(this).blurEvent("请输入车牌号/设备名/Sim卡号")'
							onkeyup='likeSearch(event, $("#VehicleList table:last"), "gpsInfoArrStr", $("#sltVehicleCond").val(), $(this).val())'>
					</div>
					<div class="suggest"></div>
				</div>
			</div>
			<!-- 过滤按钮 -->
			<div class="navigate" id="myNavigate" style="font-weight: bold;">
				<ul>
					<li class="navigate_item navigate_item_over"
						style="margin: 0px; padding: 0px;"><span class="r"><a
							id="aAll" href="javascript:;"
							onclick="showDeviceList('aAll', $('#VehicleList table:last'));"
							hidefocus=""> <script type="text/javascript">
								writePage(allPage.all);
							</script> (<span id="allCountSpan"><span id="spanDevicesAll">0</span></span>)
						</a></span></li>
					<li class="navigate_item" style="margin: 0px; padding: 0px;"><span
						class="r"><a id="aOnline" href="javascript:;"
							onclick="showDeviceList('aOnline', $('#VehicleList table:last'));"
							hidefocus=""> <script type="text/javascript">
								writePage(allPage.online);
							</script> (<span id="spanDevicesOnline">0</span>)
						</a></span></li>
					<li class="navigate_item" style="margin: 0px; padding: 0px;"><span
						class="r"><a id="aOffline" href="javascript:;"
							onclick="showDeviceList('aOffline', $('#VehicleList table:last'));"
							hidefocus=""> <script type="text/javascript">
								writePage(allPage.offline);
							</script> (<span id="spanDevicesOffline">0</span>)
						</a></span></li>
				</ul>
			</div>
			<!--列表容器-->
			<div id="VehicleList"
				style="position: absolute; background-color: #FFFFFF; overflow: hidden; white-space: nowrap; height: 64%; width: 261px; border: 1px solid #8398B5;">
				<table id="tbMyDevice" class="grid" cellpadding="0" cellspacing="0"
					style="width: 100%;">
					<thead>
						<tr>
							<td style="text-align: center; width: 25px;"></td>
							<td style="text-align: center;">车牌号</td>
							<td style="text-align: center; width: 94px;">速度(km/h)<br />
							</td>
							<td style="text-align: center; width: 60px;">状态</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div style="float: left; width: 2px;">&nbsp;</div>
	<div id="mapPanel" style="float: left; width: 645px; height: 100%;">
		<iframe frameborder="0" name="ifmMap" id="ifmMap" scrolling="no"
			style="overflow: hidden; height: 100%; width: 1645px;"
			src="${ctx}/jsp/GPS/IframeMap.jsp?id=2&amp;n=888&amp;m=Baidu">
		</iframe>
	</div>
	<div id="infoInAreaPanel"
		style="width: 200px; height: 100px; background: silver; position: absolute; display: none;">
		123456<br /> 123456<br /> 123456<br /> 123456<br /> 123456<br />
		123456<br /> 123456<br />
	</div>
	<input name="hidUserID" type="hidden" id="hidUserID" value="2" />
	<input name="hidLoginName" type="hidden" id="hidLoginName" value="888" />
	<input name="hidUserName" type="hidden" id="hidUserName" value="体验用户" />
	<input name="hidStatus" type="hidden" id="hidStatus" value="-1" />
	<input name="hidTimeZone" type="hidden" id="hidTimeZone"
		value="China Standard Time" />
	<input name="hidIframeSrc" type="hidden" id="hidIframeSrc"
		value="${ctx}/jsp/GPS/IframeMap.jsp?id=2&amp;n=888&amp;m=Baidu" />
	<input name="hidLanguage" type="hidden" id="hidLanguage" value="zh-cn" />
	<%-- 			<input id="hidComs" type="hidden" value='<%=NodesData%>' /> --%>

	<script type="text/javascript">
		function ifmUpdateClose(id) {
			$("#" + id).hide();
			if (id == "divIframe") {
				$("#ifmPage").attr("src", "");
			}
		}
	</script>
</body>
</html>