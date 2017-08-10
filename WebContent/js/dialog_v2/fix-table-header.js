/**
 * 固定表头的类
 * @type {fixTabledHeader}
 *
 * 只有一个公开方法
 * fixTabledHeader.fix(header,opts)
 *
 * @param header，待固定的表头，一个tr标签，下级包含td或者th，内部会自动用table标签包裹起来然后插入body中
 *          <tr>
 *              <td></td>
 *              <td></td>
 *              ...
 *          </tr>
 * @param opts，可选参数json，
 *      wrapperClass: 包裹的table的class
 *      wrapperStyle: 包裹的table的style
 *
 * 生成absolute的表格,通过js来控制显示隐藏和同步宽度
 * <table class="#class" style="#style">
 *     <tr>
 *         <td></td>
 *         <td></td>
 *         ...
 *     </tr>
 * </table>
 */
var fixTabledHeader = function(){
    var $oldHeader = null,
        container = null,
        oldHeaderOffsetTop = 0,//原始表头距离视窗顶部的距离
        $newHeader = null,
        options = {
            wrapperClass: '',
            wrapperStyle: 'position:absolute;'
        },
        timer = null,//同步原始的表头各个单元格宽度的定时器
        interval = 1000,//同步间隔，1秒
        inited = false;//是否已经初始化过了
        //定时同步宽度
    var syncWidth = function(){
            if($oldHeader && $oldHeader.length>0 && $newHeader && $newHeader.length>0){
                //自动取得表头的单元格，同步宽度
                var newHeaderChildren = $newHeader.find('td'),
                    oldHeaderChildren = $oldHeader.find('td');
                if(newHeaderChildren.length == 0){
                    newHeaderChildren = $newHeader.find('th');
                }
                if(oldHeaderChildren.length == 0){
                    oldHeaderChildren = $oldHeader.find('th');
                }
                oldHeaderChildren.each(function(i, v){
                    if(newHeaderChildren[i]){
                        $(newHeaderChildren[i]).width($(v).width()?$(v).width():'auto');
                    }
                });
                //解决有横向滚动条时，fix的表头宽度问题
                $newHeader.width($oldHeader.closest('table').width()||'100%');
            }
        },
        //浏览器滚动定位头部
        scrollHandler = function(){
            if($newHeader && $newHeader.length>0){
            var top = options.container?container.scrollTop():$(window).scrollTop();
                if(top > oldHeaderOffsetTop){
                    $newHeader.show().css('top',top);
                }else{
                    $newHeader.hide();
                }
            }
        },
        reset = function(){
            $oldHeader = null;
            $newHeader && $newHeader.remove();
            $newHeader = null;
            oldHeaderOffsetTop = 0;
            options = {
                wrapperClass: '',
                wrapperStyle: 'position:absolute;'
            };
            clearInterval(timer);
            timer = null;
        },
        bindEvents = function(){
            timer = setInterval(function(){
                syncWidth();
            }, interval);
            options.container?container.scroll(scrollHandler):$(window).scroll(scrollHandler);
        },
        init = function($header,opts){
            reset();
            $oldHeader = $header;
            if(opts){
                options.wrapperClass += opts.wrapperClass || '';
                options.wrapperStyle += opts.wrapperStyle || '';
                options.container = opts.container;
                if(opts.container){
                    container = $(opts.container);
                }else{
                    container = $('body');
                }
            }
            $newHeader = $('<table class="'+options.wrapperClass+'" style="'+options.wrapperStyle+'">'+$('<div></div>').append($header.clone()).html()+'</table>');
            $newHeader.appendTo(container);
            oldHeaderOffsetTop = $oldHeader.position().top;
            //如果已经初始化过了，就不再重复绑定事件
            if(inited === false){
                inited = true;
                bindEvents();
            }
            syncWidth();
            scrollHandler();
        };

    return {
        fix: function($header, opts){
            if(opts && typeof opts.delay != 'undefined'){
                setTimeout(function(){
                    init($header, opts);
                }, opts.delay);
            }else{
                init($header, opts);
            }
        },
        resetPosition: function(){
            oldHeaderOffsetTop = $oldHeader.position().top;
        }
    };
}();