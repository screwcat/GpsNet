<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$("html").css("overflow", "hidden");
		$("body").css("overflow", "hidden");
		iframeresize();
		Loading(true);
		$("#target_right").attr("src", "${ctx}/jsp/GPS/Playback.jsp");
		$("#target_left").attr("src", "${ctx}/jsp/GPS/MapPlayback/Playback_Left.jsp");
	})
	/**自应高度**/
	function iframeresize() {
		resizeU();
		$(window).resize(resizeU);
		function resizeU() {
			var iframeMain = $(window).height();
			$("#iframeMainContent").height(iframeMain);
		}
	}
</script>
</head>
<body>
	<div id="iframeMainContent">
		<div class="iframeleft" style="width: 230px;">
			<iframe id="target_left" name="target_left" scrolling="auto"
				frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>
		</div>
		<div class="iframeContent">
			<iframe id="target_right" name="target_right" scrolling="auto"
				frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>
		</div>
	</div>
</body>
</html>
