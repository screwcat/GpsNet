<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

	<table border="1" rules="all">
		<tr>
			<th>Id</th>
			<th>Imei</th>
			<th>AlarmType</th>
		</tr>
		<c:forEach items="${alarm.list}" var="alarm">
			<tr>
				<td>${alarm.id}</td>
				<td>${alarm.imei}</td>
				<td>${alarm.alarmtype}</td>
			</tr>
		</c:forEach>
	</table>
	<div>
		共${alarm.pages}页，共${alarm.total}条，当前是第${alarm.pageNumber}页
		<c:forEach items="${alarm.navigatePageNumbers}" var="PageNumber">
			[<a href=${PageNumber}>${PageNumber}</a>]
		</c:forEach>
	</div>
</body>
</html>