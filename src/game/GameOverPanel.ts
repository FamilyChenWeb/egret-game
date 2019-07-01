class GameOverPanel extends egret.Sprite
{
    public tittle:egret.TextField;
    public stepTxt:egret.TextField;
    public tipTxt:egret.TextField;

	private ma=new Main();

    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.isClick,this);
    }

    public isClick(){
        console.log("gameover click", this);
        this.dispatchEventWith("restart");
        this.parent.removeChild(this);
    }

    public init(){
        //this.filters = [new egret.DropShadowFilter()];
        this.graphics.lineStyle(3,0xBBBBBB,0.8);
        this.graphics.beginFill(0xe5dbd9);
        this.graphics.drawRoundRect(0,0,this.ma.rootStagW-20,this.ma.rootStagW/3,60,60);
        this.graphics.endFill();
        this.alpha = 0.8;
        
        this.stepTxt = new egret.TextField();
        this.stepTxt.text = "恭喜你通关了";
        this.stepTxt.size = 16;
        this.stepTxt.stroke = 3;
        this.stepTxt.textColor = 0xffffff;
        this.stepTxt.textAlign = 'center'
        this.stepTxt.width = 354;
        this.stepTxt.height = 200;
        this.stepTxt.verticalAlign = 'middle'
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
        this.tipTxt.textAlign = 'center'
        this.tipTxt.width = 354;
        this.tipTxt.height = 60;
        this.tipTxt.verticalAlign = 'middle'
        this.tipTxt.background = true;
        this.tipTxt.backgroundColor = 0xf00fff;
        this.tipTxt.x = 0;
        this.tipTxt.y = 200;
        this.addChild(this.tipTxt);
    }
}