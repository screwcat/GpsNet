<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$("#BeautifulGreetings").text(BeautifulGreetings());
	})
</script>
<style type="text/css">
.shortcuticons {
	TitleTxt float: left;
	border: solid 1px #fff;
	width: 62px;
	height: 55px;
	margin: 5px;
	padding: 5px;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	word-break: keep-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.shortcuticons:hover {
	color: #FFF;
	border: solid 1px #3399dd;
	background: #2288cc;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#33bbee',
		endColorstr='#2288cc');
	background: linear-gradient(top, #33bbee, #2288cc);
	background: -moz-linear-gradient(top, #33bbee, #2288cc);
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#33bbee),
		to(#2288cc));
	text-shadow: -1px -1px 1px #1c6a9e;
	width: 62px;
	height: 55px;
	font-weight: bold;
}
</style>
</head>
<body>
	<div class="box">
		<div class="box-title">
			<img src="${ctx}/img/sun_2.png" alt="" width="20" height="20" /> <label
				id="BeautifulGreetings"> </label> 管理员()
		</div>
		<div class="box-content">
			<div onclick="ClickShortcut('UserInfo')" class="shortcuticons">
				<img src="${ctx}/img/32/596.png" alt="" /><br /> 个人信息
			</div>
			<div onclick="ClickShortcut('LoginInfo')" class="shortcuticons">
				<img src="${ctx}/img/32/316.png" alt="" /><br /> 登录信息
			</div>
			<div onclick="ClickShortcut('Weather')" class="shortcuticons">
				<img src="${ctx}/img/32/367.png" alt="" /><br /> 天气预报
			</div>
			<div onclick="ClickShortcut('#','数据统计','Open')" class="shortcuticons">
				<img src="${ctx}/img/32/92.png" alt="" /><br /> 数据统计
			</div>
			<div onclick="ClickShortcut('#','文档管理','Open')" class="shortcuticons">
				<img src="${ctx}/img/32/193.png" alt="" /><br /> 文档管理
			</div>
			<div onclick="ClickShortcut('#','通讯录','Open')" class="shortcuticons">
				<img src="${ctx}/img/32/8.png" alt="" /><br /> 通讯录
			</div>
			<br /> <br /> <br /> <br /> <a href="javascript:void(0)"
				onclick="add_HomeShortcut()" class="button green"><span
				class="icon-botton"
				style="background: url('${ctx}/img/world_add.png') no-repeat scroll 0px 4px;">
			</span>添加新的快捷功能</a>
		</div>
	</div>
	<div class="blank10"></div>
	<div class="box">
		<div class="box-title">
			<img src="${ctx}/img/milestone.png" alt="" width="20" height="20" />当前登录情况（在线人数【】人）
		</div>
		<div class="box-content">
			<%-- 本月登录总数：6 次
            <br />
            本次登录IP：127.0.0.1<br />
            本次登录时间：2013-06-03 9:54:46<br />
            上次登录IP：127.0.0.1<br />
            上次登录时间：2013-06-03 9:54:19<br />
            <br />--%>
			<img src="${ctx}/img/exclamation_octagon_fram.png"
				style="vertical-align: middle; margin-bottom: 3px;" width="16"
				height="16" alt="tip" /> 提示：为了账号的安全，如果上面的登录情况不正常，建议您马上 <a
				href="javascript:void(0);" title="修改登录密码"
				style="text-decoration: underline; color: Blue;" onclick="editpwd()">密码修改</a>
		</div>
	</div>
	<div class="blank10"></div>
	
</body>
</html>