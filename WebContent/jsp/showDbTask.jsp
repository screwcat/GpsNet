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
	<form id="myForm">
		<div>
			<table class="new_table">
				<tr>
					<td>任务ID</td>
					<td>任务名称</td>
					<td>流程实例ID</td>
					<td>任务创建时间</td>
				</tr>
			<c:forEach items="${result}" var="task">
				<tr>
					<td>${task.id }</td>
					<td>${task.name }</td>
					<td>${task.processInstanceId }</td>
					<td>${task.createTime }</td>
				</tr>
			</c:forEach>
			</table>
		</div>
	</form>
</body>
<script type="text/javascript">
</script>
</html>
