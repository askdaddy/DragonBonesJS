"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseDemo = /** @class */ (function (_super) {
    __extends(BaseDemo, _super);
    function BaseDemo() {
        var _this = _super.call(this) || this;
        _this._loadCount = 0;
        _this._loadingText = new egret.TextField();
        _this._background = new egret.Bitmap();
        _this._resources = [];
        _this._resourceMap = {};
        _this._updateLoadingText("Loading 0%");
        _this._resources.push(BaseDemo.BACKGROUND_URL);
        _this.addChild(_this._loadingText);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.x = _this.stageWidth * 0.5;
            _this.y = _this.stageHeight * 0.5;
            _this._loadResources();
        }, _this);
        return _this;
    }
    BaseDemo.prototype._updateLoadingText = function (text) {
        this._loadingText.text = text;
        this._loadingText.x = -this._loadingText.width * 0.5;
        this._loadingText.y = -this._loadingText.height * 0.5;
    };
    BaseDemo.prototype._loadResources = function () {
        var _this = this;
        this._loadCount = this._resources.length;
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            RES.getResByUrl(resource, function (data, key) {
                _this._resourceMap[key] = data;
                _this._loadCount--;
                if (_this._loadCount === 0) {
                    RES.getRes = function (name) {
                        return _this._resourceMap[name];
                    };
                    //
                    _this._background.texture = RES.getRes(BaseDemo.BACKGROUND_URL);
                    _this._background.x = -_this._background.texture.textureWidth * 0.5;
                    _this._background.y = -_this._background.texture.textureHeight * 0.5;
                    _this.addChild(_this._background);
                    //
                    _this._onStart();
                }
                else {
                    _this._updateLoadingText("Loading " + Math.round((1.0 - _this._loadCount / _this._resources.length) * 100.0) + "%");
                }
            }, this, resource.indexOf(".dbbin") > 0 ? RES.ResourceItem.TYPE_BIN : null);
        }
    };
    BaseDemo.prototype.createText = function (string) {
        var text = new egret.TextField();
        text.size = 20;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = string;
        text.width = this.stageWidth;
        text.x = -this.stageWidth * 0.5;
        text.y = this.stageHeight * 0.5 - 100;
        this.addChild(text);
        return text;
    };
    Object.defineProperty(BaseDemo.prototype, "stageWidth", {
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDemo.prototype, "stageHeight", {
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    BaseDemo.BACKGROUND_URL = "resource/background.png";
    return BaseDemo;
}(egret.DisplayObjectContainer));
