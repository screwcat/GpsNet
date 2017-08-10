using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LM.Web.RMBase;
using LM.Common;
using LM.Entitys;
using Wuqi.Webdiyer;
using System.IO;
using System.Text;

namespace LM.Web.GPS.RealTimeData
{
    public partial class RealTimeData_List : PageBase
    {
        List<GPSOnlineInfo> glist = new List<GPSOnlineInfo>();
        List<GPSOnlineInfo> gpslist = new List<GPSOnlineInfo>();
        int PageIndex = 1;
        int PageSize = 30;
        int rowCount = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsCallback)
            {
                InitData();
            }
        }
        //读取实时数据
        public void InitData()
        {
            int ComId = PuHua.Common.PhRequest.GetQueryInt("ComId", 0);
            if (ComId != 0)
            {
                object o = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetOnlineVechicleInfoByComIdWebService", new object[] { ComId, PageIndex, PageSize });
                Result dr = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(o));

                if (JsonHelp.IsJson(dr.Info.ToString()))
                {
                    glist = PuHua.Common.JsonHelper.Deserialize<List<GPSOnlineInfo>>(dr.Info.ToString());
                    if (glist.Count > 0)
                    {
                        foreach (GPSOnlineInfo gInfo in glist)
                        {
                            //计算未上线时长
                            TimeSpan ts = DateTime.Now - Convert.ToDateTime(gInfo.SendTime);
                            gInfo.UnOnlineTime = ts.Days.ToString();
                            //格式化时间
                            //DateTime dt;
                            //DateTime.TryParse(gInfo.SendTime, dt);
                            gInfo.SendTime = Convert.ToDateTime(gInfo.SendTime).ToString("yyyy-MM-dd HH:mm:ss");
                        }
                    }
                }
                rowCount = dr.RowNumber;
                AspNetPager1.RecordCount = Convert.ToInt32(rowCount);
                AspNetPager1.PageSize = 30;
            }
        }
        protected void AspNetPager1_PageChanging(object src, PageChangingEventArgs e)
        {
            AspNetPager1.CurrentPageIndex = e.NewPageIndex;
            this.PageIndex = e.NewPageIndex;
            this.InitData();
        }
        protected List<GPSOnlineInfo> gList
        {
            get { return this.glist; }
        }

        protected void btnInputExcel_Click(object sender, EventArgs e)
        {
            InitAllData();
            string FileName = DateTime.Now.ToShortDateString() + Guid.NewGuid().ToString().Substring(0, 5) + ".xls"; Response.Charset = "UTF-8";
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
            if (Path.GetFileNameWithoutExtension(FileName).Length < 24)
            {
                Response.AppendHeader("Content-Disposition", "attachment;filename="
                          + HttpUtility.UrlEncode(Path.GetFileNameWithoutExtension(FileName) + Path.GetExtension(FileName)));
            }
            else
            {
                Response.AppendHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(
                                        Path.GetFileNameWithoutExtension(FileName).Substring(0, 24) + Path.GetExtension(FileName)));
            }
            Response.ContentType = "application/ms-excel";
            this.EnableViewState = false;
            System.IO.StringWriter tw = new System.IO.StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(tw);
            hdExcelData.RenderControl(hw);
            Response.Write("<style type='text/css'>td{text-align:left;border:solid 1px Black;}</style>");
            Response.Write(AddExcelHead()); //显示网格线
            Response.Write(tw.ToString());
            Response.Write(AddExcelbottom());//显示网格线
            // Response.Flush();
            Response.End();
        }
        public static string AddExcelHead()
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            sb.Append("<html xmlns:x=\"urn:schemas-microsoft-com:office:excel\">");
            sb.Append(" <head>");
            sb.Append(" <!--[if gte mso 9]><xml>");
            sb.Append("<x:ExcelWorkbook>");
            sb.Append("<x:ExcelWorksheets>");
            sb.Append("<x:ExcelWorksheet>");
            sb.Append("<x:Name></x:Name>");
            sb.Append("<x:WorksheetOptions>");
            sb.Append("<x:Print>");
            sb.Append("<x:ValidPrinterInfo />");
            sb.Append(" </x:Print>");
            sb.Append("</x:WorksheetOptions>");
            sb.Append("</x:ExcelWorksheet>");
            sb.Append("</x:ExcelWorksheets>");
            sb.Append("</x:ExcelWorkbook>");
            sb.Append("</xml>");
            sb.Append("<![endif]-->");
            sb.Append(" </head>");
            sb.Append("<body>");
            return sb.ToString();
        }
        public static string AddExcelbottom()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("</body>");
            sb.Append("</html>");
            return sb.ToString();
        }

        public void InitAllData()
        {
            int ComId = PuHua.Common.PhRequest.GetQueryInt("ComId", 0);
            if (ComId != 0)
            {
                object o = DynamicWebServices.InvokeWebService(WebServiceURL.BasInfoeWebService, "GetOnlineDataByComIdWebService", new object[] { ComId });
                Result dr = PuHua.Common.JsonHelper.Deserialize<Result>(Convert.ToString(o));

                if (JsonHelp.IsJson(dr.Info.ToString()))
                {
                    gpslist = PuHua.Common.JsonHelper.Deserialize<List<GPSOnlineInfo>>(dr.Info.ToString());
                    if (glist.Count > 0)
                    {
                        foreach (GPSOnlineInfo gInfo in gpslist)
                        {
                            //计算未上线时长
                            TimeSpan ts = DateTime.Now - Convert.ToDateTime(gInfo.SendTime);
                            gInfo.UnOnlineTime = ts.Days.ToString();
                            //格式化时间
                            gInfo.SendTime = Convert.ToDateTime(gInfo.SendTime).ToString("yyyy-MM-dd HH:mm:ss");
                        }
                    }
                }
            }
        }
        protected List<GPSOnlineInfo> gpsList
        {
            get { return this.gpslist; }
        }
    }
}