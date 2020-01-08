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
var AnimationBase = /** @class */ (function (_super) {
    __extends(AnimationBase, _super);
    function AnimationBase() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/progress_bar/progress_bar_ske.json", "resource/progress_bar/progress_bar_tex.json", "resource/progress_bar/progress_bar_tex.png");
        return _this;
    }
    AnimationBase.prototype._onStart = function () {
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes("resource/progress_bar/progress_bar_ske.json"));
        factory.parseTextureAtlasData(RES.getRes("resource/progress_bar/progress_bar_tex.json"), RES.getRes("resource/progress_bar/progress_bar_tex.png"));
        //
        this._armatureDisplay = factory.buildArmatureDisplay("progress_bar");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 0.0;
        this.addChild(this._armatureDisplay);
        // Add animation event listener.
        this._armatureDisplay.addEventListener(dragonBones.EventObject.START, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("idle");
        //
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchHandler, this);
        //
        this.createText("Touch to control animation play progress.");
    };
    AnimationBase.prototype._touchHandler = function (event) {
        var progress = Math.min(Math.max((event.stageX - this.x + 300.0) / 600.0, 0.0), 1.0);
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._armatureDisplay.animation.gotoAndStopByProgress("idle", progress);
                break;
            case egret.TouchEvent.TOUCH_END:
                this._armatureDisplay.animation.play();
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (event.touchDown) {
                    var animationState = this._armatureDisplay.animation.getState("idle");
                    if (animationState) {
                        animationState.currentTime = animationState.totalTime * progress;
                    }
                }
                break;
        }
    };
    AnimationBase.prototype._animationEventHandler = function (event) {
        console.log(event.eventObject.animationState.name, event.type, event.eventObject.name);
    };
    return AnimationBase;
}(BaseDemo));
