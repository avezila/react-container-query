"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash/isEqual");
var resize_observer_lite_1 = require("resize-observer-lite");
var matchQueries_1 = require("container-query-toolkit/lib/matchQueries");
var ContainerQueryCore = (function () {
    function ContainerQueryCore(query, callback) {
        var _this = this;
        this.result = {};
        this.rol = new resize_observer_lite_1.default(function (size) {
            var result = matchQueries_1.default(query)(size);
            if (!isEqual(_this.result, result)) {
                callback(result, size);
                _this.result = result;
            }
        });
    }
    ContainerQueryCore.prototype.observe = function (element) {
        this.rol.observe(element);
    };
    ContainerQueryCore.prototype.disconnect = function () {
        this.rol.disconnect();
    };
    return ContainerQueryCore;
}());
exports.default = ContainerQueryCore;
//# sourceMappingURL=ContainerQueryCore.js.map