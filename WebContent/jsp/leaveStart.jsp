<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@include file="common/common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My test page</title>
<style type="text/css">
	.new_table{border-left: 1px solid #e3e3e3;border-top:  1px solid #e3e3e3;};
	.new_table td{border-bottom: 1px solid #e3e3e3;border-right: 1px solid #e3e3e3; padding-left: 5px;};
</style>
</head>
<body>
	<form id="myForm" method="post">
		<div>
			<div><span>开始时间：</span><input type="text" name="startDate"></div>
			<div><span>结束时间：</span><input type="text" name="endDate"></div>
			<div><span>原因：</span><input type="text" name="reason"></div>
			<div><input type="button" value="提交" onclick="startPro()"/></div>
		</div>
	</form>
</body>
<script type="text/javascript">	
	function startPro(){
		$("#myForm").attr("action","${ctx}/login/startLeavePro.do");
		$("#myForm").submit();
	}

</script>
</html>
