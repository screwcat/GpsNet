var yPos = 0, leftTopHeight = 7, yPos2 = yPos + leftTopHeight,
	popupTbl = {
	    leftTop: { "left": 0, "top": yPos, "width": 19, "height": leftTopHeight },
	    leftTopFill: { "left": 16, "top": 3, "width": 4, "height": 4 },
	    rightTop: { "left": 19, "top": yPos, "width": 10, "height": leftTopHeight },
	    rightTopImg: { "left": -125, "top": 0, "width": 10, "height": leftTopHeight },
	    centerTopFill: { "left": 19, "top": yPos, "width": 0, "height": leftTopHeight },
	    leftBody: { "left": 11, "top": yPos2, "width": 8, "height": 0 },
	    centerBodyFill: { "left": 19, "top": yPos2, "width": 40, "height": 15 },
	    rightBody: { "left": 19, "top": yPos2, "width": 9, "height": 0 },
	    leftBottom: { "left": 0, "top": yPos2, "width": 20, "height": 21 },
	    leftBottomImg: { "left": 0, "top": -13, "width": 20, "height": 21 },
	    leftBottomFill: { "left": 16, "top": 0, "width": 4, "height": 6 },
	    rightBottom: { "left": 19, "top": yPos2, "width": 10, "height": leftTopHeight },
	    rightBottomImg: { "left": -125, "top": -13, "width": 10, "height": leftTopHeight },
	    centerBottomFill: { "left": 19, "top": (yPos2 + (_.isIE ? -1 : 0)), "width": 0, "height": (6 + (_.isIE ? 1 : 0)) }
	};


//构造方法
function PopupMarker(opts) {
    this.ICON_WIDTH = 28;
    this.ICON_HEIGHT = 28;
    this.text_ = opts.text || "";
    this.popupImgSrc_ = "images/1280.png";
    this.html_ = this.onAdd();
};

PopupMarker.prototype.onAdd = function () {
    this.container_ = document.createElement("div");
    this.container_.style.display = "none";
    this.makeNormalPopup_();
    this.draw();
    return this.container_.innerHTML;

};

PopupMarker.prototype.draw = function () {
    this.redrawNormalPopup_(this.text_);
};

//初始化dom元素
PopupMarker.prototype.makeNormalPopup_ = function () {
    //创建文档碎片节点
    var frag = document.createDocumentFragment();
    //0
    var leftTop_ = this.makeImgDiv_(this.popupImgSrc_, popupTbl.leftTop);
    leftTop_.appendChild(this.fillDiv_(popupTbl.leftTopFill));
    frag.appendChild(leftTop_);
    //1
    var leftBody_ = this.fillDiv_(popupTbl.leftBody);
    _.css(leftBody_, 'border-width:0 0 0 1px;border-style:none none none solid;border-color:#000');
    frag.appendChild(leftBody_);
    //2
    var leftBottom_ = this.makeImgDiv_(this.popupImgSrc_, popupTbl.leftBottomImg);
    leftBottom_.appendChild(this.fillDiv_(popupTbl.leftBottomFill));
    _.css(leftBottom_, 'left:' + popupTbl.leftBottom.left + 'px;top:' + popupTbl.leftBottom.top + 'px;width:' + popupTbl.leftBottom.width + 'px;height:' + popupTbl.leftBottom.height + 'px;');
    frag.appendChild(leftBottom_);
    //3
    var bodyContainer_ = document.createElement("div");
    _.css(bodyContainer_, 'position:absolute;background-color:#fff;overflow:hidden;left:' + popupTbl.centerBodyFill.left + 'px;top:' + popupTbl.centerBodyFill.top + 'px;width:' + popupTbl.centerBodyFill.width + 'px;height:' + popupTbl.centerBodyFill.height + 'px;');
    frag.appendChild(bodyContainer_);
    //4
    var rightTop_ = this.makeImgDiv_(this.popupImgSrc_, popupTbl.rightTopImg);
    _.css(rightTop_, 'left:' + popupTbl.rightTop.left + 'px;top:' + popupTbl.rightTop.top + 'px;width:' + popupTbl.rightTop.width + 'px;height:' + popupTbl.rightTop.height + 'px;');
    frag.appendChild(rightTop_);
    //5
    var rightBottom_ = this.makeImgDiv_(this.popupImgSrc_, popupTbl.rightBottomImg);
    _.css(rightBottom_, 'left:' + popupTbl.rightBottom.left + 'px;top:' + popupTbl.rightBottom.top + 'px;width:' + popupTbl.rightBottom.width + 'px;height:' + popupTbl.rightBottom.height + 'px;');
    frag.appendChild(rightBottom_);
    //6
    var rightBody_ = this.fillDiv_(popupTbl.rightBody);
    _.css(rightBody_, 'border-width:0 1px 0 0;border-style:none solid none none;border-color:#000');
    frag.appendChild(rightBody_);
    //7
    var centerBottom_ = this.fillDiv_(popupTbl.centerBottomFill);
    _.css(centerBottom_, 'border-width:0 0 1px 0;border-style:none none solid none;border-color:#000');
    frag.appendChild(centerBottom_);
    //8
    var centerTop_ = this.fillDiv_(popupTbl.centerTopFill);
    _.css(centerTop_, 'border-width:1px 0 0 0;border-style:solid none none none;border-color:#000');
    frag.appendChild(centerTop_);

    this.container_.appendChild(frag);
};

PopupMarker.prototype.redrawNormalPopup_ = function (text) {
    if (this.beforeNormalPopupText_ !== text) {
        var bodyContainer_ = this.container_.children[3],
			leftBottom_ = this.container_.children[2],
			leftBody_ = this.container_.children[1],
			rightTop_ = this.container_.children[4],
			rightBottom_ = this.container_.children[5],
			rightBody_ = this.container_.children[6],
			centerBottom_ = this.container_.children[7],
			centerTop_ = this.container_.children[8];
        bodyContainer_.innerHTML = text;
        if (!_.isIE && text) {
            if (bodyContainer_.firstChild.nodeType === 1) {
                bodyContainer_.firstChild.style.margin = 0;
            }
        }
        //var offsetBorder = _.isIE ? 2: 0;
        var cSize = this.getHtmlSize_(text);
        var rightX = popupTbl.leftTop.width + cSize.width;
        leftBottom_.style.top = (cSize.height + popupTbl.leftBody.top) + "px";
        leftBody_.style.height = cSize.height + "px";
        bodyContainer_.style.width = cSize.width + "px";
        bodyContainer_.style.height = cSize.height + "px";
        bodyContainer_.style.top = popupTbl.leftBody.top;
        rightTop_.style.left = rightX + "px";
        rightBottom_.style.left = rightTop_.style.left;
        rightBottom_.style.top = leftBottom_.style.top;
        rightBody_.style.left = rightX + "px";
        rightBody_.style.height = leftBody_.style.height;
        centerBottom_.style.top = leftBottom_.style.top;
        centerBottom_.style.width = cSize.width + "px";
        centerTop_.style.width = cSize.width + "px";
        this.size_ = {
            "width": (rightX + popupTbl.rightTop.width),
            "height": (cSize.height + popupTbl.leftTop.height + popupTbl.leftBottom.height)
        };
        this.container_.style.width = this.size_.width + "px";
        this.container_.style.height = this.size_.height + "px";
    }
    this.setPosition(this.latlng_);
    this.beforeNormalPopupText_ = text;
};

//设置中心点
PopupMarker.prototype.setPosition = function (latlng) {
    try {
        var pxPos = this.map_.lnglatToPixel(latlng);
        this.container_.style.left = pxPos.x + "px";
        //this.container_.style.top = (pxPos.y - this.size_.height) + "px";
        this.container_.style.top = (pxPos.y - this.size_.height - 10) + "px";
        this.iconContainer.style.left = (pxPos.x - this.ICON_WIDTH / 2 + 8) + "px";
        //this.iconContainer.style.top = (pxPos.y - this.ICON_HEIGHT) + "px";
        this.iconContainer.style.top = (pxPos.y - this.ICON_HEIGHT + 10) + "px";
        //this.latlng_ = latlng;
    } catch (e) { }
};


PopupMarker.prototype.makeImgDiv_ = function (imgSrc, params) {
    var imgDiv = document.createElement("div");
    imgDiv.style.position = "absolute";
    imgDiv.style.overflow = "hidden";
    if (params.width) {
        imgDiv.style.width = params.width + "px";
    }
    if (params.height) {
        imgDiv.style.height = params.height + "px";
    }
    var img = null;
    if (!_.isIE) {
        img = new Image();
        img.src = imgSrc;
    } else {
        img = document.createElement("div");
        if (params.width) {
            img.style.width = params.width + "px";
        }
        if (params.height) {
            img.style.height = params.height + "px";
        }
    }
    img.style.position = "relative";
    img.style.left = params.left + "px";
    img.style.top = params.top + "px";
    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "')";
    imgDiv.appendChild(img);
    return imgDiv;

};
PopupMarker.prototype.fillDiv_ = function (params) {
    var bgDiv = document.createElement("div");
    bgDiv.style.position = "absolute";
    bgDiv.style.backgroundColor = "#FFF";
    bgDiv.style.fontSize = "1px";
    bgDiv.style.lineHeight = "1px";
    bgDiv.style.overflow = "hidden";
    if (params != undefined) {
        bgDiv.style.left = params.left + "px";
        bgDiv.style.top = params.top + "px";
        bgDiv.style.width = params.width + "px";
        bgDiv.style.height = params.height + "px";
    } else {
        bgDiv.style.left = "1px";
        bgDiv.style.top = "1px";
        bgDiv.style.width = "1px";
        bgDiv.style.height = "1px";
    }

    return bgDiv;
};

//获取内容宽度
PopupMarker.prototype.getHtmlSize_ = function (html) {

    var size = {};
    var span = document.getElementById("spanMapPopupContentSize");
    span.innerHTML = html;
    span.style.display = '';
    size.width = span.offsetWidth;
    size.height = span.offsetHeight;
    span.style.display = 'none';
    var ret, lines = html.split(/\n/i), totalSize = eval("(" + "{width:1,height: 1}" + ")");

    for (var i = 0; i < lines.length; i++) {
        totalSize.width += size.width;
        totalSize.height += size.height;
    }

    return totalSize;
};