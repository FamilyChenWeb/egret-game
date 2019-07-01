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
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this.ma = new Main();
        _this.init();
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.isClick, _this);
        return _this;
    }
    GameOverPanel.prototype.isClick = function () {
        console.log("gameover click", this);
        this.dispatchEventWith("restart");
        this.parent.removeChild(this);
    };
    GameOverPanel.prototype.init = function () {
        //this.filters = [new egret.DropShadowFilter()];
        this.graphics.lineStyle(3, 0xBBBBBB, 0.8);
        this.graphics.beginFill(0xe5dbd9);
        this.graphics.drawRoundRect(0, 0, this.ma.rootStagW - 20, this.ma.rootStagW / 3, 60, 60);
        this.graphics.endFill();
        this.alpha = 0.8;
        this.stepTxt = new egret.TextField();
        this.stepTxt.text = "恭喜你通关了";
        this.stepTxt.size = 16;
        this.stepTxt.stroke = 3;
        this.stepTxt.textColor = 0xffffff;
        this.stepTxt.textAlign = 'center';
        this.stepTxt.width = 354;
        this.stepTxt.height = 200;
        this.stepTxt.verticalAlign = 'middle';
        this.stepTxt.background = true;
        this.stepTxt.backgroundColor = 0xffffff;
        this.stepTxt.x = 0;
        this.stepTxt.y = 0;
        this.addChild(this.stepTxt);
        this.tipTxt = new egret.TextField();
        this.tipTxt.text = "- 在玩一次 -";
        this.tipTxt.size = 18;
        this.tipTxt.stroke = 3;
        this.tipTxt.strokeColor = 0x555555;
        this.tipTxt.textColor = 0xffffff;
        this.tipTxt.textAlign = 'center';
        this.tipTxt.width = 354;
        this.tipTxt.height = 60;
        this.tipTxt.verticalAlign = 'middle';
        this.tipTxt.background = true;
        this.tipTxt.backgroundColor = 0xf00fff;
        this.tipTxt.x = 0;
        this.tipTxt.y = 200;
        this.addChild(this.tipTxt);
    };
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
