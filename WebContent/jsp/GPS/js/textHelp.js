function ShowVideo(videoUrl) {
    var width = $(window).width() - 30;
    var height = $(window).height() - 30;
    var Ht = "<div id=\"VCUS\">";
    Ht += "<object width='" + (width - 20) + "' height='" + (height - 40) + "'>";
    Ht += "<param name='movie' value='" + videoUrl + "'></param>";
    Ht += "<param name='allowFullScreen' value='true'></param>"; 
    Ht += "<param name='allowscriptaccess' value='always'></param>"; 
    Ht += "<embed src='" + videoUrl + "' type='application/x-shockwave-flash' width='" + (width - 20) + "' height='" + (height - 40) + "' allowscriptaccess='always' allowfullscreen='true'></embed>";
    Ht += " </object>";
    Ht += "</div>";

    var win = $(Ht);
    win.window({
        width: width,
        height: height,
        top: 10,
        left: 10,
        animate: true,
        title: " &nbsp;",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        onClose: function () {
            $("#VCUS").html("");
        }
    });
    return false;
}

function ShowImg(imgulr) {
    
    var width = $(window).width() - 30;
    var height = $(window).height() - 30;
    var ihieght = $(window).height()-100;
    var showImgWindow = $("<div><img style='width:" + (width - 40) + "px;height:" + ihieght + "px;' src=\"" + imgulr + "\" /><div>");
    showImgWindow.window({
        width: width,
        height: height,
        top: 10,
        left: 10,
        animate: true,
        title: " &nbsp;",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false
    });

};
function GetInfoWindow(Da) {
    if (Da.Descd == null) {
        Da.Descd = "";
    };
    var Sc = "<b>" + Da.Name + "</b></br>";
    Sc += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:12px'>" + Da.Descd + "</span>" + "</br>";
    var SImg = "<table><tr>";
    var n = 1;
    for (var i in Da.WS_Market_Picture) {
        var CxData = Da.WS_Market_Picture[i];
        var Ht = "";
        if (CxData.FileType == "img") {
            Ht = "<img height=\"65\" width=\"65\" style='cursor:pointer' onclick=\"ShowImg('" + CxData.FileUrl + "')\" src='" + CxData.FileUrl + "' />";
        } else {
            Ht = "<img height=\"65\" width=\"65\" style='cursor:pointer' onclick=\"ShowVideo('" + CxData.FileUrl + "')\" src='/images/video.jpg' />";
        }
        Ht = "<td>" + Ht + "</td>";
        if (n % 3 == 0) {
            Ht += "</tr><tr>";
        }
        n++;
        SImg = SImg + Ht;
    }
    SImg = SImg + "</tr></table>";
    Sc = Sc + SImg;
    return Sc;
}