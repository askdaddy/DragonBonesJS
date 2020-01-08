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
var EyeTracking = /** @class */ (function (_super) {
    __extends(EyeTracking, _super);
    function EyeTracking() {
        var _this = _super.call(this) || this;
        _this._scale = 0.3;
        _this._target = new egret.Point();
        _this._animationNames = [
            "PARAM_ANGLE_X",
            "PARAM_ANGLE_Y",
            "PARAM_ANGLE_Z",
            "PARAM_EYE_BALL_X",
            "PARAM_EYE_BALL_Y",
            "PARAM_BODY_X",
            "PARAM_BODY_Y",
            "PARAM_BODY_Z",
            "PARAM_BODY_ANGLE_X",
            "PARAM_BODY_ANGLE_Y",
            "PARAM_BODY_ANGLE_Z",
            "PARAM_BREATH",
        ];
        _this._resources.push("resource/shizuku/shizuku_ske.json", "resource/shizuku/shizuku.1024/texture_00.png", "resource/shizuku/shizuku.1024/texture_01.png", "resource/shizuku/shizuku.1024/texture_02.png", "resource/shizuku/shizuku.1024/texture_03.png");
        return _this;
    }
    EyeTracking.prototype._onStart = function () {
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes("resource/shizuku/shizuku_ske.json"), "shizuku");
        factory.updateTextureAtlases([
            RES.getRes("resource/shizuku/shizuku.1024/texture_00.png"),
            RES.getRes("resource/shizuku/shizuku.1024/texture_01.png"),
            RES.getRes("resource/shizuku/shizuku.1024/texture_02.png"),
            RES.getRes("resource/shizuku/shizuku.1024/texture_03.png"),
        ], "shizuku");
        this._armatureDisplay = factory.buildArmatureDisplay("shizuku", "shizuku");
        this._armatureDisplay.animation.play("idle_00");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 200.0;
        this._armatureDisplay.scaleX = this._armatureDisplay.scaleY = this._scale;
        this._armatureDisplay.disableBatch();
        this.addChild(this._armatureDisplay);
        var onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        var setTarget = this._setTarget.bind(this);
        egret.sys.TouchHandler.prototype.onTouchMove = function (x, y, touchPointID) {
            onTouchMove.call(this, x, y, touchPointID);
            setTarget(x, y);
        };
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandler, this);
    };
    EyeTracking.prototype._setTarget = function (x, y) {
        this._target.x += ((x - this.x - this._armatureDisplay.x) / this._scale - this._target.x) * 0.3;
        this._target.y += ((y - this.y - this._armatureDisplay.y) / this._scale - this._target.y) * 0.3;
    };
    EyeTracking.prototype._enterFrameHandler = function (_event) {
        var armature = this._armatureDisplay.armature;
        var animation = this._armatureDisplay.animation;
        var canvas = armature.armatureData.canvas;
        var p = 0.0;
        var pX = Math.max(Math.min((this._target.x - canvas.x) / (canvas.width * 0.5), 1.0), -1.0);
        var pY = -Math.max(Math.min((this._target.y - canvas.y) / (canvas.height * 0.5), 1.0), -1.0);
        for (var _i = 0, _a = this._animationNames; _i < _a.length; _i++) {
            var animationName = _a[_i];
            if (!animation.hasAnimation(animationName)) {
                continue;
            }
            var animationState = animation.getState(animationName, 1);
            if (!animationState) {
                animationState = animation.fadeIn(animationName, 0.1, 1, 1, animationName);
                if (animationState) {
                    animationState.resetToPose = false;
                    animationState.stop();
                }
            }
            if (!animationState) {
                continue;
            }
            switch (animationName) {
                case "PARAM_ANGLE_X":
                case "PARAM_EYE_BALL_X":
                    p = (pX + 1.0) * 0.5;
                    break;
                case "PARAM_ANGLE_Y":
                case "PARAM_EYE_BALL_Y":
                    p = (pY + 1.0) * 0.5;
                    break;
                case "PARAM_ANGLE_Z":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;
                case "PARAM_BODY_X":
                case "PARAM_BODY_ANGLE_X":
                    p = (pX + 1.0) * 0.5;
                    break;
                case "PARAM_BODY_Y":
                case "PARAM_BODY_ANGLE_Y":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;
                case "PARAM_BODY_Z":
                case "PARAM_BODY_ANGLE_Z":
                    p = (-pX * pY + 1.0) * 0.5;
                    break;
                case "PARAM_BREATH":
                    p = (Math.sin(armature.clock.time) + 1.0) * 0.5;
                    break;
            }
            animationState.currentTime = p * animationState.totalTime;
        }
    };
    return EyeTracking;
}(BaseDemo));
