var Da1 = [];
var Da2 = [];
var Da3 = [];



function IntiCo() {
    $('#S_CarSeries').combobox({
        valueField: 'id',
        textField: 'text',
        onSelect: function (record) {
            LoadData2();
        }
    });
    $('#S_CarSeries2').combobox({
        valueField: 'id',
        textField: 'text',
        onSelect: function (record) {
            LoadData3();
        }
    });

    $('#S_CarSeries3').combobox({
        valueField: '_id',
        textField: 'CarTypeName',
        onSelect: function (record) {
            LoadData4();
        }
    });
    LoadData1();

}
function LoadData1() {
    UserServer.SearchCarBrandList(function (d) {
        var Drr = d.split(';');
        var DaRR = [];
        Da1 = [];
        for (var i in Drr) {
            var DfArr = Drr[i].split(',');
            var o = {
                id: DfArr[0],
                text: DfArr[0],
                logo: DfArr[1]
            };
            Da1[o.id] = o;
            DaRR.push(o);
        }
        $('#S_CarSeries').combobox("setValue", "");
        $('#S_CarSeries').combobox("loadData", DaRR);
        if ($("#H_BrandId").val() != "") {
            $('#S_CarSeries').combobox("setValue", $("#H_BrandId").val());
            LoadData2();
        }
    });
}
function LoadData2() {
    var record = Da1[$('#S_CarSeries').combobox("getValue")];
    $("#H_BrandId").val($('#S_CarSeries').combobox("getValue"));
    $("#img_Serisc").attr("src", "\\images\\CarBrand\\" + record.logo)
    UserServer.SearchAllCarCarSeriesList(record.text, function (d) {
        var Drr = d.split(';');
        var DaRR = [];
        Da2 = [];
        for (var i in Drr) {
            var Drcd = Drr[i].split(',')
            var o = {
                id: Drcd[1],
                text: Drcd[0]
            };
            Da2[o.id] = o;
            DaRR.push(o);
        }
        $('#S_CarSeries2').combobox("setValue", "");
        $('#S_CarSeries2').combobox("loadData", DaRR);
        if ($("#H_SeriesId").val() != "") {
            if (Da2[$("#H_SeriesId").val()] != undefined) {
                $('#S_CarSeries2').combobox("setValue", $("#H_SeriesId").val());
                LoadData3();
            }
        } else {
            if (Da2[0] != undefined) {
                $('#S_CarSeries2').combobox("setValue", Da2[0].id);
                LoadData3();
            }
        }


    });
}
function LoadData3() {
    var record = Da2[$('#S_CarSeries2').combobox("getValue")];
    $("#H_SeriesId").val($('#S_CarSeries2').combobox("getValue"));
    UserServer.SearchCarData({
        CarSeriesId: record.id
    }, function (DaRR) {
        Da3 = [];

        for (var i in DaRR) {
            var item = DaRR[i];
            Da3[item._id] = item;
        }
        $('#S_CarSeries3').combobox("setValue", "");
        $('#S_CarSeries3').combobox("loadData", DaRR);
        if ($("#H_CartTId").val() != "") {
            if (Da3[$("#H_CartTId").val()] != undefined) {
                $('#S_CarSeries3').combobox("setValue", $("#H_CartTId").val());
                LoadData4();
            }
        } else {
            if (Da3[0] != undefined) {
                $('#S_CarSeries3').combobox("setValue", Da3[0]._id);
                LoadData4();
            }
        }


    });
}
function LoadData4() {
    var record = Da3[$('#S_CarSeries3').combobox("getValue")];
    $("#H_CartTId").val($('#S_CarSeries3').combobox("getValue"));
    SetCartInfo(record);
}

function VailData() {

    var BrandTpId = $('#S_CarSeries').combobox("getValue");
    var SeriesTpId = $('#S_CarSeries2').combobox("getValue");
    var CartType = $('#S_CarSeries3').combobox("getValue");
    if (BrandTpId == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请选择品牌");
        return false;
    }
    if (SeriesTpId == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请选择车系");

        return false;
    }
    if (CartType == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请选择车型");
        return false;
    }
    //var PaiLiang = $("#H_PaiLiang").val();
    //var MYouXiangRongJi = $("#H_YRongji").val();

    //if (isNaN(PaiLiang) || PaiLiang == "") {
    //    $.messager.alert(loginTip.DataOpt.Warnning, "请填写排量");
    //    return false;
    //}
    //if (isNaN(MYouXiangRongJi) || MYouXiangRongJi == "") {
    //    $.messager.alert(loginTip.DataOpt.Warnning, "请填写邮箱容积");
    //    return false;
    //}

    var T_BuyTime = $("#T_BuyTime").datebox("getValue");
    var T_CarBodyCode = $("#T_CarBodyCode").val();
    var T_CarCode = $("#T_CarCode").val();
    var T_Mil = $("#T_Mil").val();
    if (T_BuyTime == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请填写购买时间");
        return false;
    }

    if (T_CarCode == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请填写车牌号码");
        return false;
    }
    if (T_Mil == "") {
        $.messager.alert(loginTip.DataOpt.Warnning, "请填写行驶里程");
        return false;
    }
    return true;
}



IntiCo();


