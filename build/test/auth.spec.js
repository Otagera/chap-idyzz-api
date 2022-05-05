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
var UserModel = mongoose_1.default.model("User");
describe("/auth", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel.deleteMany({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("GET /users", function () {
        it("should return all users", function () { return __awaiter(void 0, void 0, void 0, function () {
            var users, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = [
                            { username: "otagera", password: "12345678" },
                            { username: "leo", password: "12345678" },
                            { username: "lenxo", password: "12345678" },
                        ];
                        return [4 /*yield*/, UserModel.insertMany(users)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/auth/users")];
                    case 2:
                        res = _a.sent();
                        console.log(res.body.statusCode);
                        console.log(res.body.data.users.length);
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.users.length).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /users/:id", function () {
        it("should return a user if valid id is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new UserModel({
                            username: "otagera",
                            password: 12345678,
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/auth/users/" + user._id)];
                    case 2:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.user).to.have.property("username", user.username);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 404 error when invalid object id is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/auth/users/1")];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 404 when valid object id is passed but does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/auth/users/123456789012")];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /signup", function () {
        it("should return new user when all request body is valid to signup", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
                            username: "lenzo",
                            password: "12345678",
                        })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.user).to.have.property("username", "lenzo");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /login", function () {
        it("should throw error because of wrong username", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, loginWrongUsernameRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
                            username: "lenzo",
                            password: "12345678",
                        })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.user).to.have.property("username", "lenzo");
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app)
                                .post("/auth/login")
                                .send({
                                username: "lenzoo",
                                password: "12345678",
                            })];
                    case 2:
                        loginWrongUsernameRes = _a.sent();
                        (0, chai_1.expect)(loginWrongUsernameRes.body.statusCode).to.equal(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error because of wrong password", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, loginWrongPasswordRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
                            username: "lenzo",
                            password: "12345678",
                        })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.user).to.have.property("username", "lenzo");
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app)
                                .post("/auth/login")
                                .send({
                                username: "lenzo",
                                password: "123456789",
                            })];
                    case 2:
                        loginWrongPasswordRes = _a.sent();
                        (0, chai_1.expect)(loginWrongPasswordRes.body.statusCode).to.equal(402);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return tokens after login in", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, loginRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
                            username: "lenzo",
                            password: "12345678",
                        })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.body.statusCode).to.equal(200);
                        (0, chai_1.expect)(res.body.data.user).to.have.property("username", "lenzo");
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/auth/login").send({
                                username: "lenzo",
                                password: "12345678",
                            })];
                    case 2:
                        loginRes = _a.sent();
                        (0, chai_1.expect)(loginRes.body.statusCode).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=auth.spec.js.map