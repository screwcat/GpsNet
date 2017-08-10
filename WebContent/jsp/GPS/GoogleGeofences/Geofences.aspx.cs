using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LM.Web.RMBase;

namespace LM.Web.GPS.GoogleGeofences
{
    public partial class Geofences : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string imei = PuHua.Common.PhRequest.GetQueryString("deviceid");
            this.hidDeviceID.Value = imei;
            string DeviceName = PuHua.Common.PhRequest.GetQueryString("cname");
            this.hidDeviceName.Value = DeviceName;
        }
    }
}