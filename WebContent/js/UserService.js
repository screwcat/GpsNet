var UserServer = function () {
    UserServer.initializeBase(this);
    this._timeout = 0;
    this._userContext = null;
    this._succeeded = null;
    this._failed = null;
}
UserServer.prototype = {
    _get_path: function () {
        var p = this.get_path();
        if (p) return p;
        else return UserServer._staticInstance.get_path();
    },
    UpdateDevice: function (dev, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'UpdateDevice', false, { dev: dev }, succeededCallback, failedCallback, userContext);
    },
    CheFang: function (Serialnumber, Type, width, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'CheFang', false, { Serialnumber: Serialnumber, Type: Type, width: width }, succeededCallback, failedCallback, userContext);
    },
    SearchCity_DeviceLog: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchCity_DeviceLog', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    ResetDevice: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'ResetDevice', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    DeletePOIDataById: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeletePOIDataById', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    LoadPOIDataBySerialnumber: function (serialNumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'LoadPOIDataBySerialnumber', false, { serialNumber: serialNumber }, succeededCallback, failedCallback, userContext);
    },
    SHX915SUO: function (Serialnumber, ISSUO, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX915SUO', false, { Serialnumber: Serialnumber, ISSUO: ISSUO }, succeededCallback, failedCallback, userContext);
    },
    SHX915Fang: function (Serialnumber, Isfang, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX915Fang', false, { Serialnumber: Serialnumber, Isfang: Isfang }, succeededCallback, failedCallback, userContext);
    },
    GetSHX009DataEntityBySerialnumber: function (Serialnumber, includeRaw, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX009DataEntityBySerialnumber', false, { Serialnumber: Serialnumber, includeRaw: includeRaw }, succeededCallback, failedCallback, userContext);
    },
    GetSHX009DataEntityByFileName: function (filename, includeRaw, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX009DataEntityByFileName', false, { filename: filename, includeRaw: includeRaw }, succeededCallback, failedCallback, userContext);
    },
    GetSHX009DataItemBySerialnumber: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX009DataItemBySerialnumber', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX009DataHistory: function (SOPT, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX009DataHistory', false, { SOPT: SOPT }, succeededCallback, failedCallback, userContext);
    },
    GetSHX009PedometerCur: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX009PedometerCur', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    GetSHX009PedometerReport: function (entity, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX009PedometerReport', false, { entity: entity }, succeededCallback, failedCallback, userContext);
    },
    SHX009Resetdometer: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX009Resetdometer', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SHX009OpenHeartUI: function (Serialnumber, IsOpen, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX009OpenHeartUI', false, { Serialnumber: Serialnumber, IsOpen: IsOpen }, succeededCallback, failedCallback, userContext);
    },
    SHX009SetPedometerTime: function (Serialnumber, Time, IsOpen, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX009SetPedometerTime', false, { Serialnumber: Serialnumber, Time: Time, IsOpen: IsOpen }, succeededCallback, failedCallback, userContext);
    },
    SHX007Setalarmclock: function (SHX007AlarmClock, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX007Setalarmclock', false, { SHX007AlarmClock: SHX007AlarmClock }, succeededCallback, failedCallback, userContext);
    },
    SHX007SetScenemode: function (SHX007Scenemode, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX007SetScenemode', false, { SHX007Scenemode: SHX007Scenemode }, succeededCallback, failedCallback, userContext);
    },
    SHX007Getalarmclock: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX007Getalarmclock', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SHX007GetScenemode: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SHX007GetScenemode', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    PopQueryMessage: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'PopQueryMessage', false, {}, succeededCallback, failedCallback, userContext);
    },
    PopManyQueryMessage: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'PopManyQueryMessage', false, {}, succeededCallback, failedCallback, userContext);
    },
    PopSHX915ManyQueryMessage: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'PopSHX915ManyQueryMessage', false, {}, succeededCallback, failedCallback, userContext);
    },
    PopSHX915QueryMessage: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'PopSHX915QueryMessage', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetDeviceTypeList: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceTypeList', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetDeviceTypeDetail: function (TyId, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceTypeDetail', false, { TyId: TyId }, succeededCallback, failedCallback, userContext);
    },
    UpdateDeviceType: function (TypeId, TypeName, Mo, Remark, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'UpdateDeviceType', false, { TypeId: TypeId, TypeName: TypeName, Mo: Mo, Remark: Remark }, succeededCallback, failedCallback, userContext);
    },
    GetDeviceCommands: function (Serialnumber, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceCommands', false, { Serialnumber: Serialnumber, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    GetCommandRev: function (Serialnumber, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetCommandRev', false, { Serialnumber: Serialnumber, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    GeofenceSearchDevice: function (Data, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GeofenceSearchDevice', false, { Data: Data }, succeededCallback, failedCallback, userContext);
    },
    SearchMuilDevice: function (SerialnumberList, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchMuilDevice', false, { SerialnumberList: SerialnumberList }, succeededCallback, failedCallback, userContext);
    },
    SearchMuilD: function (Ser, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchMuilD', false, { Ser: Ser }, succeededCallback, failedCallback, userContext);
    },
    SearchMuilU: function (LoginList, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchMuilU', false, { LoginList: LoginList }, succeededCallback, failedCallback, userContext);
    },
    CancelCommand: function (Id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'CancelCommand', false, { Id: Id }, succeededCallback, failedCallback, userContext);
    },
    MoveDevice: function (Serialnumber, NewUserLoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'MoveDevice', false, { Serialnumber: Serialnumber, NewUserLoginName: NewUserLoginName }, succeededCallback, failedCallback, userContext);
    },
    DeleteDevice: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteDevice', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    GetDeviceDetail: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceDetail', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    GetSHX912OptLogList: function (PageIndex, PageSize, Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX912OptLogList', false, { PageIndex: PageIndex, PageSize: PageSize, Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SearchALUserDevice: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchALUserDevice', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    GetDeviceList: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceList', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    GetUserList: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserList', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    GetUserDevice: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserDevice', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    JoinDeviceLocationListen: function (SerialnumberList, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'JoinDeviceLocationListen', false, { SerialnumberList: SerialnumberList }, succeededCallback, failedCallback, userContext);
    },
    LeavDeviceLocationListen: function (SerialnumberList, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'LeavDeviceLocationListen', false, { SerialnumberList: SerialnumberList }, succeededCallback, failedCallback, userContext);
    },
    ClearAllListen: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'ClearAllListen', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetListenDeviceList: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetListenDeviceList', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetRoleList: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetRoleList', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetRightList: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetRightList', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetRoleAndRight: function (RoleId, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetRoleAndRight', false, { RoleId: RoleId }, succeededCallback, failedCallback, userContext);
    },
    RoleToRight: function (RoleId, Rights, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'RoleToRight', false, { RoleId: RoleId, Rights: Rights }, succeededCallback, failedCallback, userContext);
    },
    DeleteUser: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteUser', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    SearchALUser: function (KeyWord, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchALUser', false, { KeyWord: KeyWord }, succeededCallback, failedCallback, userContext);
    },
    GetLowUser: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetLowUser', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    GetUserDetailWithDeviceCount: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserDetailWithDeviceCount', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    GetUserDetails: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserDetails', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    MoveUser: function (LoginName, ParLoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'MoveUser', false, { LoginName: LoginName, ParLoginName: ParLoginName }, succeededCallback, failedCallback, userContext);
    },
    GetUserEasyUITreeNotWithCount: function (UserName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserEasyUITreeNotWithCount', false, { UserName: UserName }, succeededCallback, failedCallback, userContext);
    },
    GetUserEasyUITree: function (UserName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserEasyUITree', false, { UserName: UserName }, succeededCallback, failedCallback, userContext);
    },
    GetUserMapType: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserMapType', false, {}, succeededCallback, failedCallback, userContext);
    },
    SetUserMapType: function (MapType, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SetUserMapType', false, { MapType: MapType }, succeededCallback, failedCallback, userContext);
    },
    GetAddress: function (lat, lng, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAddress', false, { lat: lat, lng: lng }, succeededCallback, failedCallback, userContext);
    },
    GetTraceLocation: function (Serialnumber, MaxTime, MinTime, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTraceLocation', false, { Serialnumber: Serialnumber, MaxTime: MaxTime, MinTime: MinTime }, succeededCallback, failedCallback, userContext);
    },
    GetTraceLocationList: function (SerList, MaxTime, MinTime, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTraceLocationList', false, { SerList: SerList, MaxTime: MaxTime, MinTime: MinTime }, succeededCallback, failedCallback, userContext);
    },
    GetTraceLocation2: function (Serialnumber, MaxTime, MinTime, MinSpeed, FilLbs, FilError, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTraceLocation2', false, { Serialnumber: Serialnumber, MaxTime: MaxTime, MinTime: MinTime, MinSpeed: MinSpeed, FilLbs: FilLbs, FilError: FilError }, succeededCallback, failedCallback, userContext);
    },
    SaveSYConfig: function (entity, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SaveSYConfig', false, { entity: entity }, succeededCallback, failedCallback, userContext);
    },
    GetConfig: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetConfig', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetMKCartHistory: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetMKCartHistory', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    GetUserOrders: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserOrders', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    SearchOrder: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchOrder', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    SearchCart: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchCart', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    GetSystemInfo: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSystemInfo', false, {}, succeededCallback, failedCallback, userContext);
    },
    AddGeography: function (GeographyEntity, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'AddGeography', false, { GeographyEntity: GeographyEntity }, succeededCallback, failedCallback, userContext);
    },
    DeleteGeography: function (Id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteGeography', false, { Id: Id }, succeededCallback, failedCallback, userContext);
    },
    SearchDevice_Geography: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchDevice_Geography', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    AddMarket: function (Mrk, Ids, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'AddMarket', false, { Mrk: Mrk, Ids: Ids }, succeededCallback, failedCallback, userContext);
    },
    GetUserMrl: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserMrl', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetUserMrlNyId: function (Id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserMrlNyId', false, { Id: Id }, succeededCallback, failedCallback, userContext);
    },
    DeleteMarket: function (Mrid, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteMarket', false, { Mrid: Mrid }, succeededCallback, failedCallback, userContext);
    },
    JianToFan: function (text, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'JianToFan', false, { text: text }, succeededCallback, failedCallback, userContext);
    },
    GetPublicocation: function (Loginname, Pagendex, PageSize, Filter, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetPublicocation', false, { Loginname: Loginname, Pagendex: Pagendex, PageSize: PageSize, Filter: Filter }, succeededCallback, failedCallback, userContext);
    },
    SearchPublicLocationByName: function (Loginname, Pagendex, PageSize, Name, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchPublicLocationByName', false, { Loginname: Loginname, Pagendex: Pagendex, PageSize: PageSize, Name: Name }, succeededCallback, failedCallback, userContext);
    },
    GetAllPublicLocation: function (Loginname, Pagendex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllPublicLocation', false, { Loginname: Loginname, Pagendex: Pagendex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    GetAllPublicLines: function (LoginArr, Pagendex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllPublicLines', false, { LoginArr: LoginArr, Pagendex: Pagendex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    GetTraceDataByLineId: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTraceDataByLineId', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    ConfirmFang: function (Serialnumber, FangType, AlarmId, IsFang, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'ConfirmFang', false, { Serialnumber: Serialnumber, FangType: FangType, AlarmId: AlarmId, IsFang: IsFang }, succeededCallback, failedCallback, userContext);
    },
    RemoveAlarm: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'RemoveAlarm', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    DeleteAlarm: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteAlarm', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    GetTraceDataBLineId2: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTraceDataBLineId2', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    SearchLoginLog: function (StartTime, EndTime, LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchLoginLog', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_SearchLoginUser: function (StartTime, EndTime, LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_SearchLoginUser', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_SearchAlarm: function (StartTime, EndTime, LoginName, Serialnumber, AlarmType, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_SearchAlarm', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, Serialnumber: Serialnumber, AlarmType: AlarmType, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_SearchJinggaiAlarm: function (StartTime, EndTime, LoginName, AlarmType, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_SearchJinggaiAlarm', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, AlarmType: AlarmType, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_DeviceMileage: function (LoginName, Serialnumber, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_DeviceMileage', false, { LoginName: LoginName, Serialnumber: Serialnumber, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_DayMileage: function (StartTime, EndTime, Serialnumber, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_DayMileage', false, { StartTime: StartTime, EndTime: EndTime, Serialnumber: Serialnumber, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_TranceDetail: function (StartTime, EndTime, Serialnumber, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_TranceDetail', false, { StartTime: StartTime, EndTime: EndTime, Serialnumber: Serialnumber, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    AddDGGeofenceAlarm: function (geo, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'AddDGGeofenceAlarm', false, { geo: geo }, succeededCallback, failedCallback, userContext);
    },
    DeleteDGGeofenceAlarm: function (Id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteDGGeofenceAlarm', false, { Id: Id }, succeededCallback, failedCallback, userContext);
    },
    UpdateDGGeofenceAlarm: function (geo, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'UpdateDGGeofenceAlarm', false, { geo: geo }, succeededCallback, failedCallback, userContext);
    },
    SearchDGGeofenceAlarm: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchDGGeofenceAlarm', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    GetDeviceReportItme: function (Loginname, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDeviceReportItme', false, { Loginname: Loginname }, succeededCallback, failedCallback, userContext);
    },
    GetTimmerSearch: function (Serialnumber, MaxTime, MinTime, Timerhouer, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetTimmerSearch', false, { Serialnumber: Serialnumber, MaxTime: MaxTime, MinTime: MinTime, Timerhouer: Timerhouer }, succeededCallback, failedCallback, userContext);
    },
    ParseAddress: function (Lat, Lng, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'ParseAddress', false, { Lat: Lat, Lng: Lng }, succeededCallback, failedCallback, userContext);
    },
    AddDGGeofence: function (geo, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'AddDGGeofence', false, { geo: geo }, succeededCallback, failedCallback, userContext);
    },
    Rep_D_Month: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_D_Month', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    U_A_Mileage: function (LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'U_A_Mileage', false, { LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    U_Month_Mileage: function (LoginName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'U_Month_Mileage', false, { LoginName: LoginName }, succeededCallback, failedCallback, userContext);
    },
    U_Day_Mileage: function (LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'U_Day_Mileage', false, { LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    DeleteDGGeofence: function (Id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteDGGeofence', false, { Id: Id }, succeededCallback, failedCallback, userContext);
    },
    UpdateDGGeofence: function (geo, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'UpdateDGGeofence', false, { geo: geo }, succeededCallback, failedCallback, userContext);
    },
    SearchHomeSafeImage: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchHomeSafeImage', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    DeleteHomeSafeImage: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteHomeSafeImage', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    SearchDGGeofence: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchDGGeofence', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    GetUserSystemInto: function (Loginname, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetUserSystemInto', false, { Loginname: Loginname }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX910DataHistory: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX910DataHistory', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX606DataHistory: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX606DataHistory', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX606DataItem: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX606DataItem', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchHomeSafeAlarm: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchHomeSafeAlarm', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SaveSHX910DataType: function (da, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SaveSHX910DataType', false, { da: da }, succeededCallback, failedCallback, userContext);
    },
    GetAllSHX910DataType: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllSHX910DataType', false, {}, succeededCallback, failedCallback, userContext);
    },
    ActivityDevice: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'ActivityDevice', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    AddQuartzJob: function (job, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'AddQuartzJob', false, { job: job }, succeededCallback, failedCallback, userContext);
    },
    DeleteQuartzJob: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteQuartzJob', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    GetJobCountBySerialNumber: function (serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetJobCountBySerialNumber', false, { serialnumber: serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX911DataHistory: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX911DataHistory', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchSHX913DeviceStateHistory: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchSHX913DeviceStateHistory', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    GetQuartzJobList: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetQuartzJobList', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchEUnicomHistory: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchEUnicomHistory', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchRep_OBDMilList: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchRep_OBDMilList', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    SearchDriverRecord: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchDriverRecord', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    GetDriverRecord: function (_id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetDriverRecord', false, { _id: _id }, succeededCallback, failedCallback, userContext);
    },
    GetAllSHX913SHX913DS: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllSHX913SHX913DS', false, {}, succeededCallback, failedCallback, userContext);
    },
    Rep_GetOutDateDeviceList: function (StartTime, EndTime, LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_GetOutDateDeviceList', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    Rep_GetNormalDeviceList: function (StartTime, EndTime, LoginName, PageIndex, PageSize, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'Rep_GetNormalDeviceList', false, { StartTime: StartTime, EndTime: EndTime, LoginName: LoginName, PageIndex: PageIndex, PageSize: PageSize }, succeededCallback, failedCallback, userContext);
    },
    GetAllSHX913ObdErrorCode: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllSHX913ObdErrorCode', false, {}, succeededCallback, failedCallback, userContext);
    },
    GetSHX913SHX913Resp: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetSHX913SHX913Resp', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    GetOBDStateInfoDeviceState: function (Serialnumber, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetOBDStateInfoDeviceState', false, { Serialnumber: Serialnumber }, succeededCallback, failedCallback, userContext);
    },
    SearchCarBrandList: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchCarBrandList', false, {}, succeededCallback, failedCallback, userContext);
    },
    SearchAllCarCarSeriesList: function (BrandName, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchAllCarCarSeriesList', false, { BrandName: BrandName }, succeededCallback, failedCallback, userContext);
    },
    SearchCarData: function (opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchCarData', false, { opt: opt }, succeededCallback, failedCallback, userContext);
    },
    GetCarData: function (_id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetCarData', false, { _id: _id }, succeededCallback, failedCallback, userContext);
    },
    SaveEDOGData: function (Data, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SaveEDOGData', false, { Data: Data }, succeededCallback, failedCallback, userContext);
    },
    SearchEDOGData: function (Opt, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SearchEDOGData', false, { Opt: Opt }, succeededCallback, failedCallback, userContext);
    },
    SaveEDOGDataType: function (Data, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SaveEDOGDataType', false, { Data: Data }, succeededCallback, failedCallback, userContext);
    },
    GetAllEDOGDataType: function (succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'GetAllEDOGDataType', false, {}, succeededCallback, failedCallback, userContext);
    },
    DeleteEDOGData: function (id, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'DeleteEDOGData', false, { id: id }, succeededCallback, failedCallback, userContext);
    },
    BatChDeleteEDOGData: function (ids, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'BatChDeleteEDOGData', false, { ids: ids }, succeededCallback, failedCallback, userContext);
    },
    SheFang: function (Serialnumber, Type, width, succeededCallback, failedCallback, userContext) {
        return this._invoke(this._get_path(), 'SheFang', false, { Serialnumber: Serialnumber, Type: Type, width: width }, succeededCallback, failedCallback, userContext);
    }
}
UserServer.registerClass('UserServer', Sys.Net.WebServiceProxy);
UserServer._staticInstance = new UserServer();
UserServer.set_path = function (value) { UserServer._staticInstance.set_path(value); }
UserServer.get_path = function () { return UserServer._staticInstance.get_path(); }
UserServer.set_timeout = function (value) { UserServer._staticInstance.set_timeout(value); }
UserServer.get_timeout = function () { return UserServer._staticInstance.get_timeout(); }
UserServer.set_defaultUserContext = function (value) { UserServer._staticInstance.set_defaultUserContext(value); }
UserServer.get_defaultUserContext = function () { return UserServer._staticInstance.get_defaultUserContext(); }
UserServer.set_defaultSucceededCallback = function (value) { UserServer._staticInstance.set_defaultSucceededCallback(value); }
UserServer.get_defaultSucceededCallback = function () { return UserServer._staticInstance.get_defaultSucceededCallback(); }
UserServer.set_defaultFailedCallback = function (value) { UserServer._staticInstance.set_defaultFailedCallback(value); }
UserServer.get_defaultFailedCallback = function () { return UserServer._staticInstance.get_defaultFailedCallback(); }
UserServer.set_enableJsonp = function (value) { UserServer._staticInstance.set_enableJsonp(value); }
UserServer.get_enableJsonp = function () { return UserServer._staticInstance.get_enableJsonp(); }
UserServer.set_jsonpCallbackParameter = function (value) { UserServer._staticInstance.set_jsonpCallbackParameter(value); }
UserServer.get_jsonpCallbackParameter = function () { return UserServer._staticInstance.get_jsonpCallbackParameter(); }
UserServer.set_path("/Server/UserServer.asmx");
UserServer.UpdateDevice = function (dev, onSuccess, onFailed, userContext) { UserServer._staticInstance.UpdateDevice(dev, onSuccess, onFailed, userContext); }
UserServer.CheFang = function (Serialnumber, Type, width, onSuccess, onFailed, userContext) { UserServer._staticInstance.CheFang(Serialnumber, Type, width, onSuccess, onFailed, userContext); }
UserServer.SearchCity_DeviceLog = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchCity_DeviceLog(opt, onSuccess, onFailed, userContext); }
UserServer.ResetDevice = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.ResetDevice(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.DeletePOIDataById = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeletePOIDataById(id, onSuccess, onFailed, userContext); }
UserServer.LoadPOIDataBySerialnumber = function (serialNumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.LoadPOIDataBySerialnumber(serialNumber, onSuccess, onFailed, userContext); }
UserServer.SHX915SUO = function (Serialnumber, ISSUO, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX915SUO(Serialnumber, ISSUO, onSuccess, onFailed, userContext); }
UserServer.SHX915Fang = function (Serialnumber, Isfang, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX915Fang(Serialnumber, Isfang, onSuccess, onFailed, userContext); }
UserServer.GetSHX009DataEntityBySerialnumber = function (Serialnumber, includeRaw, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX009DataEntityBySerialnumber(Serialnumber, includeRaw, onSuccess, onFailed, userContext); }
UserServer.GetSHX009DataEntityByFileName = function (filename, includeRaw, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX009DataEntityByFileName(filename, includeRaw, onSuccess, onFailed, userContext); }
UserServer.GetSHX009DataItemBySerialnumber = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX009DataItemBySerialnumber(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.SearchSHX009DataHistory = function (SOPT, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX009DataHistory(SOPT, onSuccess, onFailed, userContext); }
UserServer.GetSHX009PedometerCur = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX009PedometerCur(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.GetSHX009PedometerReport = function (entity, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX009PedometerReport(entity, onSuccess, onFailed, userContext); }
UserServer.SHX009Resetdometer = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX009Resetdometer(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.SHX009OpenHeartUI = function (Serialnumber, IsOpen, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX009OpenHeartUI(Serialnumber, IsOpen, onSuccess, onFailed, userContext); }
UserServer.SHX009SetPedometerTime = function (Serialnumber, Time, IsOpen, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX009SetPedometerTime(Serialnumber, Time, IsOpen, onSuccess, onFailed, userContext); }
UserServer.SHX007Setalarmclock = function (SHX007AlarmClock, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX007Setalarmclock(SHX007AlarmClock, onSuccess, onFailed, userContext); }
UserServer.SHX007SetScenemode = function (SHX007Scenemode, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX007SetScenemode(SHX007Scenemode, onSuccess, onFailed, userContext); }
UserServer.SHX007Getalarmclock = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX007Getalarmclock(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.SHX007GetScenemode = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.SHX007GetScenemode(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.PopQueryMessage = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.PopQueryMessage(onSuccess, onFailed, userContext); }
UserServer.PopManyQueryMessage = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.PopManyQueryMessage(onSuccess, onFailed, userContext); }
UserServer.PopSHX915ManyQueryMessage = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.PopSHX915ManyQueryMessage(onSuccess, onFailed, userContext); }
UserServer.PopSHX915QueryMessage = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.PopSHX915QueryMessage(onSuccess, onFailed, userContext); }
UserServer.GetDeviceTypeList = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceTypeList(onSuccess, onFailed, userContext); }
UserServer.GetDeviceTypeDetail = function (TyId, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceTypeDetail(TyId, onSuccess, onFailed, userContext); }
UserServer.UpdateDeviceType = function (TypeId, TypeName, Mo, Remark, onSuccess, onFailed, userContext) { UserServer._staticInstance.UpdateDeviceType(TypeId, TypeName, Mo, Remark, onSuccess, onFailed, userContext); }
UserServer.GetDeviceCommands = function (Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceCommands(Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.GetCommandRev = function (Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetCommandRev(Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.GeofenceSearchDevice = function (Data, onSuccess, onFailed, userContext) { UserServer._staticInstance.GeofenceSearchDevice(Data, onSuccess, onFailed, userContext); }
UserServer.SearchMuilDevice = function (SerialnumberList, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchMuilDevice(SerialnumberList, onSuccess, onFailed, userContext); }
UserServer.SearchMuilD = function (Ser, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchMuilD(Ser, onSuccess, onFailed, userContext); }
UserServer.SearchMuilU = function (LoginList, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchMuilU(LoginList, onSuccess, onFailed, userContext); }
UserServer.CancelCommand = function (Id, onSuccess, onFailed, userContext) { UserServer._staticInstance.CancelCommand(Id, onSuccess, onFailed, userContext); }
UserServer.MoveDevice = function (Serialnumber, NewUserLoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.MoveDevice(Serialnumber, NewUserLoginName, onSuccess, onFailed, userContext); }
UserServer.DeleteDevice = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteDevice(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.GetDeviceDetail = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceDetail(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.GetSHX912OptLogList = function (PageIndex, PageSize, Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX912OptLogList(PageIndex, PageSize, Serialnumber, onSuccess, onFailed, userContext); }
UserServer.SearchALUserDevice = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchALUserDevice(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.GetDeviceList = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceList(Opt, onSuccess, onFailed, userContext); }
UserServer.GetUserList = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserList(Opt, onSuccess, onFailed, userContext); }
UserServer.GetUserDevice = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserDevice(LoginName, onSuccess, onFailed, userContext); }
UserServer.JoinDeviceLocationListen = function (SerialnumberList, onSuccess, onFailed, userContext) { UserServer._staticInstance.JoinDeviceLocationListen(SerialnumberList, onSuccess, onFailed, userContext); }
UserServer.LeavDeviceLocationListen = function (SerialnumberList, onSuccess, onFailed, userContext) { UserServer._staticInstance.LeavDeviceLocationListen(SerialnumberList, onSuccess, onFailed, userContext); }
UserServer.ClearAllListen = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.ClearAllListen(onSuccess, onFailed, userContext); }
UserServer.GetListenDeviceList = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetListenDeviceList(onSuccess, onFailed, userContext); }
UserServer.GetRoleList = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetRoleList(onSuccess, onFailed, userContext); }
UserServer.GetRightList = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetRightList(onSuccess, onFailed, userContext); }
UserServer.GetRoleAndRight = function (RoleId, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetRoleAndRight(RoleId, onSuccess, onFailed, userContext); }
UserServer.RoleToRight = function (RoleId, Rights, onSuccess, onFailed, userContext) { UserServer._staticInstance.RoleToRight(RoleId, Rights, onSuccess, onFailed, userContext); }
UserServer.DeleteUser = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteUser(LoginName, onSuccess, onFailed, userContext); }
UserServer.SearchALUser = function (KeyWord, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchALUser(KeyWord, onSuccess, onFailed, userContext); }
UserServer.GetLowUser = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetLowUser(LoginName, onSuccess, onFailed, userContext); }
UserServer.GetUserDetailWithDeviceCount = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserDetailWithDeviceCount(LoginName, onSuccess, onFailed, userContext); }
UserServer.GetUserDetails = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserDetails(LoginName, onSuccess, onFailed, userContext); }
UserServer.MoveUser = function (LoginName, ParLoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.MoveUser(LoginName, ParLoginName, onSuccess, onFailed, userContext); }
UserServer.GetUserEasyUITreeNotWithCount = function (UserName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserEasyUITreeNotWithCount(UserName, onSuccess, onFailed, userContext); }
UserServer.GetUserEasyUITree = function (UserName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserEasyUITree(UserName, onSuccess, onFailed, userContext); }
UserServer.GetUserMapType = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserMapType(onSuccess, onFailed, userContext); }
UserServer.SetUserMapType = function (MapType, onSuccess, onFailed, userContext) { UserServer._staticInstance.SetUserMapType(MapType, onSuccess, onFailed, userContext); }
UserServer.GetAddress = function (lat, lng, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAddress(lat, lng, onSuccess, onFailed, userContext); }
UserServer.GetTraceLocation = function (Serialnumber, MaxTime, MinTime, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTraceLocation(Serialnumber, MaxTime, MinTime, onSuccess, onFailed, userContext); }
UserServer.GetTraceLocationList = function (SerList, MaxTime, MinTime, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTraceLocationList(SerList, MaxTime, MinTime, onSuccess, onFailed, userContext); }
UserServer.GetTraceLocation2 = function (Serialnumber, MaxTime, MinTime, MinSpeed, FilLbs, FilError, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTraceLocation2(Serialnumber, MaxTime, MinTime, MinSpeed, FilLbs, FilError, onSuccess, onFailed, userContext); }
UserServer.SaveSYConfig = function (entity, onSuccess, onFailed, userContext) { UserServer._staticInstance.SaveSYConfig(entity, onSuccess, onFailed, userContext); }
UserServer.GetConfig = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetConfig(onSuccess, onFailed, userContext); }
UserServer.GetMKCartHistory = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetMKCartHistory(LoginName, onSuccess, onFailed, userContext); }
UserServer.GetUserOrders = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserOrders(LoginName, onSuccess, onFailed, userContext); }
UserServer.SearchOrder = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchOrder(Opt, onSuccess, onFailed, userContext); }
UserServer.SearchCart = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchCart(opt, onSuccess, onFailed, userContext); }
UserServer.GetSystemInfo = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSystemInfo(onSuccess, onFailed, userContext); }
UserServer.AddGeography = function (GeographyEntity, onSuccess, onFailed, userContext) { UserServer._staticInstance.AddGeography(GeographyEntity, onSuccess, onFailed, userContext); }
UserServer.DeleteGeography = function (Id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteGeography(Id, onSuccess, onFailed, userContext); }
UserServer.SearchDevice_Geography = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchDevice_Geography(opt, onSuccess, onFailed, userContext); }
UserServer.AddMarket = function (Mrk, Ids, onSuccess, onFailed, userContext) { UserServer._staticInstance.AddMarket(Mrk, Ids, onSuccess, onFailed, userContext); }
UserServer.GetUserMrl = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserMrl(onSuccess, onFailed, userContext); }
UserServer.GetUserMrlNyId = function (Id, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserMrlNyId(Id, onSuccess, onFailed, userContext); }
UserServer.DeleteMarket = function (Mrid, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteMarket(Mrid, onSuccess, onFailed, userContext); }
UserServer.JianToFan = function (text, onSuccess, onFailed, userContext) { UserServer._staticInstance.JianToFan(text, onSuccess, onFailed, userContext); }
UserServer.GetPublicocation = function (Loginname, Pagendex, PageSize, Filter, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetPublicocation(Loginname, Pagendex, PageSize, Filter, onSuccess, onFailed, userContext); }
UserServer.SearchPublicLocationByName = function (Loginname, Pagendex, PageSize, Name, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchPublicLocationByName(Loginname, Pagendex, PageSize, Name, onSuccess, onFailed, userContext); }
UserServer.GetAllPublicLocation = function (Loginname, Pagendex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllPublicLocation(Loginname, Pagendex, PageSize, onSuccess, onFailed, userContext); }
UserServer.GetAllPublicLines = function (LoginArr, Pagendex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllPublicLines(LoginArr, Pagendex, PageSize, onSuccess, onFailed, userContext); }
UserServer.GetTraceDataByLineId = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTraceDataByLineId(id, onSuccess, onFailed, userContext); }
UserServer.ConfirmFang = function (Serialnumber, FangType, AlarmId, IsFang, onSuccess, onFailed, userContext) { UserServer._staticInstance.ConfirmFang(Serialnumber, FangType, AlarmId, IsFang, onSuccess, onFailed, userContext); }
UserServer.RemoveAlarm = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.RemoveAlarm(id, onSuccess, onFailed, userContext); }
UserServer.DeleteAlarm = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteAlarm(id, onSuccess, onFailed, userContext); }
UserServer.GetTraceDataBLineId2 = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTraceDataBLineId2(id, onSuccess, onFailed, userContext); }
UserServer.SearchLoginLog = function (StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchLoginLog(StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_SearchLoginUser = function (StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_SearchLoginUser(StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_SearchAlarm = function (StartTime, EndTime, LoginName, Serialnumber, AlarmType, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_SearchAlarm(StartTime, EndTime, LoginName, Serialnumber, AlarmType, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_SearchJinggaiAlarm = function (StartTime, EndTime, LoginName, AlarmType, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_SearchJinggaiAlarm(StartTime, EndTime, LoginName, AlarmType, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_DeviceMileage = function (LoginName, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_DeviceMileage(LoginName, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_DayMileage = function (StartTime, EndTime, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_DayMileage(StartTime, EndTime, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_TranceDetail = function (StartTime, EndTime, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_TranceDetail(StartTime, EndTime, Serialnumber, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.AddDGGeofenceAlarm = function (geo, onSuccess, onFailed, userContext) { UserServer._staticInstance.AddDGGeofenceAlarm(geo, onSuccess, onFailed, userContext); }
UserServer.DeleteDGGeofenceAlarm = function (Id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteDGGeofenceAlarm(Id, onSuccess, onFailed, userContext); }
UserServer.UpdateDGGeofenceAlarm = function (geo, onSuccess, onFailed, userContext) { UserServer._staticInstance.UpdateDGGeofenceAlarm(geo, onSuccess, onFailed, userContext); }
UserServer.SearchDGGeofenceAlarm = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchDGGeofenceAlarm(Opt, onSuccess, onFailed, userContext); }
UserServer.GetDeviceReportItme = function (Loginname, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDeviceReportItme(Loginname, onSuccess, onFailed, userContext); }
UserServer.GetTimmerSearch = function (Serialnumber, MaxTime, MinTime, Timerhouer, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetTimmerSearch(Serialnumber, MaxTime, MinTime, Timerhouer, onSuccess, onFailed, userContext); }
UserServer.ParseAddress = function (Lat, Lng, onSuccess, onFailed, userContext) { UserServer._staticInstance.ParseAddress(Lat, Lng, onSuccess, onFailed, userContext); }
UserServer.AddDGGeofence = function (geo, onSuccess, onFailed, userContext) { UserServer._staticInstance.AddDGGeofence(geo, onSuccess, onFailed, userContext); }
UserServer.Rep_D_Month = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_D_Month(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.U_A_Mileage = function (LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.U_A_Mileage(LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.U_Month_Mileage = function (LoginName, onSuccess, onFailed, userContext) { UserServer._staticInstance.U_Month_Mileage(LoginName, onSuccess, onFailed, userContext); }
UserServer.U_Day_Mileage = function (LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.U_Day_Mileage(LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.DeleteDGGeofence = function (Id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteDGGeofence(Id, onSuccess, onFailed, userContext); }
UserServer.UpdateDGGeofence = function (geo, onSuccess, onFailed, userContext) { UserServer._staticInstance.UpdateDGGeofence(geo, onSuccess, onFailed, userContext); }
UserServer.SearchHomeSafeImage = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchHomeSafeImage(opt, onSuccess, onFailed, userContext); }
UserServer.DeleteHomeSafeImage = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteHomeSafeImage(id, onSuccess, onFailed, userContext); }
UserServer.SearchDGGeofence = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchDGGeofence(Opt, onSuccess, onFailed, userContext); }
UserServer.GetUserSystemInto = function (Loginname, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetUserSystemInto(Loginname, onSuccess, onFailed, userContext); }
UserServer.SearchSHX910DataHistory = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX910DataHistory(opt, onSuccess, onFailed, userContext); }
UserServer.SearchSHX606DataHistory = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX606DataHistory(opt, onSuccess, onFailed, userContext); }
UserServer.SearchSHX606DataItem = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX606DataItem(opt, onSuccess, onFailed, userContext); }
UserServer.SearchHomeSafeAlarm = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchHomeSafeAlarm(opt, onSuccess, onFailed, userContext); }
UserServer.SaveSHX910DataType = function (da, onSuccess, onFailed, userContext) { UserServer._staticInstance.SaveSHX910DataType(da, onSuccess, onFailed, userContext); }
UserServer.GetAllSHX910DataType = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllSHX910DataType(onSuccess, onFailed, userContext); }
UserServer.ActivityDevice = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.ActivityDevice(id, onSuccess, onFailed, userContext); }
UserServer.AddQuartzJob = function (job, onSuccess, onFailed, userContext) { UserServer._staticInstance.AddQuartzJob(job, onSuccess, onFailed, userContext); }
UserServer.DeleteQuartzJob = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteQuartzJob(id, onSuccess, onFailed, userContext); }
UserServer.GetJobCountBySerialNumber = function (serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetJobCountBySerialNumber(serialnumber, onSuccess, onFailed, userContext); }
UserServer.SearchSHX911DataHistory = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX911DataHistory(opt, onSuccess, onFailed, userContext); }
UserServer.SearchSHX913DeviceStateHistory = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchSHX913DeviceStateHistory(opt, onSuccess, onFailed, userContext); }
UserServer.GetQuartzJobList = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetQuartzJobList(opt, onSuccess, onFailed, userContext); }
UserServer.SearchEUnicomHistory = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchEUnicomHistory(opt, onSuccess, onFailed, userContext); }
UserServer.SearchRep_OBDMilList = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchRep_OBDMilList(opt, onSuccess, onFailed, userContext); }
UserServer.SearchDriverRecord = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchDriverRecord(opt, onSuccess, onFailed, userContext); }
UserServer.GetDriverRecord = function (_id, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetDriverRecord(_id, onSuccess, onFailed, userContext); }
UserServer.GetAllSHX913SHX913DS = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllSHX913SHX913DS(onSuccess, onFailed, userContext); }
UserServer.Rep_GetOutDateDeviceList = function (StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_GetOutDateDeviceList(StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.Rep_GetNormalDeviceList = function (StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext) { UserServer._staticInstance.Rep_GetNormalDeviceList(StartTime, EndTime, LoginName, PageIndex, PageSize, onSuccess, onFailed, userContext); }
UserServer.GetAllSHX913ObdErrorCode = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllSHX913ObdErrorCode(onSuccess, onFailed, userContext); }
UserServer.GetSHX913SHX913Resp = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetSHX913SHX913Resp(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.GetOBDStateInfoDeviceState = function (Serialnumber, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetOBDStateInfoDeviceState(Serialnumber, onSuccess, onFailed, userContext); }
UserServer.SearchCarBrandList = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchCarBrandList(onSuccess, onFailed, userContext); }
UserServer.SearchAllCarCarSeriesList = function (BrandName, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchAllCarCarSeriesList(BrandName, onSuccess, onFailed, userContext); }
UserServer.SearchCarData = function (opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchCarData(opt, onSuccess, onFailed, userContext); }
UserServer.GetCarData = function (_id, onSuccess, onFailed, userContext) { UserServer._staticInstance.GetCarData(_id, onSuccess, onFailed, userContext); }
UserServer.SaveEDOGData = function (Data, onSuccess, onFailed, userContext) { UserServer._staticInstance.SaveEDOGData(Data, onSuccess, onFailed, userContext); }
UserServer.SearchEDOGData = function (Opt, onSuccess, onFailed, userContext) { UserServer._staticInstance.SearchEDOGData(Opt, onSuccess, onFailed, userContext); }
UserServer.SaveEDOGDataType = function (Data, onSuccess, onFailed, userContext) { UserServer._staticInstance.SaveEDOGDataType(Data, onSuccess, onFailed, userContext); }
UserServer.GetAllEDOGDataType = function (onSuccess, onFailed, userContext) { UserServer._staticInstance.GetAllEDOGDataType(onSuccess, onFailed, userContext); }
UserServer.DeleteEDOGData = function (id, onSuccess, onFailed, userContext) { UserServer._staticInstance.DeleteEDOGData(id, onSuccess, onFailed, userContext); }
UserServer.BatChDeleteEDOGData = function (ids, onSuccess, onFailed, userContext) { UserServer._staticInstance.BatChDeleteEDOGData(ids, onSuccess, onFailed, userContext); }
UserServer.SheFang = function (Serialnumber, Type, width, onSuccess, onFailed, userContext) { UserServer._staticInstance.SheFang(Serialnumber, Type, width, onSuccess, onFailed, userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('City.Entity');
if (typeof (City.Entity.Device) === 'undefined') {
    City.Entity.Device = gtc("City.Entity.Device");
    City.Entity.Device.registerClass('City.Entity.Device');
}
if (typeof (City.Entity.SearchCity_DeviceLogBox) === 'undefined') {
    City.Entity.SearchCity_DeviceLogBox = gtc("City.Entity.SearchCity_DeviceLogBox");
    City.Entity.SearchCity_DeviceLogBox.registerClass('City.Entity.SearchCity_DeviceLogBox');
}
if (typeof (EasyUIDataGrid) === 'undefined') {
    var EasyUIDataGrid = gtc("EasyUIDataGrid");
    EasyUIDataGrid.registerClass('EasyUIDataGrid');
}
Type.registerNamespace('City.Gps.WebClient.SHX009Parse');
if (typeof (City.Gps.WebClient.SHX009Parse.SHX009ResultDataRow) === 'undefined') {
    City.Gps.WebClient.SHX009Parse.SHX009ResultDataRow = gtc("City.Gps.WebClient.SHX009Parse.SHX009ResultDataRow");
    City.Gps.WebClient.SHX009Parse.SHX009ResultDataRow.registerClass('City.Gps.WebClient.SHX009Parse.SHX009ResultDataRow');
}
Type.registerNamespace('City.Entity.SHX009');
if (typeof (City.Entity.SHX009.SHX009DataItem) === 'undefined') {
    City.Entity.SHX009.SHX009DataItem = gtc("City.Entity.SHX009.SHX009DataItem");
    City.Entity.SHX009.SHX009DataItem.registerClass('City.Entity.SHX009.SHX009DataItem');
}
if (typeof (City.Entity.SHX009.SearchBox_SHX009DataItem) === 'undefined') {
    City.Entity.SHX009.SearchBox_SHX009DataItem = gtc("City.Entity.SHX009.SearchBox_SHX009DataItem");
    City.Entity.SHX009.SearchBox_SHX009DataItem.registerClass('City.Entity.SHX009.SearchBox_SHX009DataItem');
}
if (typeof (City.Entity.SHX009.SHX009PedometerCur) === 'undefined') {
    City.Entity.SHX009.SHX009PedometerCur = gtc("City.Entity.SHX009.SHX009PedometerCur");
    City.Entity.SHX009.SHX009PedometerCur.registerClass('City.Entity.SHX009.SHX009PedometerCur');
}
if (typeof (City.Entity.SHX009.SearchBox_SHX009PedometerReport) === 'undefined') {
    City.Entity.SHX009.SearchBox_SHX009PedometerReport = gtc("City.Entity.SHX009.SearchBox_SHX009PedometerReport");
    City.Entity.SHX009.SearchBox_SHX009PedometerReport.registerClass('City.Entity.SHX009.SearchBox_SHX009PedometerReport');
}
if (typeof (City.Entity.SHX009.SHX009PedometerReport) === 'undefined') {
    City.Entity.SHX009.SHX009PedometerReport = gtc("City.Entity.SHX009.SHX009PedometerReport");
    City.Entity.SHX009.SHX009PedometerReport.registerClass('City.Entity.SHX009.SHX009PedometerReport');
}
if (typeof (City.Entity.SHX007AlarmClock) === 'undefined') {
    City.Entity.SHX007AlarmClock = gtc("City.Entity.SHX007AlarmClock");
    City.Entity.SHX007AlarmClock.registerClass('City.Entity.SHX007AlarmClock');
}
if (typeof (City.Entity.SHX007Scenemode) === 'undefined') {
    City.Entity.SHX007Scenemode = gtc("City.Entity.SHX007Scenemode");
    City.Entity.SHX007Scenemode.registerClass('City.Entity.SHX007Scenemode');
}
if (typeof (City.Entity.MG_UserMessageQuery) === 'undefined') {
    City.Entity.MG_UserMessageQuery = gtc("City.Entity.MG_UserMessageQuery");
    City.Entity.MG_UserMessageQuery.registerClass('City.Entity.MG_UserMessageQuery');
}
if (typeof (City.Entity.MG_UserMsgM) === 'undefined') {
    City.Entity.MG_UserMsgM = gtc("City.Entity.MG_UserMsgM");
    City.Entity.MG_UserMsgM.registerClass('City.Entity.MG_UserMsgM');
}
if (typeof (City.Entity.SHX915_MG_UserMsgM) === 'undefined') {
    City.Entity.SHX915_MG_UserMsgM = gtc("City.Entity.SHX915_MG_UserMsgM");
    City.Entity.SHX915_MG_UserMsgM.registerClass('City.Entity.SHX915_MG_UserMsgM');
}
if (typeof (City.Entity.SHX915_MG_UserMessageQuery) === 'undefined') {
    City.Entity.SHX915_MG_UserMessageQuery = gtc("City.Entity.SHX915_MG_UserMessageQuery");
    City.Entity.SHX915_MG_UserMessageQuery.registerClass('City.Entity.SHX915_MG_UserMessageQuery');
}
if (typeof (City.Entity.DeviceTypes) === 'undefined') {
    City.Entity.DeviceTypes = gtc("City.Entity.DeviceTypes");
    City.Entity.DeviceTypes.registerClass('City.Entity.DeviceTypes');
}
if (typeof (City.Entity.DeviceSearchOpt) === 'undefined') {
    City.Entity.DeviceSearchOpt = gtc("City.Entity.DeviceSearchOpt");
    City.Entity.DeviceSearchOpt.registerClass('City.Entity.DeviceSearchOpt');
}
Type.registerNamespace('City.Entity.SearchBox');
if (typeof (City.Entity.SearchBox.UserSearchOpt) === 'undefined') {
    City.Entity.SearchBox.UserSearchOpt = gtc("City.Entity.SearchBox.UserSearchOpt");
    City.Entity.SearchBox.UserSearchOpt.registerClass('City.Entity.SearchBox.UserSearchOpt');
}
if (typeof (City.Entity.Role) === 'undefined') {
    City.Entity.Role = gtc("City.Entity.Role");
    City.Entity.Role.registerClass('City.Entity.Role');
}
if (typeof (City.Entity.Right) === 'undefined') {
    City.Entity.Right = gtc("City.Entity.Right");
    City.Entity.Right.registerClass('City.Entity.Right');
}
if (typeof (City.Entity.User) === 'undefined') {
    City.Entity.User = gtc("City.Entity.User");
    City.Entity.User.registerClass('City.Entity.User');
}
if (typeof (City.Entity.SP_GetUserDetailWithDeviceCount_Result) === 'undefined') {
    City.Entity.SP_GetUserDetailWithDeviceCount_Result = gtc("City.Entity.SP_GetUserDetailWithDeviceCount_Result");
    City.Entity.SP_GetUserDetailWithDeviceCount_Result.registerClass('City.Entity.SP_GetUserDetailWithDeviceCount_Result');
}
if (typeof (EasyUITreeNote) === 'undefined') {
    var EasyUITreeNote = gtc("EasyUITreeNote");
    EasyUITreeNote.registerClass('EasyUITreeNote');
}
if (typeof (City.Entity.Lo_Location) === 'undefined') {
    City.Entity.Lo_Location = gtc("City.Entity.Lo_Location");
    City.Entity.Lo_Location.registerClass('City.Entity.Lo_Location');
}
if (typeof (City.Entity.TraceS) === 'undefined') {
    City.Entity.TraceS = gtc("City.Entity.TraceS");
    City.Entity.TraceS.registerClass('City.Entity.TraceS');
}
Type.registerNamespace('City.Entity.SystemInfo');
if (typeof (City.Entity.SystemInfo.SYConfig) === 'undefined') {
    City.Entity.SystemInfo.SYConfig = gtc("City.Entity.SystemInfo.SYConfig");
    City.Entity.SystemInfo.SYConfig.registerClass('City.Entity.SystemInfo.SYConfig');
}
if (typeof (City.Entity.Ord_MoneyCart) === 'undefined') {
    City.Entity.Ord_MoneyCart = gtc("City.Entity.Ord_MoneyCart");
    City.Entity.Ord_MoneyCart.registerClass('City.Entity.Ord_MoneyCart');
}
if (typeof (City.Entity.Ord_OrderInto) === 'undefined') {
    City.Entity.Ord_OrderInto = gtc("City.Entity.Ord_OrderInto");
    City.Entity.Ord_OrderInto.registerClass('City.Entity.Ord_OrderInto');
}
if (typeof (City.Entity.OrderIntoSearchOpt) === 'undefined') {
    City.Entity.OrderIntoSearchOpt = gtc("City.Entity.OrderIntoSearchOpt");
    City.Entity.OrderIntoSearchOpt.registerClass('City.Entity.OrderIntoSearchOpt');
}
if (typeof (City.Entity.MoneyCartSearchOpt) === 'undefined') {
    City.Entity.MoneyCartSearchOpt = gtc("City.Entity.MoneyCartSearchOpt");
    City.Entity.MoneyCartSearchOpt.registerClass('City.Entity.MoneyCartSearchOpt');
}
if (typeof (City.Entity.SystemInfo.SystemInfo) === 'undefined') {
    City.Entity.SystemInfo.SystemInfo = gtc("City.Entity.SystemInfo.SystemInfo");
    City.Entity.SystemInfo.SystemInfo.registerClass('City.Entity.SystemInfo.SystemInfo');
}
if (typeof (City.Entity.Device_Geography) === 'undefined') {
    City.Entity.Device_Geography = gtc("City.Entity.Device_Geography");
    City.Entity.Device_Geography.registerClass('City.Entity.Device_Geography');
}
if (typeof (City.Entity.Device_GeographySearchOpt) === 'undefined') {
    City.Entity.Device_GeographySearchOpt = gtc("City.Entity.Device_GeographySearchOpt");
    City.Entity.Device_GeographySearchOpt.registerClass('City.Entity.Device_GeographySearchOpt');
}
if (typeof (City.Entity.WS_Marker) === 'undefined') {
    City.Entity.WS_Marker = gtc("City.Entity.WS_Marker");
    City.Entity.WS_Marker.registerClass('City.Entity.WS_Marker');
}
if (typeof (City.Entity.WS_UserLines) === 'undefined') {
    City.Entity.WS_UserLines = gtc("City.Entity.WS_UserLines");
    City.Entity.WS_UserLines.registerClass('City.Entity.WS_UserLines');
}
Type.registerNamespace('City.Gps.WebClient.Server');
if (typeof (City.Gps.WebClient.Server.GetLineDetailResult) === 'undefined') {
    City.Gps.WebClient.Server.GetLineDetailResult = gtc("City.Gps.WebClient.Server.GetLineDetailResult");
    City.Gps.WebClient.Server.GetLineDetailResult.registerClass('City.Gps.WebClient.Server.GetLineDetailResult');
}
if (typeof (City.Entity.DGGeofence_Alarm) === 'undefined') {
    City.Entity.DGGeofence_Alarm = gtc("City.Entity.DGGeofence_Alarm");
    City.Entity.DGGeofence_Alarm.registerClass('City.Entity.DGGeofence_Alarm');
}
if (typeof (City.Entity.DGGeofenceAlarmOpt) === 'undefined') {
    City.Entity.DGGeofenceAlarmOpt = gtc("City.Entity.DGGeofenceAlarmOpt");
    City.Entity.DGGeofenceAlarmOpt.registerClass('City.Entity.DGGeofenceAlarmOpt');
}
if (typeof (City.Entity.SystemInfo.DeviceReport) === 'undefined') {
    City.Entity.SystemInfo.DeviceReport = gtc("City.Entity.SystemInfo.DeviceReport");
    City.Entity.SystemInfo.DeviceReport.registerClass('City.Entity.SystemInfo.DeviceReport');
}
if (typeof (City.Entity.TimmerSearch) === 'undefined') {
    City.Entity.TimmerSearch = gtc("City.Entity.TimmerSearch");
    City.Entity.TimmerSearch.registerClass('City.Entity.TimmerSearch');
}
if (typeof (City.Entity.DGGeofence) === 'undefined') {
    City.Entity.DGGeofence = gtc("City.Entity.DGGeofence");
    City.Entity.DGGeofence.registerClass('City.Entity.DGGeofence');
}
if (typeof (City.Entity.HomeSafeImageSearchOpt) === 'undefined') {
    City.Entity.HomeSafeImageSearchOpt = gtc("City.Entity.HomeSafeImageSearchOpt");
    City.Entity.HomeSafeImageSearchOpt.registerClass('City.Entity.HomeSafeImageSearchOpt');
}
if (typeof (City.Entity.SearchBox.DGGeofenceOpt) === 'undefined') {
    City.Entity.SearchBox.DGGeofenceOpt = gtc("City.Entity.SearchBox.DGGeofenceOpt");
    City.Entity.SearchBox.DGGeofenceOpt.registerClass('City.Entity.SearchBox.DGGeofenceOpt');
}
if (typeof (City.Entity.UserSysteminfo) === 'undefined') {
    City.Entity.UserSysteminfo = gtc("City.Entity.UserSysteminfo");
    City.Entity.UserSysteminfo.registerClass('City.Entity.UserSysteminfo');
}
if (typeof (City.Entity.SHX910DataHistorySearchOpt) === 'undefined') {
    City.Entity.SHX910DataHistorySearchOpt = gtc("City.Entity.SHX910DataHistorySearchOpt");
    City.Entity.SHX910DataHistorySearchOpt.registerClass('City.Entity.SHX910DataHistorySearchOpt');
}
if (typeof (City.Entity.SHX606DataHistorySearchOpt) === 'undefined') {
    City.Entity.SHX606DataHistorySearchOpt = gtc("City.Entity.SHX606DataHistorySearchOpt");
    City.Entity.SHX606DataHistorySearchOpt.registerClass('City.Entity.SHX606DataHistorySearchOpt');
}
if (typeof (City.Entity.SearchOpt) === 'undefined') {
    City.Entity.SearchOpt = gtc("City.Entity.SearchOpt");
    City.Entity.SearchOpt.registerClass('City.Entity.SearchOpt');
}
Type.registerNamespace('City.Entity.E_Device');
if (typeof (City.Entity.E_Device.SHX910DataType) === 'undefined') {
    City.Entity.E_Device.SHX910DataType = gtc("City.Entity.E_Device.SHX910DataType");
    City.Entity.E_Device.SHX910DataType.registerClass('City.Entity.E_Device.SHX910DataType');
}
Type.registerNamespace('City.Entity.Quartz');
if (typeof (City.Entity.Quartz.QuartzJob) === 'undefined') {
    City.Entity.Quartz.QuartzJob = gtc("City.Entity.Quartz.QuartzJob");
    City.Entity.Quartz.QuartzJob.registerClass('City.Entity.Quartz.QuartzJob');
}
if (typeof (City.Entity.SHX913DeviceStateHistoryOpt) === 'undefined') {
    City.Entity.SHX913DeviceStateHistoryOpt = gtc("City.Entity.SHX913DeviceStateHistoryOpt");
    City.Entity.SHX913DeviceStateHistoryOpt.registerClass('City.Entity.SHX913DeviceStateHistoryOpt');
}
Type.registerNamespace('City.Entity.OBD');
if (typeof (City.Entity.OBD.SHX913DeviceStateHistory) === 'undefined') {
    City.Entity.OBD.SHX913DeviceStateHistory = gtc("City.Entity.OBD.SHX913DeviceStateHistory");
    City.Entity.OBD.SHX913DeviceStateHistory.registerClass('City.Entity.OBD.SHX913DeviceStateHistory');
}
Type.registerNamespace('City.Entity.E_SearchBox');
if (typeof (City.Entity.E_SearchBox.QuartzJobSearchOpt) === 'undefined') {
    City.Entity.E_SearchBox.QuartzJobSearchOpt = gtc("City.Entity.E_SearchBox.QuartzJobSearchOpt");
    City.Entity.E_SearchBox.QuartzJobSearchOpt.registerClass('City.Entity.E_SearchBox.QuartzJobSearchOpt');
}
if (typeof (City.Entity.MobileCartHistoreSearchOpt) === 'undefined') {
    City.Entity.MobileCartHistoreSearchOpt = gtc("City.Entity.MobileCartHistoreSearchOpt");
    City.Entity.MobileCartHistoreSearchOpt.registerClass('City.Entity.MobileCartHistoreSearchOpt');
}
if (typeof (City.Entity.Rep_OBDMilSearchOpt) === 'undefined') {
    City.Entity.Rep_OBDMilSearchOpt = gtc("City.Entity.Rep_OBDMilSearchOpt");
    City.Entity.Rep_OBDMilSearchOpt.registerClass('City.Entity.Rep_OBDMilSearchOpt');
}
if (typeof (City.Entity.OBD.Rep_OBDMil) === 'undefined') {
    City.Entity.OBD.Rep_OBDMil = gtc("City.Entity.OBD.Rep_OBDMil");
    City.Entity.OBD.Rep_OBDMil.registerClass('City.Entity.OBD.Rep_OBDMil');
}
if (typeof (City.Entity.DriverRecordSearchOpt) === 'undefined') {
    City.Entity.DriverRecordSearchOpt = gtc("City.Entity.DriverRecordSearchOpt");
    City.Entity.DriverRecordSearchOpt.registerClass('City.Entity.DriverRecordSearchOpt');
}
if (typeof (City.Entity.OBD.DriverRecord) === 'undefined') {
    City.Entity.OBD.DriverRecord = gtc("City.Entity.OBD.DriverRecord");
    City.Entity.OBD.DriverRecord.registerClass('City.Entity.OBD.DriverRecord');
}
if (typeof (City.Entity.OBD.OBDStateInfo) === 'undefined') {
    City.Entity.OBD.OBDStateInfo = gtc("City.Entity.OBD.OBDStateInfo");
    City.Entity.OBD.OBDStateInfo.registerClass('City.Entity.OBD.OBDStateInfo');
}
if (typeof (City.Entity.OBD.ObdErrorCode) === 'undefined') {
    City.Entity.OBD.ObdErrorCode = gtc("City.Entity.OBD.ObdErrorCode");
    City.Entity.OBD.ObdErrorCode.registerClass('City.Entity.OBD.ObdErrorCode');
}
if (typeof (City.Entity.E_Device.ObdResponse) === 'undefined') {
    City.Entity.E_Device.ObdResponse = gtc("City.Entity.E_Device.ObdResponse");
    City.Entity.E_Device.ObdResponse.registerClass('City.Entity.E_Device.ObdResponse');
}
if (typeof (City.Entity.OBD.SHX913DeviceState) === 'undefined') {
    City.Entity.OBD.SHX913DeviceState = gtc("City.Entity.OBD.SHX913DeviceState");
    City.Entity.OBD.SHX913DeviceState.registerClass('City.Entity.OBD.SHX913DeviceState');
}
if (typeof (City.Entity.CarDataSearchBox) === 'undefined') {
    City.Entity.CarDataSearchBox = gtc("City.Entity.CarDataSearchBox");
    City.Entity.CarDataSearchBox.registerClass('City.Entity.CarDataSearchBox');
}
if (typeof (City.Entity.OBD.CarData) === 'undefined') {
    City.Entity.OBD.CarData = gtc("City.Entity.OBD.CarData");
    City.Entity.OBD.CarData.registerClass('City.Entity.OBD.CarData');
}
if (typeof (City.Entity.EDOGData) === 'undefined') {
    City.Entity.EDOGData = gtc("City.Entity.EDOGData");
    City.Entity.EDOGData.registerClass('City.Entity.EDOGData');
}
if (typeof (City.Entity.EDOGDataSearchOpt) === 'undefined') {
    City.Entity.EDOGDataSearchOpt = gtc("City.Entity.EDOGDataSearchOpt");
    City.Entity.EDOGDataSearchOpt.registerClass('City.Entity.EDOGDataSearchOpt');
}
if (typeof (City.Entity.EDOGDataType) === 'undefined') {
    City.Entity.EDOGDataType = gtc("City.Entity.EDOGDataType");
    City.Entity.EDOGDataType.registerClass('City.Entity.EDOGDataType');
}
