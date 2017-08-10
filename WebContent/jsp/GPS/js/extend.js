
(function ($, win) {
    if ($ == null) {
        win.$ = {};
    }

    $.responseData = function (data) {
        try {
            if (win.JSON != null) {
                data = win.JSON.parse(data);
            } else {
                data = eval("(" + data + ")");
            }
        } catch (e) {

        }

        return data;
    };
})(window.jQuery, window);
