<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoogleGeofences_Left.aspx.cs"
    Inherits="LM.Web.GPS.GoogleGeofences.GoogleGeofences_Left" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="/Themes/Styles/Site.css" rel="stylesheet" type="text/css" />
    <script src="../../Styles/zTreeStyle/jquery-1.4.2.js" type="text/javascript"></script>
    <script src="../../Styles/zTreeStyle/jquery.ztree-2.6.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Styles/zTreeStyle/demoTools.js"></script>
    <link href="../../Styles/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        var zTree;
		var demoIframe;

	    setting = {
		    isSimpleData: true,
		    treeNodeKey: "id",
		    treeNodeParentKey: "pId",
	
		callback: {
 
            expandSpeed: "",
			beforeClick: zTreeOnBeforeClick,
			click: zTreeOnClick
		}
		
	};
		zNodes = <%=NodesData %>;
	
		
		$(document).ready(function(){
		reloadTree();

		 
	});
    	function zTreeOnBeforeClick(treeId, treeNode) {
  
	}
	
	function zTreeOnClick(event, treeId, treeNode) {
		if (treeNode) {
                if (treeNode.pId == null || treeNode.pId == 0 || treeNode.pId == 26) {
                    return;
                }
                var cname = treeNode.name;
                var path = '/Gps/GoogleGeofences/Geofences.aspx?DeviceId=' + treeNode.id+"&cname="+escape(cname);
                window.parent.frames["target_right"].location = path;
		}
	}

     function reloadTree() {

		zTree = $("#tree").zTree(setting, clone(zNodes));
	}	
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="btnbartitle">
            <div>
                车辆信息
            </div>
        </div>
       <div class="div-body" style="position:absolute; width:230px; height:100%;">
           <ul id="tree" class="tree" style=" position:relative; width:220px; height:98%; overflow-x:scroll; ">
           </ul>
        </div>
        <input type="hidden" id = "hdDeviceId" runat="server" />
    </form>
</body>
</html>
