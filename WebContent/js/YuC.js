function IsGetImei(imei) {
    var isOK = true;
    if (imei == undefined || imei == "") {
        isOK = false;
        showWarningMsg("未选中任何一行");
        return;
    } else if (imei.split(",").length > 1) {
        isOK = false;
        showFaceMsg("一次只能选择一条记录");
        return;
    }
    return isOK;
}