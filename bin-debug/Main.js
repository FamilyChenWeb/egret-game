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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e, pkey, login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wx.getLaunchOptionsSync()];
                    case 2:
                        e = _a.sent();
                        pkey = e.query.pkey ? e.query.pkey : '';
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        login = _a.sent();
                        return [4 /*yield*/, this.getLogin(login.code, pkey)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.getLogin = function (code, pkey) {
        return __awaiter(this, void 0, void 0, function () {
            var that, time, data, sign, param, httpRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, this.getTime()];
                    case 1:
                        time = _a.sent();
                        data = {
                            code: code,
                            pkey: pkey,
                            time: time
                        };
                        return [4 /*yield*/, this.makeSign(data)];
                    case 2:
                        sign = _a.sent();
                        param = {
                            code: code,
                            pkey: '',
                            time: time,
                            sign: sign
                        };
                        httpRequest = new egret.HttpRequest();
                        httpRequest.responseType = egret.HttpResponseType.TEXT;
                        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                        httpRequest.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = JSON.parse(httpRequest.response);
                            console.log(res);
                            egret.localStorage.setItem('guide', res.data.guide);
                            egret.localStorage.setItem('userId', res.data.id);
                            egret.localStorage.setItem('token', res.data.token);
                            that.getGame();
                        }, this);
                        httpRequest.open("https://apinine.xiaozigame.com/api/app/login", egret.HttpMethod.POST);
                        httpRequest.send(param);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.getGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr, token, that, time, data, sign, param, httpRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        token = egret.localStorage.getItem('token');
                        that = this;
                        return [4 /*yield*/, this.getTime()];
                    case 1:
                        time = _a.sent();
                        data = {
                            token: token,
                            time: time
                        };
                        return [4 /*yield*/, this.makeSign(data)];
                    case 2:
                        sign = _a.sent();
                        param = {
                            token: token,
                            time: time,
                            sign: sign
                        };
                        httpRequest = new egret.HttpRequest();
                        httpRequest.responseType = egret.HttpResponseType.TEXT;
                        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                        httpRequest.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = JSON.parse(httpRequest.response);
                            arr.push(res.data.gamelist[0], res.data.gamelist[4], res.data.gamelist[5], res.data.gamelist[6], res.data.gamelist[7], res.data.gamelist[8], res.data.gamelist[10], res.data.gamelist[12]);
                            that.createGameScene(arr);
                        }, this);
                        httpRequest.open("https://apinine.xiaozigame.com/api/active/getgamelist", egret.HttpMethod.GET);
                        httpRequest.send(param);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.makeSign = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, str, arr, i, encrypted, theencrypted;
            return __generator(this, function (_a) {
                secret = '94f0dcc59b3a1af75cdb9';
                str = '';
                arr = Object.keys(obj);
                arr.sort();
                for (i in arr) {
                    str += "&" + arr[i] + "=" + obj[arr[i]];
                }
                str = str.substring(1);
                encrypted = new md5().hex_md5(str);
                theencrypted = new md5().hex_md5(encrypted + secret);
                return [2 /*return*/, theencrypted];
            });
        });
    };
    Main.prototype.getTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, time;
            return __generator(this, function (_a) {
                date = new Date().toString();
                time = Date.parse(date);
                time = time / 1000;
                return [2 /*return*/, time];
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /*navigateToMiniProgram(res, extra) {
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
                    console.log('path', path);
                    resolve(res)
                }
            })
        })
    }*/
    Main.prototype.onClick = function (evt, extra) {
        var _this = this;
        var userId = egret.localStorage.getItem('userId');
        platform.navigateToMiniProgram(evt, extra).then(function (res) {
            console.log(res);
            var that = _this;
            var data = JSON.stringify({
                uid: userId,
                gid: evt.id,
            });
            var param = {
                appv: '1.0',
                counter: 'enter',
                data: data
            };
            var httpRequest = new egret.HttpRequest();
            httpRequest.responseType = egret.HttpResponseType.TEXT;
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.addEventListener(egret.Event.COMPLETE, function (evt) {
                var res = JSON.parse(httpRequest.response);
                console.log(res);
            }, _this);
            httpRequest.open("https://testapione.xiaozigame.com/report", egret.HttpMethod.GET);
            httpRequest.send(param);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function (arr) {
        var _this = this;
        var userId = egret.localStorage.getItem('userId');
        var labelA = new eui.Label();
        labelA.x = 0;
        labelA.y = 0;
        labelA.width = this.stage.stageWidth;
        labelA.height = this.stage.stageHeight;
        labelA.background = true;
        labelA.backgroundColor = 0xffffff;
        this.addChild(labelA);
        var group = new eui.Group();
        var label = new eui.Label();
        label.text = "游戏盒子标题";
        label.x = 0;
        label.y = 0;
        label.width = this.stage.stageWidth;
        label.height = 65;
        label.background = true;
        label.backgroundColor = 0xffffff;
        label.size = 16;
        label.textColor = 0x000000;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        this.addChild(label);
        var name = [];
        arr.map(function (item, index) {
            name[index] = 'img_' + index;
            if (index % 2) {
                name[index] = new eui.Image("https://apithree.xiaozigame.com/static/uploads/game/" + item.img);
                name[index].x = (15 + 15 * 1) + (((_this.stage.stageWidth - 15 * 3) / 2) * 1);
                name[index].y = (15 + 15 * (index - 1)) + (100 * (index - 1));
                name[index].width = (_this.stage.stageWidth - 15 * 3) / 2;
                name[index].height = 220;
                group.addChild(name[index]);
            }
            else {
                name[index] = new eui.Image("https://apithree.xiaozigame.com/static/uploads/game/" + item.img);
                name[index].x = 15;
                name[index].y = (15 + 15 * index) + (100 * index);
                name[index].width = (_this.stage.stageWidth - 15 * 3) / 2;
                name[index].height = 220;
                group.addChild(name[index]);
            }
            var extra = '';
            if (item.extra === '') {
                extra = '';
            }
            else {
                extra = "?data=" + JSON.stringify({ uid: userId, gid: item.id });
            }
            name[index].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick.bind(_this, item, extra), _this);
        });
        //创建一个Scroller
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.y = 65;
        myScroller.x = 0;
        myScroller.width = this.stage.stageWidth;
        myScroller.height = this.stage.stageHeight - 65;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
