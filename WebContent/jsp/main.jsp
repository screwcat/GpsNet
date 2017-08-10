<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@include file="common/common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My test page</title>
<!-- 包含头部信息用于适应不同设备 -->
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<form id="a">
		<div class="container" style="margin-top: 1%;">
			<div class="row">
				<div class="col-md-3">
					<div class="input-group input-group-sm">
						<span class="input-group-addon" id="sizing-addon1">用户名:</span>
						<input type="text" name="username" class="form-control" placeholder="用户名" aria-describedby="sizing-addon1" style="width:200px;"/>
					</div>
				</div>
				<div class="col-md-9">
					<div class="input-group input-group-sm">
						<span class="input-group-addon" id="sizing-addon1">　密码:</span>
						<input type="text" name="password" class="form-control" placeholder="密码" aria-describedby="sizing-addon1" style="width:200px;"/>	
						<input type="button" onclick="useradd()"  class="btn btn-primary" value="提交" style="margin-left: 10px;"/>
						<input type="button" onclick="getAllUser()"  class="btn btn-primary" value="查寻" />				
					</div>
				</div>
			</div>
			<div class="table-responsive" style="margin-top: 20px;">
			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th style="width: 10%;">用户编号</th>
						<th style="width: 40%;">用户名</th>
						<th style="width: 40%;">用户密码</th>
						<th style="width: 10%;">删除</th>
					</tr>
				</thead>
				<tbody id="users">
				</tbody>
			</table>
			</div>
		</div>
	</form>
</body>
<script type="text/javascript">
	function useradd() {
		$.ajax({
			type: "POST",
			url : "${ctx}/login/adduser.do",
			data:{
				username:$("input[name=username]").val(),
				password:$("input[name=password]").val()
			},
			datatype : "json",
			success : function(data) {
				alert(data.msg);
				$("#users tr").remove();//移除所有的数据行 
				for(var i=0;i<data.result.length;i++){
					$("#users").append("<tr><td>"+data.result[i].user_id+"</td>"+
							"<td>"+data.result[i].user_name+"</td>"+
							"<td>"+data.result[i].pass_word+"</td>"+
							"<td><a href='javascript:void(0)' onclick='delUser("+ data.result[i].user_id +")'>删除</a></td></tr>"
							);
				}
	
			},
			error:function(){
				alert(1111);
				alert(data.msg);
			}
		});
	}
	function getAllUser() {
		$.ajax({
			type: "POST",
			url : "${ctx}/login/getAllUser.do",
			datatype : "json",
			success : function(data) {
				$("#users tr").remove();//移除所有的数据行 
				for(var i=0;i<data.result.length;i++){
					$("#users").append("<tr><td>"+data.result[i].user_id+"</td>"+
							"<td>"+data.result[i].user_name+"</td>"+
							"<td>"+data.result[i].pass_word+"</td>"+
							"<td><a href='javascript:void(0)' onclick='delUser("+ data.result[i].user_id +")'>删除</a></td></tr>"
							);
				}
	
			},
			error:function(){
				alert(1111);
			}
		});
	}
	function delUser(user_id){
		$.ajax({
			type: "POST",
			url : "${ctx}/login/deleteUser.do",
			data:{
				user_id:user_id
			},
			datatype : "json",
			success : function(data) {
				alert(data.msg);
				$("#users tr").remove();//移除所有的数据行 
				for(var i=0;i<data.result.length;i++){
					$("#users").append("<tr><td>"+data.result[i].user_id+"</td>"+
							"<td>"+data.result[i].user_name+"</td>"+
							"<td>"+data.result[i].pass_word+"</td>"+
							"<td><a href='###' onclick='delUser("+ data.result[i].user_id +")'>删除</a></td></tr>"
							);
				}
	
			},
			error:function(){
				alert(1111);
			}
		});
	}
	function changePage(){
		$("#a").attr("action","${ctx}/login/goProcessManager.do");
		$("#a").submit();
	}
	function leaveProStart(){
		$("#a").attr("action","${ctx}/login/leaveProStart.do");
		$("#a").submit();
	}
	function getDbTask(){
		$("#a").attr("action","${ctx}/login/getDbTask.do");
		$("#a").submit();
	}
</script>
</html>
