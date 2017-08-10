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
	<form id="a" method="post" enctype="multipart/form-data">
		<div>
			<input type="file" id="upfile" name="upfile"/><input type="button" value="部署" onclick="deploy()"/><input type="button" value="查询" onclick="getDeployedPro()"/>
		</div>
		<div>
			<table id="table" class="new_table">
				<tr>
					<td>流程定义ID</td>
					<td>部署ID</td>
					<td>流程定义名称</td>
					<td>流程定义KEY</td>
					<td>版本号</td>
					<td>XML资源名称</td>
					<td>图片资源名称</td>
					<td>操作</td>
				</tr>
			</table>
		</div>
	</form>
</body>
<script type="text/javascript">	
	var resultData;
	function deploy(){
		$("#a").attr("action","${ctx}/login/deploy.do");
		$("#a").submit();
	}
	function getDeployedPro(){
		$.ajax({
			type : "post",
			dataType : "json",
			url : "${ctx}/login/getDeployedPro.do",
			success : function(data) {
				resultData = data.result;
				$("#table tr:gt(0)").remove();//移除所有的数据行 
				for(var i=0;i<data.result.length;i++){
					$("#table").append("<tr>"+
							"<td>"+data.result[i].id+"</td>"+
							"<td>"+data.result[i].deploymentId+"</td>"+
							"<td>"+data.result[i].name+"</td>"+
							"<td>"+data.result[i].key+"</td>"+
							"<td>"+data.result[i].version+"</td>"+
							"<td><a href='#' onclick='getXmlData("+i+")'>"+data.result[i].resourceName+"</a></td>"+
							"<td><a href='#' onclick='getPngData("+i+")'>"+data.result[i].diagramResourceName+"</a></td>"+
							"<td><a href='#' onclick='deleteFlow("+i+")'>删除</a></td></tr>");
				}
			},
			error : function() {
				alert("失败！！");
			}
		});
	}
	function getXmlData(i){
		$("#a").attr("action","${ctx}/login/readResource.do?pdid="+resultData[i].id+"&resourceName="+resultData[i].resourceName);
		$("#a").submit();
	}
	function getPngData(i){
		$("#a").attr("action","${ctx}/login/readResource.do?pdid="+resultData[i].id+"&resourceName="+resultData[i].diagramResourceName);
		$("#a").submit();
	}
	function deleteFlow(i){
		$.ajax({
			type : "post",
			dataType : "json",
			url : "${ctx}/login/deleteFlow.do",
			data:{"deploymentId":resultData[i].deploymentId},
			success : function(data) {
				if(data.msg=="1"){
					alert("流程删除成功");
				}
			},
			error : function() {
				alert("失败！！");
			}
		});
	}
</script>
</html>
