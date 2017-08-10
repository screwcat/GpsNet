using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LM.Common;
using System.Text;
using LM.Entitys;
using LM.Web.RMBase;

namespace LM.Web.GPS.GoogleGeofences
{
    public partial class GoogleGeofences_Left : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Result rt = new Result();
            if (!this.Page.IsPostBack)
            {
                StringBuilder sb = new StringBuilder();
                this.InitDataDicInfo(sb);

                this.NodesData = "[" + sb.ToString() + "]";

            }
        }
        protected string NodesData;
        private List<Company> ComList;
        private List<VehicleEntity> vList;
        protected void InitDataDicInfo(StringBuilder sb)
        {
            var userInfo = LM.Common.DotNetBean.RequestSession.GetSessionUser();

            string ids = userInfo.ComIds;

            if (this.ComList == null)
            {
                if (userInfo.User_Account == "system")
                {
                    object s = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetCompanyListByPageWebService", new object[] { });
                    Result o = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(s));

                    if (JsonHelp.IsJson(o.Info.ToString()))
                    {
                        ComList = PuHua.Common.JsonHelper.Deserialize<List<Company>>(o.Info.ToString());
                    }
                }
                else
                {

                    object s = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetCompanyByIdSWebService", new object[] { ids });
                    Result o = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(s));

                    if (JsonHelp.IsJson(o.Info.ToString()))
                    {
                        ComList = PuHua.Common.JsonHelper.Deserialize<List<Company>>(o.Info.ToString());
                    }
                }

                int outsideCount = 0;
                foreach (Company ComIds in ComList)
                {
                    int ComId = ComIds.Id;
                    object os = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetVehicleInfoByComIdWebService", new object[] { ComId });
                    Result re = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(os));

                    if (JsonHelp.IsJson(re.Info.ToString()))
                    {
                        vList = PuHua.Common.JsonHelper.Deserialize<List<VehicleEntity>>(re.Info.ToString());
                        if (outsideCount > 0)
                        {
                            sb.Append(",{ id:" + ComIds.Id + ", pId:" + ComIds.ParentId + ", name:\"" + ComIds.ComName + "\"}");
                        }
                        else
                        {
                            sb.Append("{ id:" + ComIds.Id + ", pId:" + ComIds.ParentId + ", name:\"" + ComIds.ComName + "\"}");
                        }
                        foreach (VehicleEntity vinfo in vList)
                        {
                            if (!string.IsNullOrEmpty(sb.ToString()))
                            {
                                sb.Append(",{ id:" + vinfo.imei + ", pId:" + ComIds.Id + ", name:\"" + vinfo.PlateNo + "\"}");
                            }
                            else
                            {
                                sb.Append(",{ id:" + vinfo.imei + ", pId:" + ComIds.Id + ", name:\"" + vinfo.PlateNo + "\"}");
                            }
                        }
                    }
                    outsideCount++;
                }
            }
        }
    }
}