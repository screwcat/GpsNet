<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录页面</title>
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/login.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
<script type="text/javascript">
	window.onload = function() {
		getCookie("userName");
	}

	//回车键
	document.onkeydown = function(e) {
		if (!e)
			e = window.event; //火狐中是 window.event
		if ((e.keyCode || e.which) == 13) {
			var obtnSearch = document.getElementById("Log_Submit")
			obtnSearch.focus(); //让另一个控件获得焦点就等于让文本输入框失去焦点
			obtnSearch.click();
		}
	}
	//初始化
	$(function() {
		$("#txtCode").bind('keyup', function() {
			if ($("#txtCode").val().length == 4) {
				return CheckUserDataValid();
			}
		})
	})
	function LoginBtn() {
		var name = $("#txtUserName").val();
		var pwd = $("#txtUserPwd").val();
		var code = $("#txtCode").val();
		$("#errorMsg0").html("");
		$("#errorMsg1").html("");
		$("#errorMsg2").html("");
		if (name == "") {
			$("#txtUserName").focus();
			$("#errorMsg0").html("账户不能为空");
			return false;
		} else if (pwd == "") {
			$("#txtUserPwd").focus();
			$("#errorMsg1").html("密码不能为空");
			return false;
		} else if (code == "") {
			$("#txtCode").focus();
			$("#errorMsg2").html("验证码不能为空");
			return false;
		} else {
			return true;
		}
	}
	/**
	数据验证完整性
	 **/
	function CheckUserDataValid() {
		if (!LoginBtn()) {
			return false;
		} else {
			CheckingLogin(1);
			var userName = $("#txtUserName").val();
			var userPwd = $("#txtUserPwd").val();
			var code = $("#txtCode").val();
			addCookie("userName", userName, 72)
			var parm = 'action=login&user_Account=' + escape(userName)
					+ '&userPwd=' + escape(userPwd) + '&code=' + escape(code);
			getAjax('${ctx}/login', parm, function(rs) {
				if (parseInt(rs) == 1) {
					$("#txtCode").focus();
					$("#errorMsg2").html("验证码输入不正确");
					CheckingLogin(0);
					ToggleCode("Verify_codeImag",
							'${ctx}/code');
					return false;
				} else if (parseInt(rs) == 2) {
					$("#txtUserName").focus();
					$("#errorMsg0").html("账户被锁,联系管理员");
					CheckingLogin(0);
					return false;
				} else if (parseInt(rs) == 4) {
					$("#txtUserName").focus();
					$("#errorMsg0").html("账户或密码有错误");
					CheckingLogin(0);
					return false;
				} else if (parseInt(rs) == 6) {
					$("#txtUserName").focus();
					$("#errorMsg0").html("该用户已经登录");
					CheckingLogin(0);
					return false;
				} else if (parseInt(rs) == 3) {
					setInterval(Load, 1000);
				} else {
					CheckingLogin(0);
					alert('服务器连接不上,联系管理员！');
					window.location.href = window.location.href
							.replace('#', '');
					return false;
				}
			});
		}
	}
	function addCookie(objName, objValue, objHours) {//添加cookie
		var str = objName + "=" + escape(objValue);
		if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
			var date = new Date();
			var ms = objHours * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			str += "; expires=" + date.toGMTString();
		}
		document.cookie = str;
		//alert("添加cookie成功");
	}
	function getCookie(objName) {
		var arrStr = document.cookie.split("; ");
		for (var i = 0; i < arrStr.length; i++) {
			var temp = arrStr[i].split("=");
			if (temp[0] == objName)
				//return unescape(temp[1]);
				document.getElementById("txtUserName").value = unescape(temp[1]);
		}
	}
	//登陆加载
	function Load() {
		window.location.href = 'jsp/Frame/MainFrame.jsp';
		return false;
	}
	//清空
	function resetInput() {
		$("#txtUserName").focus(); //默认焦点
		$("#txtUserName").val("");
		$("#txtUserPwd").val("");
	}
	function CheckingLogin(id) {
		if (id == 1) {
			$("#Log_Submit").attr("disabled", "disabled")
			$("#Log_Submit").attr("class", "signload");
			$(".load").show();
		} else {
			$("#Log_Submit").attr("disabled", "")
			$("#Log_Submit").attr("class", "sign");
			$(".load").hide();
		}
	}
</script>
</head>
<body style="padding-top: 167px">
	<form id="form1" runat="server">
		<div class="boxLogin">
			<dl>
				<dd>
					<div class="s1">账&nbsp;&nbsp;&nbsp;户：</div>
					<div class="s2">
						<input type="text" id="txtUserName" value="" class="txt"
							style="width: 122px;" /> <span id="errorMsg0" class="errorMsg"></span>
					</div>
				</dd>
				<dd>
					<div class="s3">密&nbsp;&nbsp;&nbsp;码：</div>
					<div class="s4">
						<input type="password" id="txtUserPwd" value="" class="txt"
							onpaste="return false;" style="width: 122px;" />&nbsp;<span
							id="errorMsg1" class="errorMsg"></span>
					</div>
				</dd>
				<dd>
					<div class="s5">验证码：</div>
					<div class="s6">
						<input type="text" id="txtCode" maxlength="4" class="txt"
							style="ime-mode: disabled; width: 48px;" /> <img
							src="${ctx}/code" id="Verify_codeImag"
							width="70" height="22" alt="点击切换验证码" title="点击切换验证码"
							style="margin-top: 0px; vertical-align: top; cursor: pointer;"
							onclick="ToggleCode(this.id, '${ctx}/code');return false;" />
						<span id="errorMsg2" class="errorMsg"></span>
					</div>
				</dd>
				<dd>
					<div class="load">
						<img src="img/loading.gif" />
					</div>
				</dd>
			</dl>
			<div class="s8">
				<input id="Log_Submit" type="button" class="sign"
					onclick="return CheckUserDataValid();" />
			</div>
		</div>
		<div class="copyright">
			<p id="cp">最佳浏览环境：IE8.0～10.0或基于IE内核的浏览器，1280×800显示分辨率。</p>
		</div>
	</form>
</body>
</html>