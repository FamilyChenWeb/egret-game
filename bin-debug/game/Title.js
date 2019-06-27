var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Title = (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/Title.exml";
        return _this;
    }
    Title.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Title.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Title;
}(eui.Component));
__reflect(Title.prototype, "Title", ["eui.UIComponent", "egret.DisplayObject"]);
