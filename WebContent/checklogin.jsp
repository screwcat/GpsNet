<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%
if(session.getAttribute("user")==null){
//用户没有登陆
	response.getWriter().write("<script defer>top.location='/GpsNet/login.jsp';</script>");
}
%>
</head>
<body>
</body>
</html>