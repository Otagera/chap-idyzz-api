"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var common_spec_1 = require("./common.spec");
describe("/api", function () {
    //So Id add authentication and try to signin before all the request and send the
    //token and be authenticated
    var cartId = "0";
    var userId = "0";
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new common_spec_1.UserModel({
                        username: "otagera",
                        password: 12345678,
                        email: "string",
                        address: "string",
                        firstname: "string",
                        lastname: "string",
                    });
                    return [4 /*yield*/, user.save()];
                case 1:
                    _a.sent();
                    userId = user._id;
                    return [2 /*return*/];
            }
        });
    }); });
    describe("post /order/checkout", function () {
        it("should checkout an order", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/order/checkout")
                                    .send({
                                    email: "otagera@gmail.com",
                                    products: [
                                        { PartNumber: "C000065S048A", quantity: 2 },
                                        { PartNumber: "N000082L124A", quantity: 2 },
                                        { PartNumber: "SG00PL3030AA", quantity: 2 },
                                        { PartNumber: "SG00PL3030AAd", quantity: 1 },
                                    ],
                                    callback_url: "www.google.com",
                                })];
                        case 1:
                            res = _a.sent();
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(res.body.data.length).not.equal(0);
                            (0, common_spec_1.expect)(res.body.data.message).equal("Order checked out");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("get /order/verify", function () {
        it("should unsuccessfully find order", function () {
            return __awaiter(this, void 0, void 0, function () {
                var ress, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/order/checkout")
                                    .send({
                                    email: "otagera@gmail.com",
                                    products: [
                                        { PartNumber: "C000065S048A", quantity: 2 },
                                        { PartNumber: "N000082L124A", quantity: 2 },
                                        { PartNumber: "SG00PL3030AA", quantity: 2 },
                                        { PartNumber: "SG00PL3030AAd", quantity: 1 },
                                    ],
                                    callback_url: "www.google.com",
                                })];
                        case 1:
                            ress = _a.sent();
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/order/verify/".concat(ress.body.data.order.paymentRef, "d"))];
                        case 2:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.length).not.equal(0);
                            (0, common_spec_1.expect)(data.message).equal("Order not found");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should unsuccessfully verify an order payment", function () {
            return __awaiter(this, void 0, void 0, function () {
                var ress, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/order/checkout")
                                    .send({
                                    email: "otagera@gmail.com",
                                    products: [
                                        { PartNumber: "C000065S048A", quantity: 2 },
                                        { PartNumber: "N000082L124A", quantity: 2 },
                                        { PartNumber: "SG00PL3030AA", quantity: 2 },
                                        { PartNumber: "SG00PL3030AAd", quantity: 1 },
                                    ],
                                    callback_url: "www.google.com",
                                })];
                        case 1:
                            ress = _a.sent();
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/order/verify/".concat(ress.body.data.order.paymentRef))];
                        case 2:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.length).not.equal(0);
                            (0, common_spec_1.expect)(data.message).equal("Order verification unsuccessful");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should successfully verify an order payment", function () {
            return __awaiter(this, void 0, void 0, function () {
                var ress;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/order/checkout")
                                    .send({
                                    email: "otagera@gmail.com",
                                    products: [
                                        { PartNumber: "C000065S048A", quantity: 2 },
                                        { PartNumber: "N000082L124A", quantity: 2 },
                                        { PartNumber: "SG00PL3030AA", quantity: 2 },
                                        { PartNumber: "SG00PL3030AAd", quantity: 1 },
                                    ],
                                    callback_url: "www.google.com",
                                })];
                        case 1:
                            ress = _a.sent();
                            console.log(ress.body.data.authorization_url);
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var res, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/order/verify/".concat(ress.body.data.order.paymentRef))];
                                        case 1:
                                            res = _a.sent();
                                            data = res.body.data;
                                            (0, common_spec_1.expect)(res.status).to.equal(200);
                                            (0, common_spec_1.expect)(data.length).not.equal(0);
                                            (0, common_spec_1.expect)(data.message).equal("Order verification successful");
                                            return [4 /*yield*/, common_spec_1.OrderModel.deleteMany()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 30000);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("post /cart", function () {
        it("should not find user", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, common_spec_1.CartModel.deleteMany({})];
                        case 1:
                            _a.sent();
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: "629551832fbf1068266f5cb6",
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 2 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recIwhNICRFecriHn", quantity: 5 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
                                    ],
                                })];
                        case 2:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).equal("User does not exist");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should add items to cart", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, common_spec_1.CartModel.deleteMany({})];
                        case 1:
                            _a.sent();
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: userId,
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 2 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recIwhNICRFecriHn", quantity: 5 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
                                    ],
                                })];
                        case 2:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(201);
                            (0, common_spec_1.expect)(data.length).not.equal(0);
                            (0, common_spec_1.expect)(data.message).equal("Products successfully added to cart");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should edit amount if product already in cart", function () {
            return __awaiter(this, void 0, void 0, function () {
                var addRes, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: userId,
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 2 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recIwhNICRFecriHn", quantity: 5 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
                                    ],
                                })];
                        case 1:
                            addRes = _a.sent();
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: userId,
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 4 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 13 },
                                        {
                                            productId: "recLuFdNG1DVRxZPo",
                                            quantity: 33,
                                        },
                                    ],
                                })];
                        case 2:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.length).not.equal(0);
                            (0, common_spec_1.expect)(data.message).equal("Products successfully edited to cart");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("GET /carts", function () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                var t;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(50000);
                            return [4 /*yield*/, common_spec_1.CartModel.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: userId,
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 2 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recIwhNICRFecriHn", quantity: 5 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
                                    ],
                                })];
                        case 2:
                            t = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should return all cart items", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(100000);
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/carts")];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            cartId = data.carts[0]._id;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.carts.length).equal(1);
                            (0, common_spec_1.expect)(data.message).equal("Retrieved carts successfully");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("GET /cart", function () {
        it("should return cart by id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/cart/".concat(cartId))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart retrieved successfully");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should find cart", function () {
            return __awaiter(this, void 0, void 0, function () {
                var generateId, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            generateId = function () {
                                var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
                                return (timestamp +
                                    "xxxxxxxxxxxxxxxx"
                                        .replace(/[x]/g, function () {
                                        return ((Math.random() * 16) | 0).toString(16);
                                    })
                                        .toLowerCase());
                            };
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/cart/".concat(generateId()))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart not found");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should say not found because of invalid cart id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).get("/api/cart/".concat("fjhrywhd"))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Invalid cart Id");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Delete /cart/:id/:productId", function () {
        it("should delete cart item by id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat(cartId, "/recESnRz5hSsHYFAO"))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart item deleted successfully");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should not find cart to delete", function () {
            return __awaiter(this, void 0, void 0, function () {
                var generateId, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            generateId = function () {
                                var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
                                return (timestamp +
                                    "xxxxxxxxxxxxxxxx"
                                        .replace(/[x]/g, function () {
                                        return ((Math.random() * 16) | 0).toString(16);
                                    })
                                        .toLowerCase());
                            };
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat(generateId(), "/recESnRz5hSsHYFAO"))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart by that id not found");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should not find cart to delete because of invalid cart id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat("fjhrywhd/recESnRz5hSsHYFAO"))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Invalid cart Id");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Delete /cart/:id", function () {
        it("should delete cart by id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat(cartId))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(200);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart deleted successfully");
                            (0, common_spec_1.expect)(data.cart.acknowledged).to.equal(true);
                            (0, common_spec_1.expect)(data.cart.deletedCount).to.equal(1);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should not find cart to delete", function () {
            return __awaiter(this, void 0, void 0, function () {
                var generateId, res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            generateId = function () {
                                var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
                                return (timestamp +
                                    "xxxxxxxxxxxxxxxx"
                                        .replace(/[x]/g, function () {
                                        return ((Math.random() * 16) | 0).toString(16);
                                    })
                                        .toLowerCase());
                            };
                            return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat(generateId()))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Cart by that id not found");
                            (0, common_spec_1.expect)(data.cart.acknowledged).to.equal(true);
                            (0, common_spec_1.expect)(data.cart.deletedCount).to.equal(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should not find cart to delete because of invalid cart id", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_spec_1.request)(common_spec_1.app).del("/api/cart/".concat("fjhrywhd"))];
                        case 1:
                            res = _a.sent();
                            data = res.body.data;
                            (0, common_spec_1.expect)(res.status).to.equal(404);
                            (0, common_spec_1.expect)(data.message).to.equal("Invalid cart Id");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=order.spec.js.map