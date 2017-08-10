<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext['request'].contextPath}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="../../Themes/Scripts/dialog_v2/bmap.css" rel="stylesheet" type="text/css" />
    <script src="../../Themes/Scripts/dialog_v2/dialog.v2.js" type="text/javascript"></script>
    <script src="../../Themes/Scripts/dialog_v2/fix-table-header.js" type="text/javascript"></script>
    <script src="../../Themes/Scripts/dialog_v2/printer.js" type="text/javascript"></script>
    <style type="text/css">
        .gm_dialog
        {
            visibility: hidden;
            position: absolute;
            z-index: 999;
            border: 5px solid #3873C9;
            font-size: 13px;
            background-color: #fff;
            border-radius: 5px;
        }
        .gm_zindex_max
        {
            z-index: 9999;
        }
        .gm_dialog_head
        {
            height: 24px;
            background: #3873C9;
            color: #FFF; 
            cursor: move;
        }
        .gm_dialog_title
        {
            float: left;
            width: auto;
            padding-left: 10px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            font-weight: bold;
        }
        .gm_dialog_func
        {
            float: right;
            padding-right: 4px;
            padding-top: 3px;
        }
        .gm_dialog img
        {
            border: 0;
        }
        .gm_dialog a
        {
            margin-left: 6px;
        }
        .gm_dialog_min
        {
        }
        .gm_dialog_max
        {
            display: none;
        }
        .gm_dialog_iframe
        {
            width: 100%;
        }
        .gm_dialog_mask
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            filter: alpha(opacity=0);
            opacity: 0;
            background: transparent;
            z-index: 998;
            display: none;
        }
        .gm_dialog_inner_mask
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            filter: alpha(opacity=0);
            opacity: 0;
            background: #fff;
            z-index: 998;
            margin-top: 24px;
        }
        .gm_dialog
        {
            visibility: hidden;
            position: absolute;
            z-index: 999;
            border: 5px solid #3873C9;
            font-size: 13px;
            background-color: #fff;
            border-radius: 5px;
        }
        .gm_zindex_max
        {
            z-index: 9999;
        }
        .gm_dialog_head
        {
            height: 24px;
            background: #3873C9;
            color: #FFF;
            cursor: move;
        }
        .gm_dialog_title
        {
            float: left;
            width: auto;
            padding-left: 10px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            font-weight: bold;
        }
        .gm_dialog_func
        {
            float: right;
            padding-right: 4px;
            padding-top: 3px;
        }
        .gm_dialog img
        {
            border: 0;
        }
        .gm_dialog a
        {
            margin-left: 6px;
        }
        .gm_dialog_min
        {
        }
        .gm_dialog_max
        {
            display: none;
        }
        .gm_dialog_iframe
        {
            width: 100%;
        }
        .gm_dialog_mask
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            filter: alpha(opacity=0);
            opacity: 0;
            background: transparent;
            z-index: 998;
            display: none;
        }
        .gm_dialog_inner_mask
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            filter: alpha(opacity=0);
            opacity: 0;
            background: #fff;
            z-index: 998;
            margin-top: 24px;
        }
    </style>
</head>
<body>
    <form>
    <div class="gm_dialog" id="" style="width: 324px; height: 228px; bottom: 285px; left: 558px;
        visibility: visible;">
        <div class="gm_dialog_head">
            <div class="gm_dialog_title">
                轨迹回放完毕</div>
            <div class="gm_dialog_func">
                <a href="javascript:;" class="gm_dialog_min" style="display: none;">
                    <img src="http://static.gpsoo.net/dealer/images/iw_min.gif"></a> <a href="javascript:;"
                        class="gm_dialog_max">
                        <img src="http://static.gpsoo.net/dealer/images/iw_max.gif"></a> <a href="javascript:;"
                            class="gm_dialog_close">
                            <img src="http://static.gpsoo.net/dealer/images/iw_close.gif"></a></div>
        </div>
        <div class="gm_dialog_body" style="width: 322px; height: 200px;">
            <div class="play-over-info">
                <h3 class="title">
                    <span class="icon"></span>轨迹回放完毕</h3>
                <ul>
                    <li>开始时间&nbsp;2015-01-26 10:27:22</li><li>结束时间&nbsp;2015-01-26 11:27:22</li><li>行驶里程&nbsp;8.633公里</li><li
                        class="line-btns">
                        <input type="button" class="btn btn-ok" onclick="infoPanel.dialog.closeWinLayer();"
                            value="确定"><a id="view-travel" class="travel-view" href="###">查看行程</a><a id="view-path"
                                class="path-view" href="###">下载轨迹</a></li></ul>
            </div>
        </div>
    </div>
    <div class="gm_dialog_head">
        <div class="gm_dialog_title">
            轨迹回放完毕</div>
        <div class="gm_dialog_func">
            <a href="javascript:;" class="gm_dialog_min" style="display: none;">
                <img src="http://static.gpsoo.net/dealer/images/iw_min.gif"></a> <a href="javascript:;"
                    class="gm_dialog_max">
                    <img src="http://static.gpsoo.net/dealer/images/iw_max.gif"></a> <a href="javascript:;"
                        class="gm_dialog_close">
                        <img src="http://static.gpsoo.net/dealer/images/iw_close.gif"></a></div>
    </div>
    <div class="gm_dialog_body" style="width: 322px; height: 200px;">
        <div class="play-over-info">
            <h3 class="title">
                <span class="icon"></span>轨迹回放完毕</h3>
            <ul>
                <li>开始时间&nbsp;2015-01-26 10:27:22</li><li>结束时间&nbsp;2015-01-26 11:27:22</li><li>行驶里程&nbsp;8.633公里</li><li
                    class="line-btns">
                    <input type="button" class="btn btn-ok" onclick="infoPanel.dialog.closeWinLayer();"
                        value="确定"><a id="A1" class="travel-view" href="###">查看行程</a><a id="A2" class="path-view"
                            href="###">下载轨迹</a></li></ul>
        </div>
    </div>
    <div class="gm_dialog_mask">
    </div>
    <div class="gm_dialog" id="Div1" style="width: 602px; height: 508px; bottom: 145px;
        left: 419px;">
        <div class="gm_dialog_head">
            <div class="gm_dialog_title">           
                Custom Page</div>
            <div class="gm_dialog_func">
                <a href="javascript:;" class="gm_dialog_min" style="display: none;">
                    <img src="http://static.gpsoo.net/dealer/images/iw_min.gif"></a> <a href="javascript:;"
                        class="gm_dialog_max">
                        <img src="http://static.gpsoo.net/dealer/images/iw_max.gif"></a> <a href="javascript:;"
                            class="gm_dialog_close">
                            <img src="http://static.gpsoo.net/dealer/images/iw_close.gif"></a></div>
        </div>
        <div class="gm_dialog_body" style="width: 600px; height: 480px;">
            &nbsp;</div>
    </div>
    <div class="gm_dialog_mask">
    </div>
    </form>
</body>
</html>
