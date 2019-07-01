
class Main extends eui.UILayer {
    public guide:number | string = '0';//判断显示游戏列表

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        const e: any = await wx.getLaunchOptionsSync()
        const pkey = e.query.pkey ? e.query.pkey : ''
        const login = await platform.login();
        await this.getLogin(login.code, pkey)
    }

    private async getLogin (code, pkey) {
        const that = this
        const time = await this.getTime();
        const data = {
            code: code,
            pkey: pkey,
            time: time
        }
        const sign = await this.makeSign(data);
        const param = {
            code: code,
            pkey: '',
            time: time,
            sign: sign
        }
        let httpRequest:egret.HttpRequest = new egret.HttpRequest();
        httpRequest.responseType = egret.HttpResponseType.TEXT;
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        httpRequest.addEventListener(egret.Event.COMPLETE,function(evt:egret.Event):void {
            const res = JSON.parse(httpRequest.response)
            console.log(res);
            egret.localStorage.setItem('guide', res.data.guide)
            egret.localStorage.setItem('userId', res.data.id)
            egret.localStorage.setItem('token', res.data.token)
            if (res.data.guide == that.guide) {
                that.getGame(res.data.guide);
            } else {
                that.getCs()
            }
        },this);
        httpRequest.open("https://apinine.xiaozigame.com/api/app/login", egret.HttpMethod.POST);
        httpRequest.send(param);
    }

    private async getGame (guide) {
        const arr = []
        const token = egret.localStorage.getItem('token')
        const that = this
        const time = await this.getTime();
        const data = {
            token: token,
            time: time
        }
        const sign = await this.makeSign(data);
        const param = {
            token: token,
            time: time,
            sign: sign
        }
        let httpRequest:egret.HttpRequest = new egret.HttpRequest();
        httpRequest.responseType = egret.HttpResponseType.TEXT;
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        httpRequest.addEventListener(egret.Event.COMPLETE,function(evt:egret.Event):void {
            const res = JSON.parse(httpRequest.response)
            res.data.gamelist.map(item => {
                arr.push(item)
                console.log(item.appid)
            })
            that.createGameScene(arr);
        },this);
        httpRequest.open("https://apinine.xiaozigame.com/api/active/getgamelist", egret.HttpMethod.GET);
        httpRequest.send(param);
    }

    private async makeSign (obj) {
        const secret = '94f0dcc59b3a1af75cdb9'
        let str = ''
        //生成key升序数组
        let arr = Object.keys(obj)
        arr.sort()
        for (let i in arr) {
          str += `&${arr[i]}=${obj[arr[i]]}`
        }
        str = str.substring(1)
        let encrypted:string = new md5().hex_md5(str);
        let theencrypted:string = new md5().hex_md5(encrypted + secret);
        return theencrypted
    }

    private async getTime () {
        const date = new Date().toString()
        let time = Date.parse(date)
        time = time / 1000
        return time
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    
    /*navigateToMiniProgram(res, extra) {
        console.log(res, extra)
        let path = ''
        if (res.extra === '') {
        path = extra
        } else {
        path = ''
        }
        return new Promise((resolve, reject) => {
        wx.navigateToMiniProgram({
            appId: res.appid,
            path: path,
            envVersion: 'release',
            success(res) {
            console.log('success', path);
            resolve(res)
            },
            fail(res) {
            console.log('fail');
            reject(res)
            }
        })
        })
    }
    "navigateToMiniProgramAppIdList": [
        "wx3a2acd8aea020457"
    ]*/
    
    private onClick( evt, extra ) {
        const userId = egret.localStorage.getItem('userId')
        platform.navigateToMiniProgram(evt, extra).then(res => {
            console.log(res)
            const that = this
            const data = JSON.stringify({
              uid: userId,
              gid: evt.id,
              type: '1'
            })
            const param = {
              appv: '1.0',
              counter: 'enter',
              data: data
            }
            let httpRequest:egret.HttpRequest = new egret.HttpRequest();
            httpRequest.responseType = egret.HttpResponseType.TEXT;
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.addEventListener(egret.Event.COMPLETE,function(evt:egret.Event):void {
                const res = JSON.parse(httpRequest.response)
                console.log(res);
            },this);
            httpRequest.open("https://apione.xiaozigame.com/report", egret.HttpMethod.GET);
            httpRequest.send(param);
        }).catch(res => {
            console.log('点击取消')
            console.log(res)
            const that = this
            const data = JSON.stringify({
              uid: userId,
              gid: evt.id,
              type: '0'
            })
            const param = {
              appv: '1.0',
              counter: 'enter',
              data: data
            }
            let httpRequest:egret.HttpRequest = new egret.HttpRequest();
            httpRequest.responseType = egret.HttpResponseType.TEXT;
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.addEventListener(egret.Event.COMPLETE,function(evt:egret.Event):void {
                const res = JSON.parse(httpRequest.response)
                console.log(res);
            },this);
            httpRequest.open("https://apione.xiaozigame.com/report", egret.HttpMethod.GET);
            httpRequest.send(param);
        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    
    public rootStagW:number;
    public rootStagH:number;

    protected getCs(): void {
        this.rootStagW=this.stage.stageWidth;
        this.rootStagH=this.stage.stageHeight;
        var gamePuzzle:puzzle = new puzzle();
        gamePuzzle.x = -5;
        gamePuzzle.y = (this.stage.stageHeight - gamePuzzle.height) / 2;
        this.addChild(gamePuzzle);
    }
    protected createGameScene(arr): void {
        const userId = egret.localStorage.getItem('userId')
        let labelA = new eui.Label();
        labelA.x = 0;
        labelA.y = 0;
        labelA.width = this.stage.stageWidth;
        labelA.height = this.stage.stageHeight;
        labelA.background = true;
        labelA.backgroundColor = 0xffffff
        this.addChild(labelA);

        let group = new eui.Group();
        let label = new eui.Label();
        label.text = "游戏盒子标题";
        label.x = 0;
        label.y = 0;
        label.width = this.stage.stageWidth;
        label.height = 65;
        label.background = true;
        label.backgroundColor = 0xffffff
        label.size = 16;
        label.textColor = 0x000000
        label.textAlign = 'center'
        label.verticalAlign = 'middle'
        this.addChild(label);
        let name = []
        arr.map((item, index) => {
            name[index] = 'img_' + index
            if (index%2) {
                name[index] = new eui.Image(`https://apithree.xiaozigame.com/static/uploads/game/${item.img}`);
                name[index].x = (15 + 15 * 1) + (((this.stage.stageWidth - 15 * 3) / 2) * 1)
                name[index].y = (15 + 15 * (index - 1)) + (100 * (index - 1))
                name[index].width = (this.stage.stageWidth - 15 * 3) / 2;
                name[index].height = 220
                group.addChild(name[index]);
            } else {
                name[index] = new eui.Image(`https://apithree.xiaozigame.com/static/uploads/game/${item.img}`);
                name[index].x = 15
                name[index].y = (15 + 15 * index) + (100 * index);
                name[index].width = (this.stage.stageWidth - 15 * 3) / 2;
                name[index].height = 220
                group.addChild(name[index]);
            }
            let extra = ''
            if (item.extra !== '') {
                extra = ''
            } else {
                extra = `?data=${JSON.stringify({uid: userId, gid: item.id})}`
            }
            name[index].addEventListener( egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, item, extra), this );
        })
        //创建一个Scroller
        let myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.y = 65;
        myScroller.x = 0;
        myScroller.width = this.stage.stageWidth;
        myScroller.height = this.stage.stageHeight - 65;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
    }
}
