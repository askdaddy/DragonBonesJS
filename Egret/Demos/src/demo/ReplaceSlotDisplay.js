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
var ReplaceSlotDisplay = /** @class */ (function (_super) {
    __extends(ReplaceSlotDisplay, _super);
    function ReplaceSlotDisplay() {
        var _this = _super.call(this) || this;
        _this._leftWeaponIndex = 0;
        _this._rightWeaponIndex = 0;
        _this._factory = dragonBones.EgretFactory.factory;
        _this._resources.push("resource/mecha_1004d_show/mecha_1004d_show_ske.json", "resource/mecha_1004d_show/mecha_1004d_show_tex.json", "resource/mecha_1004d_show/mecha_1004d_show_tex.png", "resource/weapon_1004_show/weapon_1004_show_ske.json", "resource/weapon_1004_show/weapon_1004_show_tex.json", "resource/weapon_1004_show/weapon_1004_show_tex.png");
        return _this;
    }
    ReplaceSlotDisplay.prototype._onStart = function () {
        var _this = this;
        this._factory.parseDragonBonesData(RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_ske.json"));
        this._factory.parseTextureAtlasData(RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_tex.json"), RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_tex.png"));
        this._factory.parseDragonBonesData(RES.getRes("resource/weapon_1004_show/weapon_1004_show_ske.json"));
        this._factory.parseTextureAtlasData(RES.getRes("resource/weapon_1004_show/weapon_1004_show_tex.json"), RES.getRes("resource/weapon_1004_show/weapon_1004_show_tex.png"));
        //
        this._armatureDisplay = this._factory.buildArmatureDisplay("mecha_1004d");
        this._armatureDisplay.animation.play();
        //
        this._armatureDisplay.x = 100.0;
        this._armatureDisplay.y = 200.0;
        this.addChild(this._armatureDisplay);
        //
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
            var localX = event.stageX - _this.x;
            if (localX < -150.0) {
                _this._replaceDisplay(-1);
            }
            else if (localX > 150.0) {
                _this._replaceDisplay(1);
            }
            else {
                _this._replaceDisplay(0);
            }
        }, this);
        //
        this.createText("Touch screen left / center / right to relace slot display.");
    };
    ReplaceSlotDisplay.prototype._replaceDisplay = function (type) {
        if (type === -1) {
            this._rightWeaponIndex++;
            this._rightWeaponIndex %= ReplaceSlotDisplay.WEAPON_RIGHT_LIST.length;
            var displayName = ReplaceSlotDisplay.WEAPON_RIGHT_LIST[this._rightWeaponIndex];
            this._factory.replaceSlotDisplay("weapon_1004_show", "weapon", "weapon_r", displayName, this._armatureDisplay.armature.getSlot("weapon_hand_r"));
        }
        else if (type === 1) {
            this._leftWeaponIndex++;
            this._leftWeaponIndex %= 5;
            this._armatureDisplay.armature.getSlot("weapon_hand_l").displayIndex = this._leftWeaponIndex;
        }
        else {
            var logoSlot = this._armatureDisplay.armature.getSlot("logo");
            if (logoSlot.display === this._logoText) {
                logoSlot.display = logoSlot.rawDisplay;
            }
            else {
                if (!this._logoText) {
                    this._logoText = new egret.TextField();
                    this._logoText.text = "Core Element";
                    this._logoText.anchorOffsetX = this._logoText.width * 0.5;
                    this._logoText.anchorOffsetY = this._logoText.height * 0.5;
                }
                logoSlot.display = this._logoText;
            }
        }
    };
    ReplaceSlotDisplay.WEAPON_RIGHT_LIST = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
    return ReplaceSlotDisplay;
}(BaseDemo));
