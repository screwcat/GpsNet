<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head id="Head1" runat="server">
<title>联脉后台管理系统</title>
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/Menu.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<link href="${ctx}/js/ShowMsg/msgbox.css" rel="stylesheet"
	type="text/css" />
<script src="${ctx}/js/ShowMsg/msgbox.js" type="text/javascript"></script>
<link href="${ctx}/js/artDialog/skins/blue.css" rel="stylesheet"
	type="text/css" />
<script src="${ctx}/js/artDialog/artDialog.source.js"
	type="text/javascript"></script>
<script src="${ctx}/js/artDialog/iframeTools.source.js"
	type="text/javascript"></script>
<script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
<script src="${ctx}/js/pageExtend.js" type="text/javascript"></script>
<script src="${ctx}/js/MainFrame.js" type="text/javascript"></script>
<script type="text/javascript">
        $(function () {
            GetMenu();
            readyIndex();
            iframeresize();
            readyIndex();
        })
        //菜单
        var V_JSON = "";
        function GetMenu() {
        	$.ajax({
    			type: "POST",
    			url : "${ctx}/GetMenu",
    			data:{
    				userid:"48f3889c-af8d-401f-ada2-c383031af92d"
    			},
					datatype : "json",
					success : function(data) {
						$("#htmlMenuSelect").empty();

						V_JSON = eval(data);
						var j = 0;
						var css = "sel";
						for (var i = 0; i < V_JSON.length; i++) {
							var menu = V_JSON[i];
							if (menu.PARENTID == 0) {
								if (j == 0) {
									css = "selected";
									GetSeedMenu(this, menu.MENU_ID);
								} else {
									css = "";
								}
								$("#htmlMenuSelect")
										.append(
												"<div class=\""
														+ css
														+ "\" onclick=\"GetSeedMenu(this,'"
														+ menu.MENU_ID
														+ "')\"><img src='${ctx}/img/MenuLike.gif' />"
														+ menu.MENU_NAME
														+ "</div>");
								j++;
							}
						}

					},
					error : function(e) {
						//alert(e);
					}
				});
	}
	//子菜单
	function GetSeedMenu(e, menu_id) {
		$("#htmlMenuPanel").empty();
		var j = 0;
		for (var i = 0; i < V_JSON.length; i++) {
			var menu = V_JSON[i];
			if (menu.PARENTID == menu_id) {
				$("#htmlMenuPanel")
						.append(
								"<div onclick=\"NavMenu('${ctx}"
										+ "/"+menu.NAVIGATEURL
										+ "','"
										+ menu.MENU_NAME
										+ "')\"><img src=\"${ctx}/img/32/"
								+ menu.MENU_IMG + "\" />" + menu.MENU_NAME
								+ "</div>");
			}
		}
		readyIndex();
	}
</script>
</head>
<body>
	<form id="form1" runat="server">
		<div id="Container">
			<div id="Header">
				<div id="HeaderLogo"></div>
				<%--<div id="weather" title="点击链接淘宝店铺" onclick="window.open('http://www.taobao.com/');return false;">
                &nbsp;</div>--%>
				<div style="text-align: right">
					<img src="${ctx}/img/TitleTxt.gif" />
				</div>
			</div>
			<div id="Headerbotton">
				<div id="left_title">
					<img src="${ctx}/img/clock_32.png" alt="" width="20" height="20"
						style="vertical-align: middle; padding-bottom: 1px;" /> <span
						id="datetime"></span>
				</div>
				<div id="conten_title">
					<div style="float: left">
						<img src="${ctx}/img/networking.png" alt="" width="20"
							height="20" style="vertical-align: middle; padding-bottom: 1px;" />
						<span>当前位置</span>&nbsp;&nbsp;>>&nbsp;<span
							style="cursor: pointer;" onclick="windowload()">系统首页${ctx}</span> <span
							id="titleInfo" style="cursor: pointer;"></span>
					</div>
					<div id="toolbar" style="text-align: right; padding-right: 3px;">
						<img src="${ctx}/img/Max_arrow_left.png" title="后退" alt=""
							onclick="Loading(true);javascript:history.go(-1)" width="20"
							height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
						&nbsp;&nbsp;&nbsp;<img src="${ctx}/img/Max_arrow_right.png"
							title="前进" alt=""
							onclick="Loading(true);javascript:history.go(1)" width="20"
							height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
						&nbsp;&nbsp;&nbsp;<img src="${ctx}/img/refresh.png"
							title="刷新业务窗口" alt=""
							onclick="Loading(true);main.window.location.reload();return false;"
							width="20" height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
						&nbsp;&nbsp;&nbsp;<img src="${ctx}/img/4963_home.png"
							title="主页" alt="" onclick="rePage()" width="20" height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
						&nbsp;&nbsp;&nbsp;<img src="${ctx}/img/window-resize.png"
							title="最大化" alt="" onclick="Maximize();" width="20" height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
						&nbsp; &nbsp;<img src="${ctx}/img/button-white-stop.png"
							title="安全退出" alt="" onclick="IndexOut()" width="20" height="20"
							style="padding-bottom: 1px; cursor: pointer; vertical-align: middle;" />
					</div>
				</div>
			</div>
			<div id="MainContent">
				<div class="navigation" id="navigation" style="padding-top: 1px;">
					<div class="line"></div>
					<div class="box-title" style="font-weight: bold;">导航菜单</div>
					<div id="htmlMenuPanel" runat="Server" class="navPanelMini">
					</div>
					<div id="htmlMenuSelect" runat="Server" class="navSelect topline">
					</div>
				</div>
				<div id="Content">
					<iframe id="main" name="main" scrolling="auto" frameborder="0"
						scrolling="yes" width="100%" height="100%" src="${ctx}/jsp/Frame/HomeIndex.jsp"></iframe>
				</div>
			</div>
		</div>
		<div id="loading" onclick="Loading(false);">正在处理，请稍待。。。</div>
		<div id="Toploading"></div>
		<div id="fullreturn" title="还原" onclick="Fullrestore()"></div>
	</form>
</body>

</html>
