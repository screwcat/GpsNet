function IntiTable() {
    $('#Tab_DeviceCommand').datagrid({
        fitColumns: true,
        nowrap: false,
        height: 320,
        singleSelect: true,
        idField: "Id",
        pagination: true,
        columns: [[
                    { field: 'DescStr', title: loginTip.Command.CommandDesc, width: 80 },
					{
					    field: 'SendTime', title: loginTip.Command.SendTime, width: 130, formatter: function (value, data, rowIndex) {
					        return value == null ? "" : value.format("yyyy-MM-dd HH:mm:ss");
					    }
					},
                    { field: 'SendCount', title: loginTip.Command.SendCound, width: 50 },
                    {
                        field: 'RevTime', title: loginTip.Command.RevTime, width: 130, formatter: function (value, data, rowIndex) {
                            if (value != null) {
                                return value.format("yyyy-MM-dd HH:mm:ss");
                            } else {
                                return loginTip.Command.NoRev;
                            }

                        }
                    },
                        { field: 'StateText', title: loginTip.Command.State, width: 80 },
                     {
                         field: 'opt', title: loginTip.DataOpt.Opt, width: 80, formatter: function (value, data, rowIndex) {
                             var Ser = "";
                             //if (data.States == 1 || data.States == 2) {
                             //    Ser += "&nbsp;&nbsp;<a class='abox' href='javascript:CancelData(\"" + data.Id + "\")'    >" + loginTip.Command.CancelCommand + "</a>";
                             //}
                             return Ser;
                         }
                     }
        ]],
        rowStyler: function (index, row, css) {
            //                    if (row.OutDatetime < new Date()) {
            //                        return 'color:red;font-weight:bold;';
            //                    }
            //                    if (row.DeviceState == 2) {
            //                        return 'color:green;font-weight:bold;';
            //                    }
            return "";
        }
    });
    $('#Tab_DeviceCommand').datagrid("getPager").pagination({
        onSelectPage: function (pageNumber, pageSize) {
            LoadByPage(pageSize, pageNumber);
        } 
    });

    LoadCommandData();




    $('#Tab_DeviceCommand_Rev').datagrid({
        fitColumns: true,
        nowrap: false,
        height: 320,
        singleSelect: true,
        idField: "Id",
        pagination: true,
        columns: [[
                    { field: 'DescStr', title: loginTip.Command.CommandDesc, width: 80 },
                    {
                        field: 'RevTime', title: loginTip.Command.RevTime, width: 120, formatter: function (value, data, rowIndex) {
                            return value.format("yyyy-MM-dd HH:mm:ss");
                        }
                    },
                     { field: 'Context', title: loginTip.Command.CommandDesc, width: 300 },
        ]],
        rowStyler: function (index, row, css) {
            //                    if (row.OutDatetime < new Date()) {
            //                        return 'color:red;font-weight:bold;';
            //                    }
            //                    if (row.DeviceState == 2) {
            //                        return 'color:green;font-weight:bold;';
            //                    }
            return "";
        }
    });
    $('#Tab_DeviceCommand_Rev').datagrid("getPager").pagination({
        onSelectPage: function (pageNumber, pageSize) {
            LoadComRevDataByPage(pageSize, pageNumber);
        } 
    });



    LoadComRevData();
}

function CancelData(id) {
    UserServer.CancelCommand(id, function (Da) {
        LoadCommandData();
    });
}
function LoadByPage(PageSize, PageIndex) {
    UserServer.GetDeviceCommands(Request.QueryString("Serialnumber"), PageIndex - 1, PageSize, function (DT) {
        $('#Tab_DeviceCommand').datagrid("loadData", DT);
    });
}
function LoadCommandData() {
    var PageSize = $("#Tab_DeviceCommand").datagrid("options").pageSize;
    var PageIndex = $("#Tab_DeviceCommand").datagrid("options").pageNumber;
    LoadByPage(PageSize, PageIndex);
}




function LoadComRevData() {
    var PageSize = $("#Tab_DeviceCommand_Rev").datagrid("options").pageSize;
    var PageIndex = $("#Tab_DeviceCommand_Rev").datagrid("options").pageNumber;
    LoadComRevDataByPage(PageSize, PageIndex);
}

function LoadComRevDataByPage(PageSize, PageIndex) {
    UserServer.GetCommandRev(Request.QueryString("Serialnumber"), PageIndex - 1, PageSize, function (DT) {
        $('#Tab_DeviceCommand_Rev').datagrid("loadData", DT);
    });
}