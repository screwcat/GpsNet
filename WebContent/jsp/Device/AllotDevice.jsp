<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html>
<html>
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <%--  <link href="/Themes/Styles/Site.css" rel="stylesheet" type="text/css" />--%>
    <script src="${ctx}/js/zTreeStyle/jquery-1.4.2.js" type="text/javascript"></script>
    <script src="${ctx}/js/zTreeStyle/jquery.ztree-2.6.js" type="text/javascript"></script>
    <script type="text/javascript" src="${ctx}/js/zTreeStyle/demoTools.js"></script>
    <link href="${ctx}/js/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
    <script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
    <link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/css/Alloted.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        //未分配设备模糊查询
        function Data1() {
            var deviceId = document.getElementById("txt_SearchNew1").value;
            var Url = "/Ajax/Common_Ajax.ashx?action=getAllUnAllotDev&deviceId=" + deviceId;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    if (result != null) {
                        dt = eval(result);
                        UnAllotData(dt);
                    }
                }
            });
        }
        //初始化表格信息，重新绘制表格
        function UnAllotData(dt) {
            var tempHtml = "";
            if (dt != null) {
                var rsum = dt.length;
                if (rsum > 0) {
                    for (var i = 0; i < rsum; i++) {
                        var vinfo = dt[i];
                        tempHtml += "<tr>";
                        tempHtml += "<td width='20' align='left'><input type='checkbox' value='" + vinfo.Id + "' name='checkbox' /></td>";
                        tempHtml += "<td style=\"width: 140px; text-align: center;\">  " + vinfo.imei + " </td>";
                        tempHtml += "<td style=\"width: 131px; text-align:center\">  " + vinfo.tcpProtocol + " </td>";
                        tempHtml += "</tr>";
                    }
                    //document.getElementById("unAlloted").innerHTML = tempHtml;
                    $("#unAlloted").html(tempHtml);
                }
                else {
                    tempHtml += "<tr><td colspan='8' style='color:red;text-align:center'>没有找到您要的相关数据！</td></tr>";
                    $("#unAlloted").html(tempHtml);
                }
            }
        }

    </script>
    <script type="text/javascript">
        //已分配设备模糊查询
        function Data2() {
            var colName = jQuery('#Searchwhere2 option:selected').val();
            var colValue = document.getElementById("txt_SearchNew2").value;
            var Url = "/Ajax/Common_Ajax.ashx?action=GetDeviceInfo&columname=" + colName + "&colvalue=" + colValue;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    if (result != null) {
                        dt = eval(result);
                        AllotData(dt);
                    }
                }
            });
        }
        //初始化表格信息,重新绘制表格
        function AllotData(dt) {
            var tempHtml = "";
            if (dt != null) {
                var rsum = dt.length;
                if (rsum > 0) {
                    for (var i = 0; i < rsum; i++) {
                        var vinfo = dt[i];
                        tempHtml += "<tr>";
                        tempHtml += "<td width='20px' align='left'><input type='checkbox' value='" + vinfo.Id + "' name='checkbox' /></td>";
                        tempHtml += "<td style=\"width: 80px; text-align: left;\">  " + vinfo.imei + " </td>";
                        tempHtml += "<td style=\"width: 80px; text-align: center;\">" + vinfo.PlateNo + "</td>";
                        tempHtml += "<td style=\"width: 80px; text-align: center;\">" + vinfo.SimNo + "</td>";
                        tempHtml += "<td style=\"width: 80px; text-align: center;\">" + vinfo.CarPhone + "</td>";
                        tempHtml += "<td style=\"width: 80px; text-align: center;\">" + vinfo.tcpProtocol + "</td>";
                        tempHtml += "</tr>";
                    }
                    // document.getElementById("Alloted").innerHTML = tempHtml;
                    $("#Alloted").html(tempHtml);
                }
                else {
                    tempHtml += "<tr><td colspan='8' style='color:red;text-align:center'>没有找到您要的相关数据！</td></tr>";
                    $("#Alloted").html(tempHtml);
                }
            }
        }

    </script>
    <script type="text/javascript">
        //根据公司ID(cId)获取设备信息
        function getData(cId) {
            Url = "/Ajax/Common_Ajax.ashx?action=Loaddata&cId=" + cId;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    $("#Alloted").empty();
                    dt = eval(result);
                    AllotData(dt);
                }
            });
        }
        //添加设备
        function addDevice() {
            var arrt = new Array();
            arrt = CheckboxValue().split('|');
            var key = arrt[0];
            var dId = key;
            var cId = document.getElementById("hcId").value;
            var cname = document.getElementById("hdcName").value;
            //alert(cname);
            if (cId == "cId") {
                alert("请选择公司！");
                return;
            }
            else {
                var Url = "/Ajax/Common_Ajax.ashx?action=addDevice&cId=" + cId + "&dId=" + dId + "&cname=" + cname;
                $.ajax({
                    type: "Post",
                    url: Url,
                    data: "",
                    dataType: "json",
                    success: function (result) {
                        if (result != null) {
                            dt = eval(result);
                            Allot();
                            UnAllot();
                        }
                    }
                });
            }
        }
        //删除设备
        function subDevice() {
            var arrt = new Array();
            arrt = CheckboxValue().split('|');
            var key = arrt[0];
            var dId = key;
            var cId = document.getElementById("hcId").value;
            var cname = document.getElementById("hdcName").value;
            var Url = "/Ajax/Common_Ajax.ashx?action=subDevice&cId=" + cId + "&dId=" + dId + "&cname=" + cname;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    if (result != null) {
                        dt = eval(result);
                        Allot();
                        UnAllot();
                        if (cId == "cId") {
                            AllotAll();
                        }
                    }
                }
            });
        }
    </script>
    <script type="text/javascript">
        //获取某个公司全部已分配设
        function Allot() {
            var cId = document.getElementById("hcId").value;
            Url = "/Ajax/Common_Ajax.ashx?action=AllotData&cId=" + cId;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    $("#Alloted").empty();
                    dt = eval(result);
                    AllotData(dt);
                }
            });
        }

        //获取全部已分配设备
        function AllotAll() {
            Url = "/Ajax/Common_Ajax.ashx?action=AllotAllData";
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    $("#Alloted").empty();
                    dt = eval(result);
                    AllotData(dt);
                }
            });
        }

        //获取全部未分配设备
        function UnAllot() {
            Url = "/Ajax/Common_Ajax.ashx?action=UnAllotData";
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    $("#unAlloted").empty();
                    dt = eval(result);
                    UnAllotData(dt);

                }
            });
        }
    </script>
    <script type="text/javascript">
        var zTree;
		var demoIframe;

	    setting = {
		    isSimpleData: true,
		    treeNodeKey: "id",
		    treeNodeParentKey: "pId",
	
		callback: {
 
            expandSpeed: "",
			beforeClick: zTreeOnBeforeClick,
			click: zTreeOnClick
		}
		
	};

	
		
		$(document).ready(function(){
		reloadTree();

		 
	});
    	function zTreeOnBeforeClick(treeId, treeNode) {
  
	}
	
	function zTreeOnClick(event, treeId, treeNode) {
		if (treeNode) {
            var cId = treeNode.id;
            var cname = treeNode.name;
            document.getElementById("hdcName").value = cname;
            getData(cId);
            document.getElementById("hcId").value = cId;
		}
	}

     function reloadTree() {

		zTree = $("#tree").zTree(setting, clone(zNodes));
	}	
    </script>

    <script type="text/javascript">
        function SelDev() {
            var tcpProtocol = document.getElementById("Sel_Device").value;
            Url = "/Ajax/Common_Ajax.ashx?action=UnAllotData&tcpProtocol=" + tcpProtocol;
            $.ajax({
                type: "Post",
                url: Url,
                data: "",
                dataType: "json",
                success: function (result) {
                    $("#unAlloted").empty();
                    dt = eval(result);
                    UnAllotData(dt);

                }
            });
        }
    </script>

    <%--<script type="text/javascript">
        $(function () {
            //此demo通过Ajax加载分页元素
            var initPagination = function () {
                var num_entries = $("#hiddenresult div.result").length;
                // 创建分页
                $("#Pagination").pagination(num_entries, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page: 1, //每页显示1项
                    prev_text: "前一页",
                    next_text: "后一页"
                });
            };

            function pageselectCallback(page_index, jq) {
                var new_content = $("#hiddenresult div.result:eq(" + page_index + ")").clone();
                $("#Alloted").empty().append(new_content); //装载对应分页的内容
                return false;
            }
            //ajax加载
            $("#hiddenresult").load("/Ajax/Common_Ajax.ashx?action=UnAllotData&tcpProtocol=" + tcpProtocol, null, initPagination);
        });
    </script>--%>
</head>
<body style="font-size:12px;">
    <form id="form1" runat="server">
    <div class="box1">
        <div class="xiakuang">
            <div class="box001">
                <div class="box2">
                
                    
                        <div class="box7">
                            [未分配设备]</div>
                </div>
                <div class="box3" style="float: right;">
                    <div class="box31" style="width: 60px; height: 25px;">
                        <div class="box0003" style="float: right; line-height: 25px;">
                            客户列表</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w4">
        </div>
        <div class="box44">
            <div class="box4">
                <div class="box5">
                    <div class="box6">
                        <div class="box11">
                            <select id="Searchwhere1" class="Searchwhere1" style="width: 90px; margin-top: 3px;
                                margin-left: 10px; float: left;" runat="server">
                                <option value="imei">设备序列号</option>
                            </select>
                            <div class="inputBox">
                                <input id="txt_SearchNew1" type="text" onkeyup="Data1();" class="txtSearch SearchImg"
                                    style="width: 80px;  margin-right: 10px; margin-top: 3px;" /> <select id="Sel_Device" onchange="SelDev();" style="width:70px">
                                <option value="LM9S">LM9S</option>
                                <option value="LM9C">LM9C</option>
                                <option value="LM9A">LM9A</option>
                                <option value="LM600">LM600</option>
                                <option value="LM800">LM800</option>
                            </select></div>
                           
                        </div>
                    </div>
                    <div style="height:621px; overflow:auto">
                           
                        <table id="table1" class="grid" style="font-size:12px;">
                            <thead>
                                <tr>
                                    <td style="width: 20px; text-align: left;">
                                        <label id="checkAllOff" onclick="CheckAllLine()" title="全选">
                                            &nbsp;</label>
                                    </td>
                                    <td style="width: 140px;text-align:center">
                                        终端序列号
                                    </td>
                                    <td style="width:131px;text-align:center">
                                        设备型号
                                    </td>
                                </tr>
                            </thead>
                            <tbody id="unAlloted">
                                <asp:Repeater ID="rp_Item" runat="server" >
                                    <ItemTemplate>
           
                                    </ItemTemplate>
                                    <FooterTemplate>
                                    </FooterTemplate>
                                </asp:Repeater>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                <div class="box12" style="width: 30px; height: 50px; float: left; padding-top: 300px;
                    margin-left: 16px;">
                    <input id="add" type="button" value=">" onclick="addDevice();" style="width: 18px;" />
                    <br />
                    <p style="height: 10px;">
                    </p>
                    <input id="sub" type="button" value="<" onclick="subDevice();" style="width: 18px;" />
                </div>
                <input id="hcId" type="hidden" value="cId" />
                <input id="hdId" type="hidden" value="dId" />
                <input id="hdcName" type="hidden" />
                <div class="box13" >
                    <div class="box14">
                        <div class="box15">
                            [已分配设备]</div>
                        <div class="box16">
                            <select id="Searchwhere2" class="Searchwhere2" style="width: 100px; margin-top: 3px;
                                margin-left: 10px; float: left;" runat="server">
                                <option value="imei">设备序列号</option>
                                <option value="PlateNo">车牌号码</option>
                                <option value="SimNo">SIM卡号</option>
                            </select>
                            <div class="inputBox">
                                <input id="txt_SearchNew2" type="text" onkeyup="Data2();" class="txtSearch SearchImg"
                                    style="width: 110px; float: left; margin-left: 10px; margin-top: 3px;" /></div>
                        </div>
                        
                    </div>
                    <div style="height:590px; overflow:auto"; >
                        <table id="table2" class="grid">
                            <thead>
                                <tr>
                                    <td style="width: 20px; text-align: left;">
                                        <label id="Label1" onclick="CheckAllLine()" title="全选">
                                            &nbsp;</label>
                                    </td>
                                    <td style="text-align: center; width: 110px; ">
                                        设备序列号
                                    </td>
                                    <td style="text-align: center;width: 100px; ">
                                        车牌号码
                                    </td>
                                    <td style="text-align: center;width: 100px; ">
                                        流量卡号
                                    </td>
                                    <td style="text-align: center;width: 100px; ">
                                        车主电话
                                    </td>
                                    <td style="text-align: center;width: 100px; ">
                                        设备型号
                                    </td>
                                </tr>
                            </thead>
                            <tbody id="Alloted">
                                <asp:Repeater ID="rp_Item2" runat="server">
                                     <ItemTemplate>
                                        <tr>
                                            <td style="width: 20px; text-align: left;">
                                            </td>
                                            <td style="width: 110px;  text-align: left;">
                                            </td>
                                            <td style="width: 100px; text-align: center;">
                                            </td>
                                            <td style="width: 100px; text-align: center;">
                                            </td>
                                            <td style="width: 100px; text-align: center;">
                                            </td>
                                            <td style="width: 100px; text-align: center;">
                                            </td>
                                        </tr>
                                    </ItemTemplate>
                                    <FooterTemplate>
        
                                    </FooterTemplate>
                                </asp:Repeater>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="box16" style="width: 188px; height: 627px; background-color: #fff; float: right;
                border: #CCC solid 1px;">
                
            <div id="orgTree" class="div-body">
                <ul id="tree" class="tree" style="width:150px; height:670px; overflow:auto;">
                </ul>
            </div>
        </div>
        </div>
    </div>
    </form>
</body>
</html>