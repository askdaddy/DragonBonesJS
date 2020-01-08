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
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addChild(new HelloDragonBones());
        return _this;
        // this.addChild(new AnimationBase());
        // this.addChild(new DragonBonesEvent());
        // this.addChild(new AnimationLayer());
        // this.addChild(new BoneOffset());
        // this.addChild(new InverseKinematics());
        // this.addChild(new BoundingBox());
        // this.addChild(new MultiTextureAltas());
        // this.addChild(new ReplaceSlotDisplay());
        // this.addChild(new ReplaceSkin());
        // this.addChild(new ReplaceAnimation());
        // this.addChild(new coreElement.Game());
        // this.addChild(new EyeTracking());
        // this.addChild(new PerformanceTest());
    }
    return Main;
}(egret.DisplayObjectContainer));
