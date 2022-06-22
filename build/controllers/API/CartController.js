"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = require("../decorators/index");
var app_1 = require("../../app");
var UserModel = mongoose_1.default.model("User");
var CartModel = mongoose_1.default.model("Cart");
var ProductModel = (0, app_1.base)("product");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    //write test asap for this and other cart operations
    //add
    //   new cart item
    // edit
    //  cart items is taken care of in add
    //  cart item
    // delete
    //  multiple items
    //  entire items
    //  one item
    CartController.prototype.addToCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, products, productMap, _b, _c, product, productRecord, e_1_1, user, cart, _d, _e, item, productId, productQ, productMap_1, productMap_1_1, _f, productId, quantity, newCart, error_1;
            var e_1, _g, e_2, _h, e_3, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, products = _a.products;
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 18, , 19]);
                        productMap = new Map();
                        _k.label = 2;
                    case 2:
                        _k.trys.push([2, 7, 8, 9]);
                        _b = __values(products), _c = _b.next();
                        _k.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 6];
                        product = _c.value;
                        return [4 /*yield*/, ProductModel.find(product.productId)];
                    case 4:
                        productRecord = _k.sent();
                        productRecord && productMap.set(product.productId, product.quantity);
                        _k.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_g = _b.return)) _g.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, UserModel.findById(userId)];
                    case 10:
                        user = _k.sent();
                        if (!user) return [3 /*break*/, 16];
                        return [4 /*yield*/, CartModel.findOne({
                                userId: userId,
                            })];
                    case 11:
                        cart = _k.sent();
                        if (!cart) return [3 /*break*/, 13];
                        try {
                            for (_d = __values(cart.cartItems), _e = _d.next(); !_e.done; _e = _d.next()) {
                                item = _e.value;
                                productId = item.productId;
                                productQ = productMap.get(productId);
                                if (productQ) {
                                    item.quantity = productQ;
                                    productMap.delete(productId);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        try {
                            for (productMap_1 = __values(productMap), productMap_1_1 = productMap_1.next(); !productMap_1_1.done; productMap_1_1 = productMap_1.next()) {
                                _f = __read(productMap_1_1.value, 2), productId = _f[0], quantity = _f[1];
                                cart.cartItems.push({
                                    quantity: quantity,
                                    productId: productId,
                                });
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (productMap_1_1 && !productMap_1_1.done && (_j = productMap_1.return)) _j.call(productMap_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [4 /*yield*/, cart.save({})];
                    case 12:
                        _k.sent();
                        return [2 /*return*/, res.statusJson(200, {
                                data: {
                                    message: "Products successfully edited to cart",
                                    cart: cart,
                                },
                            })];
                    case 13:
                        newCart = new CartModel({
                            userId: userId,
                            cartItems: products,
                        });
                        return [4 /*yield*/, newCart.save({})];
                    case 14:
                        _k.sent();
                        return [2 /*return*/, res.statusJson(201, {
                                data: {
                                    message: "Products successfully added to cart",
                                    cart: newCart,
                                },
                            })];
                    case 15: return [3 /*break*/, 17];
                    case 16: return [2 /*return*/, res.statusJson(404, {
                            data: {
                                message: "User does not exist",
                            },
                        })];
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        error_1 = _k.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.statusJson(500, { error: error_1 })];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.getCarts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var carts, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, CartModel.find({})];
                    case 1:
                        carts = _a.sent();
                        return [2 /*return*/, res.statusJson(200, {
                                data: {
                                    message: "Retrieved carts successfully",
                                    carts: carts,
                                },
                            })];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.statusJson(500, { error: error_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.getCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cart, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, CartModel.findById(id)];
                    case 2:
                        cart = _a.sent();
                        if (cart) {
                            return [2 /*return*/, res.statusJson(200, {
                                    data: {
                                        message: "Cart retrieved successfully",
                                        cart: cart,
                                    },
                                })];
                        }
                        else {
                            return [2 /*return*/, res.statusJson(404, {
                                    data: {
                                        message: "Cart not found",
                                    },
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.statusJson(404, {
                            data: {
                                message: "Invalid cart Id",
                            },
                        })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.statusJson(500, { error: error_3 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.deleteCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cart, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, CartModel.deleteOne({ id: id })];
                    case 2:
                        cart = _a.sent();
                        if (cart.deletedCount) {
                            return [2 /*return*/, res.statusJson(200, {
                                    data: {
                                        message: "Cart deleted successfully",
                                        cart: cart,
                                    },
                                })];
                        }
                        else {
                            return [2 /*return*/, res.statusJson(404, {
                                    data: {
                                        message: "Cart by that id not found",
                                        cart: cart,
                                    },
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.statusJson(404, {
                            data: {
                                message: "Invalid cart Id",
                            },
                        })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.statusJson(500, { error: error_4 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.deleteCartItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, productId, cart, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, id = _a.id, productId = _a.productId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) return [3 /*break*/, 6];
                        return [4 /*yield*/, CartModel.findById(id)];
                    case 2:
                        cart = _b.sent();
                        if (!cart) return [3 /*break*/, 4];
                        cart.cartItems = cart.cartItems.filter(function (item) { return item.productId !== productId; });
                        return [4 /*yield*/, cart.save({})];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.statusJson(200, {
                                data: {
                                    message: "Cart item deleted successfully",
                                    cart: cart,
                                },
                            })];
                    case 4: return [2 /*return*/, res.statusJson(404, {
                            data: {
                                message: "Cart by that id not found",
                            },
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.statusJson(404, {
                            data: {
                                message: "Invalid cart Id",
                            },
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _b.sent();
                        console.log(error_5);
                        return [2 /*return*/, res.statusJson(500, { error: error_5 })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, index_1.post)("/cart"),
        (0, index_1.bodyValidator)("userId", "products"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CartController.prototype, "addToCart", null);
    __decorate([
        (0, index_1.get)("/carts"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CartController.prototype, "getCarts", null);
    __decorate([
        (0, index_1.get)("/cart/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CartController.prototype, "getCart", null);
    __decorate([
        (0, index_1.del)("/cart/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CartController.prototype, "deleteCart", null);
    __decorate([
        (0, index_1.del)("/cart/:id/:productId"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CartController.prototype, "deleteCartItem", null);
    CartController = __decorate([
        (0, index_1.controller)("/api")
    ], CartController);
    return CartController;
}());
//# sourceMappingURL=CartController.js.map