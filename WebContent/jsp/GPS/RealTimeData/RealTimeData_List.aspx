<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RealTimeData_List.aspx.cs"
    Inherits="LM.Web.GPS.RealTimeData.RealTimeData_List" %>

<%@ Register Src="../../UserControl/LoadButton.ascx" TagName="LoadButton" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="/Themes/Styles/Site.css" rel="stylesheet" type="text/css" />
    <script src="/Themes/Scripts/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="/Themes/Scripts/jquery.pullbox.js" type="text/javascript"></script>
    <script src="/Themes/Scripts/FunctionJS.js" type="text/javascript"></script>
    <script type="text/javascript">
        //回车键s1
        document.onkeydown = function (e) {
            if (!e) e = window.event; //火狐中是 window.event
            if ((e.keyCode || e.which) == 13) {
                var obtnSearch = document.getElementById("lbtSearch");
                obtnSearch.click();
            }
        }

        $(function () {
            $(".div-body").PullBox({ dv: $(".div-body"), obj: $("#table1").find("tr") });
            divresize(90);
            FixedTableHeader("#table1", $(window).height() - 118);
        })
    </script>
    <style type="text/css">
        .paginator a
        {
            color: #286231;
            border: 1px solid #85efe9;
            background-color: #75a7db;
            margin: 0px 4px;
            padding: 3px 8px;
            line-height: 10px;
            height: 10px;
            font-size: 14px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            background: -moz-linear-gradient(top,white,#75a7db 100%);
            background: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#75a7db));
            text-decoration: none;
        }
        .paginator a:hover
        {
            color: rgb(215,157,206);
            background: -moz-linear-gradient(top,#75a7db,white 100%);
            background: -webkit-gradient(linear, 0 0, 0 100%, from(#75a7db),to(#ffffff));
            background-color: rgb(218,88,99);
        }
        .paginator .disabledpage:hover, .easypager .disabledpage
        {
            color: #ddd;
            border: 1px dashed #ddd;
            background: #fff;
        }
        .paginator .easypagerCurrpage
        {
            font-size: 14px;
            color: #8d3525;
            margin: 0px 4px;
            padding: 3px 8px;
            line-height: 10px;
            height: 10px;
            font-size: 14px;
        }
    </style>
    <script type="text/javascript">
        //导出
        function Export() {
            document.getElementById("btnInputExcel").click()
        }

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="btnbartitle">
        <div>
            车辆信息列表
        </div>
    </div>
    <div class="btnbarcontetn">
        <div style="float: left;">
        </div>
        <asp:Button runat="server" ID="btnInputExcel" Text="导出Excel" type="hidden" Style="height: 22px;
            display: none;" OnClick="btnInputExcel_Click" />
        <uc1:LoadButton ID="LoadButton1" runat="server" />
        <input id="tComId" type="hidden" runat="server" />
        <input id="tcname" type="hidden" runat="server" />
    </div>
    <div class="div-body">
        <div id="ToExcel" runat="server">
            <table class="grid" id="table1" singleselect="true">
                <thead>
                    <tr>
                        <td style="width: 50px; text-align: center;">
                            序号
                        </td>
                        <td style="width: 100px; text-align: center;">
                            车牌号码
                        </td>
                        <td style="width: 150px; text-align: center;">
                            最后在线时间
                        </td>
                        <td>
                            未上线时长
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <% if (this.gList != null)
                       {
                           for (int i = 0; i < this.gList.Count; i++)
                           { %>
                    <tr>
                        <td style="width: 50px; text-align: center;">
                            <%=i+1%>
                        </td>
                        <td style="width: 100px; text-align: center;">
                            <%=gList[i].PlateNo %>
                        </td>
                        <td style="width: 150px; text-align: center;">
                            <%=gList[i].SendTime %>
                        </td>
                        <td>
                            <%=gList[i].UnOnlineTime %>天
                        </td>
                    </tr>
                    <%}
                   } %>
                </tbody>
            </table>
        </div>
        <div>
            <webdiyer:AspNetPager ID="AspNetPager1" runat="server" FirstPageText="首页" LastPageText="尾页"
                NextPageText="下一页" NumericButtonCount="4" pageindexboxtype="DropDownList" PrevPageText="上一页"
                ShowCustomInfoSection="Right" showpageindexbox="Always" SubmitButtonText="Go"
                textafterpageindexbox="页" textbeforepageindexbox="转到" AlwaysShow="True" CustomInfoHTML="第%CurrentPageIndex%页，共%PageCount%页，每页%PageSize%条，共%RecordCount%条记录"
                LayoutType="Table" CssClass="paginator" CustomInfoClass="paginators" Height="20px"
                CustomInfoSectionWidth="" Wrap="False" PageSize="10" OnPageChanging="AspNetPager1_PageChanging">
            </webdiyer:AspNetPager>
        </div>
    </div>
    <div id="hdExcelData" runat="server" style="display:none" >
        <table class="grid" id="table2" singleselect="true">
            <thead>
                <tr>
                    <td style="width: 50px; text-align: center;">
                        序号
                    </td>
                    <td style="width: 100px; text-align: center;">
                        车牌号码
                    </td>
                    <td style="width: 150px; text-align: center;">
                        最后在线时间
                    </td>
                    <td>
                        未上线时长
                    </td>
                </tr>
            </thead>
            <tbody>
                <% if (this.gpsList != null)
                   {
                       for (int i = 0; i < this.gpsList.Count; i++)
                       { %>
                <tr>
                    <td style="width: 50px; text-align: center;">
                        <%=i+1%>
                    </td>
                    <td style="width: 100px; text-align: center;">
                        <%=gpsList[i].PlateNo%>
                    </td>
                    <td style="width: 150px; text-align: center;">
                        <%=gpsList[i].SendTime%>
                    </td>
                    <td>
                        <%=gpsList[i].UnOnlineTime%>天
                    </td>
                </tr>
                <%}
                   } %>
            </tbody>
        </table>
    </div>
    </form>
</body>
</html>
