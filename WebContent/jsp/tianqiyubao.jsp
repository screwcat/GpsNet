<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@include file="common/common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My test page</title>
</head>

<body>
	<form id="a">
		<div>
		 	<h4>天气预报</h4>
		 	<div>
		 		<span>省份：</span><select id="province" ><option>--请选择--</option></select>
		 		<span>地区：</span><select id="city" ><option>--请选择--</option></select>
		 		<input type="button" value="查询"  onclick="getWeather()"/>
		 	</div>
		 	<div id="showTqInfo"></div>
		</div>
	</form>
</body>
<script type="text/javascript">
	$(function(){
		$.ajax({
			type: "POST",
			url : "${ctx}/tqyb/getRegionProvince.do",
			datatype : "application/xml ",
			success : function(data) {
				for(var i=0;i<data.list.length;i++){
					var element = data.list[i].split(",");
					$("#province").append("<option value='"+element[1]+"'>"+element[0]+"</option>");
				}
			},
			error:function(){
				alert(1111);
			}
		});
		
		$("#province").change(function(){
			$.ajax({
			type: "POST",
			url : "${ctx}/tqyb/getSupportCityString.do",
			data:{
				"cityId":$(this).val()
			},
			datatype : "application/xml ",
			success : function(data) {
				$("#city").empty();
				$("#city").append("<option>--请选择--</option>");
				for(var i=0;i<data.list.length;i++){
					var element = data.list[i].split(",");
					$("#city").append("<option value='"+element[1]+"'>"+element[0]+"</option>");
				}
			},
			error:function(){
				alert(1111);
			}
		});
		});
	});
	
	function getWeather(){
			$.ajax({
			type: "POST",
			url : "${ctx}/tqyb/getWeather.do",
			data:{
				"cityId":$("#city").val()
			},
			datatype : "application/xml ",
			success : function(data) {
				$("#showTqInfo").empty();
				for(var i=0;i<data.list.length;i++){
					var element = data.list[i].split(".");
					if(element[1]=="gif"){
						$("#showTqInfo").append("<div><img  src='${ctx}/img/tqyb/"+data.list[i]+"'/></div>");
					}else{
						$("#showTqInfo").append("<div><h4>"+data.list[i]+"</h4></div");
					}
				}
			},
			error:function(){
				alert(1111);
			}
		});
	}
</script>
</html>
