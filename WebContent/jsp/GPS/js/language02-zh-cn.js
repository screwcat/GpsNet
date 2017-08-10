﻿function writePage(msg) {
    document.write(msg);
}

var allPage = { tab1: "运行总览", tab2: "报警总览", tab3: "运行统计", tab4: "报警统计", startTime: "开始时间", endTime: "结束时间", search: "查 询", num: "序号", deviceName: "设备名",
    time: "时间", distance: "里程(公里)", overspeed: "超速", noData: "没有查询到数据", lat: "纬度", lng: "经度", speed: "速度", address: "地址", speedKM: "公里/小时", speedM: "米/秒", day: "天", hour: "小时",
    minute: "分钟", pleSel: "请选择", date: "日期", plsDeviceMsg: "请选择设备", address: "地址", moreDevice: "更多设备", msg: "消息提醒", myAccount: "我的账号", changePass: "修改密码",
    tracking: "实时跟踪", playback: "历史轨迹", monitor: "定位监控", home: "主页", customer: "客户", report: "统计报表", more: "更多", all: "全部", no: "序号", name: "名称", carNum: "车牌号",
    imeiNo: "IMEI号", activeTime: "激活时间", hireExpireTime: "到期时间", operation: "操作", noData: "没有查询到数据", edit: "修改", divicesInfo: "设备信息", cellName: "联系人",
    phone: "电话", timezone: "时区", save: "保存", confirm: "确定", updateUserSuccess: "修改资料成功!", updateUserFailed: "修改资料失败!", modelName: "型号", state: "状态",
    drection: "方向", baidu: "百度", google: "谷歌", day: "天", hour: "小时", minute: "分钟", stopTime: "停留时间", desc: "备注", cancel: "取消", del: "删除", delSuccess: "删除成功!",
    delFaild: "删除失败!", accStr: "ACC状态", acc0: "关", acc1: "开", positionType: "定位方式", manDevice: "设备管理", type: "类型", acc2: "未接", resolve: "解析", startStopTime: "停留开始",
    endStopTime: "停留结束", status1: "未启用", moving: "行驶", stopCar: "静止", offline: "离线", arrears: "欠费", primaryEmail: "联系邮箱", positionTime: "定位时间", clear: "清除", targetName: "设备名",
    toExcel: "导出Excel", distance2: "里程", km: "公里", m: "米", event: "事件记录", inTime: "进入时间", outTime: "离开时间", noJur: "没有权限!", moneyCount: "点数", deviceHireDay: "代充天数", belongTo: "所属用户",
    updateTime: "更新时间", userInfo: "用户信息", userType2: "经销商", changePassword: "修改密码", service: "服务商", clearAll: "清除全部"
};

var courseName = { dueNorth: "正北", northeast: "东北", dueEast: "正东", southeast: "东南", dueSouth: "正南", southwest: "西南", dueWest: "正西", northwest: "西北" };

var reportPage = { title: "运行统计总览", warnCount: "报警", stopCount: "停留" };

var alarmSumPage = { title: "报警统计总览", lowCount: "低电报警", cutPowerCount: "断电报警", vibCount: "震动报警", sosCount: "求救报警" }

var overSpeedPage = { continueTime: "持续时间", speedlimit: "超速值", distancePage: "里程统计", overspeedDetail: "超速详单", stopDetail: "停留详单" };

var alarmIndexPage = { geofenceIn: "进电子栅栏", geofenceOut: "出电子栅栏", moved: "位移报警", lowBattery: "低电报警", sos: "求救报警", cutPower: "断电报警", vibration: "震动报警",
    overSpeed: "超速报警", offline: "离线报警"
};

var runindexPage = { statistics: "统计方式", statistics2: "按天统计", oilCoefficient: "百公里油耗系数", L: "升", oil: "油耗" };

var alarmDetailPage = { alarmTime: "报警时间", alarmType: "报警类型", alarmCount: "报警统计", alarmDetail: "报警详单" };

var userPage = { warnTitle: "系统报警信息提醒", warnSound: "开启报警声音", day7Exp: "7天内过期设备", day60Exp: "60天内过期设备", alreadyExp: "已过期设备",
    username: "客户名/账号", hello: "您好", searchDevice: "搜设备", searchUser: "搜客户", exit: "退出", message: "消息", allDeivce: "全部设备", moneyMove: "点数转让", moneyHistory: "消费记录"
};

var userInfoPage = { myAccount: "我的账号", changePassword: "修改密码", userMsg: "请完善以下信息，比如联系电话、联系人（若包含该项）", customerName: "客户名称",
    account: "登陆账号", oldPass: "旧密码", newPass: "新密码", confirmPass: "确认密码", passLengthMsg: "密码长度不得大于20个字符", passNull: "密码输入不能为空!",
    passError: "2次密码输入不一致!", changePassSuccess: "修改密码成功!", changePassError: "修改密码失败!", oldPassError: "旧密码不对!", warnSendMsg: "报警附加通知方式",
    sendEmail: "邮件通知", service: "服务商"
};

var warnMessagePage = { warnMsg: "报警消息", handle1: "未处理", handle2: "已处理", alarmType: "报警类型", alarmTime: "报警时间" };

var trackingPage = { secondMsg: "秒后刷新!" };

var playbackPage = { from: "从", to: "到", play: "播 放", pause: "暂 停", next: "继 续", fast: "快", slow: "慢", timeMsg: "结束时间大于开始时间!", nowLoading: "正在加载数据!",
    playOver: "播放完毕!", searchNull: "没搜索到数据!", showLBS: "显示LBS"
};

var geofencesPage = { geofence: "电子栅栏", addGeofence: "新增电子栅栏", geoNameNull: "电子栅栏名称不能为空!", radius: "半径(米)", delGeoConfirm: "确认删除", delGeoConfirm2: "这个电子栅栏吗?" ,
    addSuccess: "添加成功!", addFaild: "添加失败!"
};

var iframeMapPage = { baiduMap: "百度地图", googleMap: "谷歌地图", deviceName: "设备名称" };

var userUpdatePage = { account: "登录名" };


var mapPage = { searchInput: '请输入设备名/IMEI号', divicesInfo: "设备信息", geofence: "电子栅栏", cutOffPetrol: "远程断油电", restorePetrol: "远程恢复油电", checkLocation: "查询定位", checkCommand: "查询指令记录",
    sendConfirm: "发指令前请再次确认登录账号", passNull: "请输入密码!", passError: "密码输入错误!", sendMsg1: "正在发送指令,请稍后...", sendSuccess: "命令已经成功下发,等待设备响应...",
    sendMsg2: "命令无效", sendMsg3: "设备不存在", sendMsg4: "设备与服务器已经断开连接", sendMsg5: "下发不成功", responseSuccess: "设备成功返回!", responseNull: "还没有获取到设备返回数据!",
    checkLocatoin: "在线检查位置", checkCommandTitle: "查询指令记录", cmdType: "指令类型", cmdState: "指令状态", responseText: "响应信息", responseTime: "响应时间", sendTime: "发送时间",
    dyd: "断油电", hfyd: "恢复油电", deviceResponse: "设备已返回", sendSuccess2: "命令已发送", noSend: "命令未发送", deviceDetailList: "设备详细信息列表", addGroup: "添加组", defaultGroup: "默认组",
    moveToGroup: "移至分组", delGroupConfirm: "这个分组吗?", downloadLocation: "下载轨迹", deviceFortify: "终端设防", deviceDismiss: "终端撤防", accOn: "ACC开", accOff: "ACC关", fortify: "设防", dismiss: "撤防", carOpen: "车门开", carClose: "车门关", zdlj: "主电连接", zddk: "主电断开",
    obdChecking: "OBD检测", uploadTime: "上传间隔", setQinqing: "设置亲情号码", setSOS: "设置SOS号码", setZhukong: "主控号码", setPassword: "修改密码", setAutoFortify: "自动设防开启",
    setAutoFortifyClose: "自动设防关闭", setCutFortifyAuto: "外部电源断电自动设防开启", setCutFortifyAutoClose: "外部电源断电自动设防关闭", setVIBTime: "震动报警间隔时间设置", setVIBLmd: "震动灵敏度", setSOSType: "SOS报警方式",
    setWeiyiWarn: "移位报警设置", setOverspeed: "超速设置", setSMSGPRS: "短信/GPRS模式", setJianting: "监听", setYccq: "远程重启", setHfcc: "恢复出厂", setLanguage: "语言设置",
    setTimezone: "时区设置", setXiumian: "休眠设置", setJiantingType: "监听模式", setDingweiType: "定位模式", setParam: "参数查询", setAutoFortifyTime: "自动设防时间", setAutoDismissTime: "自动撤防时间",
    setUploadMoveTime: "运动上传频率", setUploadStopTime: "静止上传频率", setYcqd: "远程启动", setYcxh: "远程熄火", setGeofence: "电子栅栏", setOBDUploadTime: "OBD上传间隔",
    setOBDCMD: "OBD透传命令", setOBDGg: "OBD透传广告", setDeviceUploadTime: "设置设备上传间隔", danwei5s: "单位秒,最小5秒", obdTab1: "车辆状态", obdTab2: "历史数据", obdTab3: "OBD命令",
    inputCmdStr: "输入命令内容", inputGgStr: "输入广告内容", secondsMsg1: "间隔不能小于5秒!", secondsMsg2: "间隔不能大于9999秒!", startTime: "开始时间", endTime: "结束时间",
    pidCount: "故障数量", pidStr: "故障说明", noGuzhang: "没有故障", deetail: "详细", obdDataTime: "数据时间", obdFdjfh: "发动机负荷", obdFdjsw: "发动机水温", obdDsryxz: "短时燃油修正",
    obdCsryxz: "长时燃油修正", obdJqqgjdyl: "进气歧管绝对压力", obdFdjzs: "发动机转速", obdClsd: "车辆速度", obdQgdhtqj: "1号汽缸点火提前角", obdJqwd: "进气温度", obdKqll: "空气流量", obdJqmjdwz: "节气门绝对位置",
    obdMILGzd: "MIL(故障灯)亮起后的行驶距离", obdRylsr: "燃油量输入", obdDqyl: "大气压力", obdKzmkdy: "控制模块电压", obdSsyh: "瞬时油耗", obdMl: "马力", obdZlc: "总里程", obdBglyh: "百公里油耗",
    obdDpdy: "电瓶电压", obdGzdm: "故障代码"
};

var mapPage2 = { searchInput: '请输入设备名/IMEI号', divicesInfo: "设备信息", geofence: "电子栅栏", cutOffPetrol: "远程断油电", restorePetrol: "远程恢复油电", checkLocation: "查询定位", checkCommand: "查询指令记录",
    sendConfirm: "发指令前请再次确认登录账号", passNull: "请输入密码!", passError: "密码输入错误!", sendMsg1: "正在发送指令,请稍后...", sendSuccess: "命令已经成功下发,等待设备响应...",
    sendMsg2: "命令无效", sendMsg3: "设备不存在", sendMsg4: "设备与服务器已经断开连接", sendMsg5: "下发不成功", responseSuccess: "设备成功返回!", responseNull: "还没有获取到设备返回数据!",
    checkLocatoin: "在线检查位置", checkCommandTitle: "查询指令记录", cmdType: "指令类型", cmdState: "指令状态", responseText: "响应信息", responseTime: "响应时间", sendTime: "发送时间",
    dyd: "断油电", hfyd: "恢复油电", deviceResponse: "设备已返回", sendSuccess2: "命令已发送", noSend: "命令未发送", deviceDetailList: "设备详细信息列表", addGroup: "添加组", defaultGroup: "默认组",
    moveToGroup: "移至分组", delGroupConfirm: "这个分组吗?", downloadLocation: "下载轨迹", deviceFortify: "终端设防", deviceDismiss: "终端撤防", accOn: "ACC开", accOff: "ACC关", fortify: "设防", dismiss: "撤防", carOpen: "车门开", carClose: "车门关", zdlj: "主电连接", zddk: "主电断开",
    obdChecking: "OBD检测", uploadTime: "上传间隔", setQinqing: "设置亲情号码", setSOS: "设置SOS号码", setZhukong: "主控号码", setPassword: "修改密码", setAutoFortify: "自动设防开启",
    setAutoFortifyClose: "自动设防关闭", setCutFortifyAuto: "外部电源断电自动设防开启", setCutFortifyAutoClose: "外部电源断电自动设防关闭", setVIBTime: "震动报警间隔时间设置", setVIBLmd: "震动灵敏度", setSOSType: "SOS报警方式",
    setWeiyiWarn: "移位报警设置", setOverspeed: "超速设置", setSMSGPRS: "短信/GPRS模式", setJianting: "监听", setYccq: "远程重启", setHfcc: "恢复出厂", setLanguage: "语言设置",
    setTimezone: "时区设置", setXiumian: "休眠设置", setJiantingType: "监听模式", setDingweiType: "定位模式", setParam: "参数查询", setAutoFortifyTime: "自动设防时间", setAutoDismissTime: "自动撤防时间",
    setUploadMoveTime: "运动上传频率", setUploadStopTime: "静止上传频率", setYcqd: "远程启动", setYcxh: "远程熄火", setGeofence: "电子栅栏", setOBDUploadTime: "OBD上传间隔",
    setOBDCMD: "OBD透传命令", setOBDGg: "OBD透传广告", setDeviceUploadTime: "设置设备上传间隔", danwei5s: "单位秒,最小5秒", obdTab1: "车辆状态", obdTab2: "历史数据", obdTab3: "OBD命令",
    inputCmdStr: "输入命令内容", inputGgStr: "输入广告内容", secondsMsg1: "间隔不能小于5秒!", secondsMsg2: "间隔不能大于9999秒!", startTime: "开始时间", endTime: "结束时间",
    pidCount: "故障数量", pidStr: "故障说明", noGuzhang: "没有故障", deetail: "详细", obdDataTime: "数据时间", obdFdjfh: "发动机负荷", obdFdjsw: "发动机水温", obdDsryxz: "短时燃油修正",
    obdCsryxz: "长时燃油修正", obdJqqgjdyl: "进气歧管绝对压力", obdFdjzs: "发动机转速", obdClsd: "车辆速度", obdQgdhtqj: "1号汽缸点火提前角", obdJqwd: "进气温度", obdKqll: "空气流量", obdJqmjdwz: "节气门绝对位置",
    obdMILGzd: "MIL(故障灯)亮起后的行驶距离", obdRylsr: "燃油量输入", obdDqyl: "大气压力", obdKzmkdy: "控制模块电压", obdSsyh: "瞬时油耗", obdMl: "马力", obdZlc: "总里程", obdBglyh: "百公里油耗",
    obdDpdy: "电瓶电压", obdGzdm: "故障代码"
};

var downloadLocation = { download: "下 载", help: "帮助", step: "步骤", step1: "1.选择需要下载的指定设备。", step2: "2.输入需要下载的具体日期。", step3: "3.单击“下载KML轨迹文件”按钮。",
    msg1: "注意：如果单击“下载”按钮， 出现“没有找到有效的轨迹数据!”提示信息，表示当前没有你需要下载的数据。", msg2: "下载的轨迹文件的格式是Google KML格式，如:“文件名.kml”。安装 Google Earth后。",
    msg3: "双击KML文件，会通过Google Earth工具打开。", msg4: "KML轨迹文件会将设备的移动痕迹以红线描绘在Google地图上。", msg5: "附注:下载 Google Earth 请点击", here: "这里",
    msg6: "您可以通过“下载轨迹数据”功能，下载指定设备某一日期内的移动痕迹。"
};

var cusPage = { updateExpTime: "更新到期时间", updateError: "修改失败!" };

var moneyPage = { moveToAccount: "转入登陆账号", moveToUser: "转入用户名", moveCount: "转入点数", check: "检测", noLoginName: "不存在此登陆名!", inputLoginNameIn: "请输入转入登录名!",
    inputLoginNameOut: "请检测转入登录名!", noMoveSelf: "不能转入给自己!", moneyLack: "点数不够!", moneyError: "转入异常!", moveSuccess: "转入成功,当前点数:", inputMoneyMsg: "请输入转入点数!",
    uToUser: "你给用户", money: "点", user: "用户", moveMoneyMsg1: "给你转入点数", give: "给", moneyMsg2: "台设备充值,使用总点数", day: "天", msg1: "1个点数1天", oneYeah: "一年", twoYeah: "二年",
    lifelong: "终身", msg2: "增加到期天数", msg3: "设备充值天数成功!", msg4: "点数不够,请充值!", msg5: "天数必须大于0!", pointManagement: "点数管理"
};

var yiwen201405 = { fsManger: "4S店管理", battery: "电池电量", realCar: "实时车况", obdData: "OBD数据记录", oilInfo: "油耗信息", carBaoyang: "车辆保养", carBaoyangSet: "里程保养设置",
    carBaoxian: "车辆保险", carNianshen: "车辆年审", userData: "用户数据", maintainCar: "需保养车辆", fsSet: "4S店设置", baoyangData: "保养数据录入", baoyangItem: "保养名目",
    baoyangPrice: "保养价格", baoyangDate: "保养日期", maintenanceofmiles: "保养时里程(公里)", repairShop: "修理厂", notes: "备注", fuelInput: "加油量信息录入", restFuel: "还剩油量(升)",
    lastrefuel: "上次加油行驶里程(公里)", fuelMsg: "当前加油时间时设备总里程减去上次加油时间时设备总里程", automatic: "自动计算", fuelDate: "加油时间", oilLabel: "机油标号",
    refuelLiter: "加油(升)", unitPrice: "每升单价(元)", refuelAddress: "加油地点", fsInfoSet: "4S店信息设置", fsName: "4S店名称", fsZuchePhone: "4S租车服务电话", fsSalePhone: "4S二手车销售电话",
    fsSOSPhone: "4S救援电话", fsDaijiaPhone: "4S代驾电话", fsBaoxianPhone: "4S报险电话", fsUsername: "4S店联系人", fsPhone: "联系电话", fsCarSalePhone: "销售电话", fsServicePhone: "客服电话",
    location: "所在位置", about: "简介", carByInterval: "车辆保养间隔提示设置", byIntervalMileage: "保养间隔里程", byLastMileage: "平台上次提示时里程", byMsg2: "公里(设备在平台'未启用',设置总里程无效)",
    byMsg3: "温馨提示:非新车转移至平台,或没按规定里程去保养,或数据不正确,可通过手动修改\"平台上次提示时里程\"和\"总里程\"来达到纠正数据的作用.", byMsg4: "保养提示间隔需大于500公里!", dayDistance: "当日里程",
    dayOil: "当日油耗", baoxianCompany: "车险的投保公司", baoxianNo: "车险保单的号码", baoxianStart: "保单生效启用日期", baoxianEnd: "保单到期日期", baoxianUsername: "车险理赔员姓名", baoxianUserPhone: "车险理赔员电话",
    baoxianDetail: "保单的详细信息", baoxianDesc: "保单的其他说明", displayType: "显示方式", detailList: "详细列表", dailyCount: "日计", monthlyCount: "月计", yearlyCount: "年计",
    nianshenDate: "年审时间", nextNianshenDate: "下次年审时间", addRefuel: "新增加油记录", baoyangList: "需要保养的车辆列表", byMsg6: "显示距离下次保养里程500公里内的车辆列表", msg1: "请输入加*必填项",
    baoyangMsg7: "确定删除这条保养信息吗?", baoyangAllPrice: "保养总价格", lastRest: "上次剩余(升)", userL: "本记录使用(升)", moveDistance: "行驶里程", oilMsg1: "百公里平均油耗(升)",
    kilometerPrice: "每公里费用", oilMsg2: "确定删除这条加油信息吗", baoyangInterval: "保养间隔(公里)", lastBaoyang: "上次提示里程(公里)", nextBaoyang: "距下次保养里程(公里)", nowDistance: "获取当前里程", addBaoyang: "新增保养记录", luruDate: "录入日期",
    price: "金额"
};