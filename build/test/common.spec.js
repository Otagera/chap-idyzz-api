"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.OrderModel = exports.ProductModel = exports.UserModel = exports.request = exports.url = exports.app = exports.expect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
exports.request = supertest_1.default;
var chai_1 = require("chai");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return chai_1.expect; } });
var app_1 = require("../app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
var url_1 = __importDefault(require("url"));
exports.url = url_1.default;
exports.UserModel = mongoose_1.default.model("User");
exports.ProductModel = (0, app_1.base)("product");
exports.OrderModel = mongoose_1.default.model("Order");
exports.CartModel = mongoose_1.default.model("Cart");
//# sourceMappingURL=common.spec.js.map