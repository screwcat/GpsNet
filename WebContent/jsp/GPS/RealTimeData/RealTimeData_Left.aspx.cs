using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LM.Web.RMBase;
using LM.Entitys;
using System.Text;
using LM.Common;

namespace LM.Web.GPS.RealTimeData
{
    public partial class RealTimeData_Left : PageBase
    {
        public StringBuilder sb = new StringBuilder();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                this.InitOrgInfo();

                var userInfo = LM.Common.DotNetBean.RequestSession.GetSessionUser();

                if (userInfo.User_Account == "system")
                {
                    createtree(ComList, 0, sb);
                }
                else
                {
                    createtree(ComList, Convert.ToInt32(userInfo.ComIds), sb);
                }
                sb.Append("]");
                this.NodesData = "[" + sb.ToString();

            }
        }
        protected string NodesData;
        private List<Company> ComList;
        private List<Company> cList;
        protected void InitOrgInfo()
        {
            var userInfo = LM.Common.DotNetBean.RequestSession.GetSessionUser();
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
                    object s = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetCompanyListByPageWebService", new object[] { });
                    Result o = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(s));

                    if (JsonHelp.IsJson(o.Info.ToString()))
                    {
                        ComList = PuHua.Common.JsonHelper.Deserialize<List<Company>>(o.Info.ToString());
                    }
                    object s2 = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetCompanyByIdWebService", new object[] { Convert.ToInt32(userInfo.ComIds) });
                    Result o2 = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(s2));

                    if (JsonHelp.IsJson(o2.Info.ToString()))
                    {

                        cList = PuHua.Common.JsonHelper.NewtonsoftDeserialize<List<Company>>("[" + o2.Info.ToString() + "]");
                    }
                    foreach (Company cInfo in cList)
                    {
                        sb.Append("{ id:\"" + cInfo.Id + "\", pId:\"" + cInfo.ParentId + "\", name:\"" + cInfo.ComName + "\"}");
                    }
                }
            }
        }

        private void createtree(List<Company> listu, int parentid, StringBuilder sb)
        {
            var listinfo = listu.FindAll(e => e.ParentId == parentid);
            if (listinfo != null && listinfo.Count > 0)
            {
                foreach (Company uinfo in listinfo)
                {
                    var sublist = listu.FindAll(e => e.ParentId == uinfo.Id);
                    if (!string.IsNullOrEmpty(sb.ToString()))
                    {
                        sb.Append(",{ id:\"" + uinfo.Id + "\", pId:\"" + uinfo.ParentId + "\", name:\"" + uinfo.ComName + "\"}");
                    }
                    else
                    {
                        sb.Append("{ id:\"" + uinfo.Id + "\", pId:\"" + uinfo.ParentId + "\", name:\"" + uinfo.ComName + "\"}");
                    }
                    if (sublist != null && sublist.Count > 0)
                        createtree(listu, uinfo.Id, sb);
                }
            }
        }
    }
}