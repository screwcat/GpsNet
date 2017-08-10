<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    	<link href="${ctx}/css/Site.css" rel="stylesheet" type="text/css" />
        <script src="${ctx}/js/jquery-1.8.2.min.js" type="text/javascript"></script>
        <script src="${ctx}/js/Validator/JValidator.js" type="text/javascript"></script>
        <script src="${ctx}/js/artDialog/artDialog.source.js" type="text/javascript"></script>
        <script src="${ctx}/js/artDialog/iframeTools.source.js" type="text/javascript"></script>
        <script src="${ctx}/js/TreeTable/jquery.treeTable.js" type="text/javascript"></script>
        <link href="${ctx}/css/jquery.treeTable.css" rel="stylesheet"
            type="text/css" />
        <link href="${ctx}/css/treeview.css" rel="stylesheet" type="text/css" />
        <script src="${ctx}/js/TreeView/treeview.pack.js" type="text/javascript"></script>
        <script src="${ctx}/js/FunctionJS.js" type="text/javascript"></script>
        <script src="${ctx}/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
        <script type="text/javascript">
        function Check(str) {
            var strReg = "";
            var r;
            var strText = document.getElementById(str).value;
            if (str == "Tbimei") {
                str = "IMEI";
            }
            if (strText == "" || strText == null) {
                alert((str) + "不能为空");
                return;
            }
        }

    </script>
</head>
<body>
    <form method="post" action="${ctx}/Edit_Device" id="device_form" style="width: 100%; height: 100%;" class="panel-noscroll"
    runat="server">
    <table>
        <tbody>
            <tr>
                <td>
                    IMEI/ID号:
                </td>
                <td>
                    <input name="Tbimei" maxlength="15" type="text" id="Tbimei" runat="server" onblur="Check('Tbimei')" />
                </td>
                <td>
                    车牌号码:
                </td>
                <td>
                    <input name="TbPlateNo" type="text" id="TbPlateNo" runat="server"/>
                </td>
            </tr>
            <tr>
                <td>
                    车主电话:
                </td>
                <td>
                    <input name="TbCarPhone" type="text" id="TbCarPhone" maxlength="11" runat="server" />
                </td>
                <td>
                    流量卡号:
                </td>
                <td>
                    <input name="TbSimNo" type="text" id="TbSimNo" maxlength="11" runat="server" />
                </td>
            </tr>
            <tr>
                <td>
                    创建时间:
                </td>
                <td>
                    <input name="TbcDate" type="text" id="TbcDate" runat="server" readonly="readonly"
                        onfocus="WdatePicker({skin:'whyGreen'})" />
                </td>
                <td>
                    过期时间:
                </td>
                <td>
                    <input name="TbuDate" type="text" id="TbuDate" runat="server" readonly="readonly"
                        onfocus="WdatePicker({skin:'whyGreen'})" />
                </td>
            </tr>
            <tr>
                <td>
                    是否安装:
                </td>
                <td>
                    <input name="TbIsInstall" id="TbIsInstall" type="checkbox" value="1"/> 是否激活<input name="TbIsActivation" id="TbIsActivation" type="checkbox" value="1"/></td>
                <td>
                    设备型号：
                </td>
                <td>
                    <select name="TbtcpProtocol" type="select" id="TbtcpProtocol" maxlength="30" runat="server">
                        <option>LM9S</option>
                        <option>LM9C</option>
                        <option>LM9A</option>
                        <option>LM600</option>
                        <option>LM800</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
	<div class="frmbottom">
        <input id="TbId" type="hidden" name="TbId" runat="server" />
        <a  ID="Save" runat="server" class="l-btn" OnClientClick="return CheckDataValid('#form1')"
            OnClick="Edit_Click()"><span class="l-btn-left">
            保 存</span></a>
           <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe>
        &nbsp;&nbsp;&nbsp; <a class="l-btn" href="javascript:void(0)" onclick="OpenClose();">
            <span class="l-btn-left">关 闭</span></a>
    </div>

    </form>
</body>
    <script type="text/javascript">
            function aa(){
            <% 
            String id =  request.getParameter("Id");
            String[] s = id.split(",");
            for (int i = 0; i < s.length; i++) {
                id = s[i];
            }
            %>
            var aid = <%=id%>;
            $.ajax({
                url:'${ctx}/Select_Device',
                type:'post',
                data:{'did':aid},
                success:function(data){
                	data = $.parseJSON(data);
                	$("#TbId").val(data.id);
                	$("#Tbimei").val(data.imei);
                	$("#TbPlateNo").val(data.plateno);
                	$("#TbCarPhone").val(data.carphone);
                	$("#TbSimNo").val(data.simno);
                	$("#TbcDate").val(data.cdate);
                	$("#TbuDate").val(data.udate);
                	$("#TbtcpProtocol").val(data.tcpprotocol);
                    if(data.install==1)
                    {
                       document.getElementById("TbIsInstall").checked=true; 
                    }
                    if(data.activation==1)
                    {
                        document.getElementById("TbIsActivation").checked=true; 
                    }
                }
            });
            }
            aa();
            function Edit_Click(){
                document.getElementById("device_form").submit();
            }
             
    </script>
</html>