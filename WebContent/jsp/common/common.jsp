<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
</head>
<!-- css -->
<link href="${ctx}/css/bootstrap.min.css" rel="stylesheet">
<!-- js -->
<script type="text/javascript" src="${ctx}/js/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery-1.9.1.min.js"></script>
<body>
	<div style="float: right;">
		<a title="新 增" onclick="add();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/add.png') no-repeat scroll 0px 4px;"></span>新
			增<iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></a><a
			title="编 辑" onclick="edit();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/edit.png') no-repeat scroll 0px 4px;"></span>编
			辑</a><a title="删 除" onclick="Delete();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/delete.png') no-repeat scroll 0px 4px;"></span>删
			除</a><a title="导 入" onclick="inport();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/page_refresh.png') no-repeat scroll 0px 4px;"></span>导
			入</a><a title="导出Excel" onclick="Export();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/page_white_excel.png') no-repeat scroll 0px 4px;"></span>导
			出</a><a title="分配设备" onclick="allotDevice();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/car_start.png') no-repeat scroll 0px 4px;"></span>分配设备</a><a
			title="刷 新" onclick="refresh();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/20130406015709810_easyicon_net_16.png') no-repeat scroll 0px 4px;"></span>刷
			新</a><a title="锁 定" onclick="lock();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/lock.png') no-repeat scroll 0px 4px;"></span>锁
			定</a><a title="解锁" onclick="Unlock();" class="button green"><span
			class="icon-botton"
			style="background: url('../../img/16/201208041220.png') no-repeat scroll 0px 4px;"></span>解锁</a>
	</div>
</body>
</html>
