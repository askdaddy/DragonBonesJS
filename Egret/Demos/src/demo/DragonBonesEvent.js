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
var DragonBonesEvent = /** @class */ (function (_super) {
    __extends(DragonBonesEvent, _super);
    function DragonBonesEvent() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/mecha_1004d/mecha_1004d_ske.json", "resource/mecha_1004d/mecha_1004d_tex.json", "resource/mecha_1004d/mecha_1004d_tex.png");
        return _this;
    }
    DragonBonesEvent.prototype._onStart = function () {
        var _this = this;
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes("resource/mecha_1004d/mecha_1004d_ske.json"));
        factory.parseTextureAtlasData(RES.getRes("resource/mecha_1004d/mecha_1004d_tex.json"), RES.getRes("resource/mecha_1004d/mecha_1004d_tex.png"));
        //
        factory.soundEventManager.addEventListener(dragonBones.EventObject.SOUND_EVENT, this._soundEventHandler, this);
        //
        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");
        this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("walk");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this.addChild(this._armatureDisplay);
        //
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this._armatureDisplay.animation.fadeIn("skill_03", 0.2);
        }, this);
        //
        this.createText("Touch to play animation.");
    };
    DragonBonesEvent.prototype._soundEventHandler = function (event) {
        var eventObject = event.eventObject;
        console.log(eventObject.name);
    };
    DragonBonesEvent.prototype._animationEventHandler = function (event) {
        var eventObject = event.eventObject;
        if (eventObject.animationState.name === "skill_03") {
            this._armatureDisplay.animation.fadeIn("walk", 0.2);
        }
    };
    return DragonBonesEvent;
}(BaseDemo));
