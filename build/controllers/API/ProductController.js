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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorators/index");
var app_1 = require("../../app");
var ProductModel = (0, app_1.base)("product");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quantity, productSelect, records, products_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quantity = req.query.quantity;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        productSelect = ProductModel.select({ view: app_1.view });
                        records = void 0;
                        if (!quantity) return [3 /*break*/, 3];
                        return [4 /*yield*/, productSelect.firstPage()];
                    case 2:
                        records = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, productSelect.all()];
                    case 4:
                        records = _a.sent();
                        _a.label = 5;
                    case 5:
                        products_1 = [];
                        records.map(function (record) {
                            //console.log(record);
                            products_1.push(__assign(__assign({}, record.fields), { id: record.getId() }));
                        });
                        if (products_1.length < 1) {
                            return [2 /*return*/, res.statusJson(404, { data: { message: "No Product" } })];
                        }
                        return [2 /*return*/, res.statusJson(200, { data: products_1 })];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.statusJson(500, { error: error_1 })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.searchProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, pathnumber, description, func, filterByFormula, funcs, fieldToFilter, key, element, finalFilter, records, products_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = req.query;
                        pathnumber = query.pathnumber, description = query.description, func = query.func;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        filterByFormula = "";
                        funcs = ["and", "or"];
                        fieldToFilter = {
                            pathnumber: "PartNumber",
                            description: "Description",
                        };
                        //make this check sort of dynamic
                        for (key in fieldToFilter) {
                            element = fieldToFilter[key];
                            if (query[key]) {
                                filterByFormula += filterByFormula ? " , " : "";
                                filterByFormula += "{".concat(element, "} = \"").concat(query[key], "\"");
                            }
                        }
                        if (!filterByFormula) return [3 /*break*/, 3];
                        finalFilter = func && funcs.includes(func)
                            ? "".concat(func.toUpperCase(), "(").concat(filterByFormula, ")")
                            : filterByFormula;
                        console.log(finalFilter);
                        return [4 /*yield*/, ProductModel.select({
                                filterByFormula: finalFilter,
                            }).all()];
                    case 2:
                        records = _a.sent();
                        products_2 = [];
                        records.map(function (record) {
                            //console.log(record);
                            products_2.push(__assign(__assign({}, record.fields), { id: record.getId() }));
                        });
                        if (products_2.length < 1) {
                            return [2 /*return*/, res.statusJson(404, { data: { message: "No Product" } })];
                        }
                        return [2 /*return*/, res.statusJson(200, { data: products_2 })];
                    case 3: return [2 /*return*/, res.statusJson(404, { data: { message: "No Product" } })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.statusJson(500, { error: error_2 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.getProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productRecord, product, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ProductModel.find(id)];
                    case 2:
                        productRecord = _a.sent();
                        if (!productRecord) {
                            return [2 /*return*/, res.statusJson(404, { data: { message: "No Product" } })];
                        }
                        product = __assign(__assign({}, productRecord.fields), { id: productRecord.getId() });
                        return [2 /*return*/, res.statusJson(200, { data: product })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.statusJson(error_3.statusCode || 500, { error: error_3 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, index_1.get)("/products"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "getProducts", null);
    __decorate([
        (0, index_1.get)("/products/search"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "searchProducts", null);
    __decorate([
        (0, index_1.get)("/product/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "getProduct", null);
    ProductController = __decorate([
        (0, index_1.controller)("/api")
    ], ProductController);
    return ProductController;
}());
//# sourceMappingURL=ProductController.js.map