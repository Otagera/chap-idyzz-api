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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var chai_1 = require("chai");
var app_1 = require("../app");
var ProductModel = (0, app_1.base)("product");
var OrderModel = mongoose_1.default.model("Order");
var CartModel = mongoose_1.default.model("Cart");
describe("/api", function () {
    //So Id add authentication and try to signin before all the request and send the
    //token and be authenticated
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); });
    /* describe("post /order/checkout", () => {
      it("should checkout an order", async function () {
        this.timeout(100000);
        const res = await request(app)
          .post("/api/order/checkout")
          .send({
            email: "otagera@gmail.com",
            products: [
              { PartNumber: "C000065S048A", quantity: 2 },
              { PartNumber: "N000082L124A", quantity: 2 },
              { PartNumber: "SG00PL3030AA", quantity: 2 },
              { PartNumber: "SG00PL3030AAd", quantity: 1 },
            ],
          });
        expect(res.status).to.equal(200);
        expect(res.body.data.length).not.equal(0);
        expect(res.body.data.message).equal("Order checked out");
      });
    });
    describe("get /order/verify", () => {
      it("should unsuccessfully find order", async function () {
        this.timeout(100000);
        const ress = await request(app)
          .post("/api/order/checkout")
          .send({
            email: "otagera@gmail.com",
            products: [
              { PartNumber: "C000065S048A", quantity: 2 },
              { PartNumber: "N000082L124A", quantity: 2 },
              { PartNumber: "SG00PL3030AA", quantity: 2 },
              { PartNumber: "SG00PL3030AAd", quantity: 1 },
            ],
          });
        const res = await request(app).get(
          `/api/order/verify/${ress.body.data.order.paymentRef}d`
        );
        const { data } = res.body;
        expect(res.status).to.equal(200);
        expect(data.length).not.equal(0);
        expect(data.message).equal("Order not found");
      });
      it("should unsuccessfully verify an order payment", async function () {
        this.timeout(100000);
        const ress = await request(app)
          .post("/api/order/checkout")
          .send({
            email: "otagera@gmail.com",
            products: [
              { PartNumber: "C000065S048A", quantity: 2 },
              { PartNumber: "N000082L124A", quantity: 2 },
              { PartNumber: "SG00PL3030AA", quantity: 2 },
              { PartNumber: "SG00PL3030AAd", quantity: 1 },
            ],
          });
        const res = await request(app).get(
          `/api/order/verify/${ress.body.data.order.paymentRef}`
        );
        const { data } = res.body;
        expect(res.status).to.equal(200);
        expect(data.length).not.equal(0);
        expect(data.message).equal("Order verification unsuccessful");
      });
      it("should successfully verify an order payment", async function () {
        this.timeout(100000);
        const ress = await request(app)
          .post("/api/order/checkout")
          .send({
            email: "otagera@gmail.com",
            products: [
              { PartNumber: "C000065S048A", quantity: 2 },
              { PartNumber: "N000082L124A", quantity: 2 },
              { PartNumber: "SG00PL3030AA", quantity: 2 },
              { PartNumber: "SG00PL3030AAd", quantity: 1 },
            ],
          });
        console.log(ress.body.data.authorization_url);
        setTimeout(async () => {
          const res = await request(app).get(
            `/api/order/verify/${ress.body.data.order.paymentRef}`
          );
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(data.length).not.equal(0);
          expect(data.message).equal("Order verification successful");
          await OrderModel.deleteMany();
        }, 30000);
      });
    }); */
    describe("post /cart", function () {
        it("should add items to cart", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, CartModel.deleteMany({})];
                        case 1:
                            _a.sent();
                            this.timeout(100000);
                            return [4 /*yield*/, (0, supertest_1.default)(app_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: "629551832fbf1068266f5cb7",
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
                            (0, chai_1.expect)(res.status).to.equal(201);
                            (0, chai_1.expect)(data.length).not.equal(0);
                            (0, chai_1.expect)(data.message).equal("Products successfully added to cart");
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
                            return [4 /*yield*/, (0, supertest_1.default)(app_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: "629551832fbf1068266f5cb7",
                                    products: [
                                        { productId: "recGvUezjm2KUtCdc", quantity: 2 },
                                        { productId: "recESnRz5hSsHYFAO", quantity: 12 },
                                        { productId: "recIwhNICRFecriHn", quantity: 5 },
                                        { productId: "recKsJ9EvLq5VOIAR", quantity: 1 },
                                    ],
                                })];
                        case 1:
                            addRes = _a.sent();
                            return [4 /*yield*/, (0, supertest_1.default)(app_1.app)
                                    .post("/api/cart")
                                    .send({
                                    userId: "629551832fbf1068266f5cb7",
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
                            (0, chai_1.expect)(res.status).to.equal(200);
                            (0, chai_1.expect)(data.length).not.equal(0);
                            (0, chai_1.expect)(data.message).equal("Products successfully edited to cart");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=order.spec.js.map