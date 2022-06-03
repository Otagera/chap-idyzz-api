"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../decorators/index");
var app_1 = require("../../app");
var PAYSTACK = "https://api.paystack.co/transaction";
var Header = {
    Authorization: "Bearer ".concat(process.env.PAYSTACK_SECRET_KEY),
    "Content-Type": "application/json",
};
var ProductModel = (0, app_1.base)("product");
var OrderModel = mongoose_1.default.model("Order");
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.checkout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, products, callback_url, productsFound, totalAmount, newProducts, _b, _c, product, productRecord, e_1_1, paymentdata, POST, config, response, order, newOrder, error_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.body, email = _a.email, products = _a.products, callback_url = _a.callback_url;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 12, , 13]);
                        productsFound = [];
                        totalAmount = 0;
                        newProducts = [];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        _b = __values(products), _c = _b.next();
                        _e.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 6];
                        product = _c.value;
                        return [4 /*yield*/, ProductModel.select({
                                filterByFormula: "PartNumber = \"".concat(product.PartNumber, "\""),
                            }).all()];
                    case 4:
                        productRecord = _e.sent();
                        if (productRecord.length > 0) {
                            productsFound.push(productRecord[0].fields);
                            totalAmount += productRecord[0].fields.MSRP * product.quantity;
                            newProducts.push(__assign(__assign({}, product), { productId: productRecord[0].getId() }));
                        }
                        _e.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        paymentdata = JSON.stringify({
                            email: email,
                            amount: "".concat(totalAmount, "00"),
                            callback_url: callback_url || "https://www.google.com",
                        });
                        POST = "POST";
                        config = {
                            method: POST,
                            url: "".concat(PAYSTACK, "/initialize"),
                            headers: Header,
                            data: paymentdata,
                        };
                        return [4 /*yield*/, (0, axios_1.default)(config)];
                    case 10:
                        response = _e.sent();
                        order = new OrderModel({
                            products: newProducts,
                            amount: totalAmount,
                            paymentRef: response.data.data.reference,
                        });
                        return [4 /*yield*/, order.save({})];
                    case 11:
                        newOrder = _e.sent();
                        return [2 /*return*/, res.statusJson(200, {
                                data: {
                                    message: "Order checked out",
                                    order: newOrder,
                                    authorization_url: response.data.data.authorization_url,
                                },
                            })];
                    case 12:
                        error_1 = _e.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.statusJson(500, { error: error_1 })];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.verify = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, order, dataVerify, GET, configVerify, responseVerify, _a, data, status_1, productsArrays, ii, t, ii, products, _b, _c, product, prod, e_2_1, error_2;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        reference = req.params.reference;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, OrderModel.findOne({ paymentRef: reference })];
                    case 2:
                        order = _e.sent();
                        if (!order) return [3 /*break*/, 18];
                        dataVerify = JSON.stringify({ reference: reference });
                        GET = "GET";
                        configVerify = {
                            method: GET,
                            url: "".concat(PAYSTACK, "/verify/").concat(reference),
                            headers: Header,
                            data: dataVerify,
                        };
                        return [4 /*yield*/, (0, axios_1.default)(configVerify)];
                    case 3:
                        responseVerify = _e.sent();
                        _a = responseVerify.data, data = _a.data, status_1 = _a.status;
                        if (!(status_1 && data.status === "success")) return [3 /*break*/, 17];
                        order.status = true;
                        return [4 /*yield*/, order.save()];
                    case 4:
                        _e.sent();
                        productsArrays = [];
                        for (ii = 0; ii < order.products.length; ii = +9) {
                            t = [];
                            productsArrays.push(order.products.slice(ii, ii + 10));
                        }
                        ii = 0;
                        _e.label = 5;
                    case 5:
                        if (!(ii < productsArrays.length)) return [3 /*break*/, 16];
                        products = [];
                        _e.label = 6;
                    case 6:
                        _e.trys.push([6, 11, 12, 13]);
                        _b = (e_2 = void 0, __values(productsArrays[ii])), _c = _b.next();
                        _e.label = 7;
                    case 7:
                        if (!!_c.done) return [3 /*break*/, 10];
                        product = _c.value;
                        return [4 /*yield*/, ProductModel.find("".concat(product.productId))];
                    case 8:
                        prod = _e.sent();
                        products.push({
                            id: prod.getId(),
                            fields: {
                                Quantity: prod.get("Quantity") - product.quantity,
                            },
                        });
                        _e.label = 9;
                    case 9:
                        _c = _b.next();
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 13: return [4 /*yield*/, ProductModel.update(products)];
                    case 14:
                        _e.sent();
                        _e.label = 15;
                    case 15:
                        ii++;
                        return [3 /*break*/, 5];
                    case 16: return [2 /*return*/, res.statusJson(200, {
                            data: {
                                message: "Order verification successful",
                                order: order,
                            },
                        })];
                    case 17: return [2 /*return*/, res.statusJson(200, {
                            data: {
                                message: "Order verification unsuccessful",
                            },
                        })];
                    case 18: return [2 /*return*/, res.statusJson(200, {
                            data: {
                                message: "Order not found",
                            },
                        })];
                    case 19:
                        error_2 = _e.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.statusJson(500, { error: error_2 })];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, index_1.post)("/checkout"),
        (0, index_1.bodyValidator)("email", "products", "callback_url"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "checkout", null);
    __decorate([
        (0, index_1.get)("/verify/:reference"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "verify", null);
    OrderController = __decorate([
        (0, index_1.controller)("/api/order")
    ], OrderController);
    return OrderController;
}());
//# sourceMappingURL=OrderController.js.map