
(function ($) {
    $.fn.loadBMap = function () {
        var $self = this,
            map = null, point = null,
//            windowWidth = $(window).outerWidth(true), siblingsWidth = 0,
            $siblings = null;

        if ($self.length > 0) {
//            $siblings = $self.siblings();
//            alert($siblings.length);
//            $siblings.each(function (key, value) {
//                siblingsWidth += $(value).outerWidth(true);
//            });
//            $self.css("width", (windowWidth - siblingsWidth - 5) + "px");

            map = new BMap.Map($self.attr("id"));
            point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 16);
        }
    }
})(jQuery);

$(function () {
    //    $("#mapPanel").css();
//    alert("进来了");
//    var 
//        map = new BMap.Map("mapPanel"),
//        point = new BMap.Point(116.404, 39.915);

//    map.centerAndZoom(point, 16);
});
