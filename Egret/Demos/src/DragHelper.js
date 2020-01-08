"use strict";
var DragHelper = /** @class */ (function () {
    function DragHelper() {
        this._helpPoint = new egret.Point();
        this._dragOffset = new egret.Point();
        this._dragDisplayObject = null;
    }
    DragHelper.getInstance = function () {
        return DragHelper._instance;
    };
    DragHelper.prototype.enableDrag = function (displayObject) {
        displayObject.touchEnabled = true;
        displayObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._dragHandler, this);
        displayObject.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._dragHandler, this);
        displayObject.addEventListener(egret.TouchEvent.TOUCH_END, this._dragHandler, this);
    };
    DragHelper.prototype.disableDrag = function (displayObject) {
        displayObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._dragHandler, this);
        displayObject.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._dragHandler, this);
        displayObject.removeEventListener(egret.TouchEvent.TOUCH_END, this._dragHandler, this);
    };
    DragHelper.prototype._dragHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this._dragDisplayObject) {
                    return;
                }
                this._dragDisplayObject = event.target;
                var armatureDisplay = this._dragDisplayObject.parent;
                var bone = armatureDisplay.armature.getBoneByDisplay(this._dragDisplayObject);
                if (bone) {
                    armatureDisplay.globalToLocal(event.stageX, event.stageY, this._helpPoint);
                    if (bone.offsetMode !== dragonBones.OffsetMode.Override) {
                        bone.offsetMode = dragonBones.OffsetMode.Override;
                        bone.offset.x = bone.global.x;
                        bone.offset.y = bone.global.y;
                    }
                    this._dragOffset.x = bone.offset.x - this._helpPoint.x;
                    this._dragOffset.y = bone.offset.y - this._helpPoint.y;
                    this._dragDisplayObject.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._dragHandler, this);
                }
                break;
            case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
            case egret.TouchEvent.TOUCH_END:
                if (this._dragDisplayObject) {
                    this._dragDisplayObject.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._dragHandler, this);
                    this._dragDisplayObject = null;
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (this._dragDisplayObject) {
                    var armatureDisplay_1 = this._dragDisplayObject.parent;
                    var bone_1 = armatureDisplay_1.armature.getBoneByDisplay(this._dragDisplayObject);
                    if (bone_1) {
                        armatureDisplay_1.globalToLocal(event.stageX, event.stageY, this._helpPoint);
                        bone_1.offset.x = this._helpPoint.x + this._dragOffset.x;
                        bone_1.offset.y = this._helpPoint.y + this._dragOffset.y;
                        bone_1.invalidUpdate();
                    }
                }
                break;
        }
    };
    DragHelper._instance = new DragHelper();
    return DragHelper;
}());
