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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = require("./decorators/index");
var UserModel = mongoose_1.default.model("User");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.userLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, dataF, users_1, error_1, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        dataF = {
                            message: "Auth failed!",
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel.find({
                                username: username.toLowerCase(),
                            })];
                    case 2:
                        users_1 = _b.sent();
                        if (users_1.length < 1) {
                            return [2 /*return*/, res.statusJson(401, { data: dataF })];
                        }
                        bcrypt_1.default.compare(password, users_1[0].password, function (err, result) {
                            if (err) {
                                return res.statusJson(401, { data: dataF });
                            }
                            if (result) {
                                var token = jsonwebtoken_1.default.sign({
                                    username: users_1[0].username,
                                    userId: users_1[0]._id,
                                }, process.env.JWT_KEY, {
                                    expiresIn: "48h",
                                });
                                var data = {
                                    message: "Auth Successful",
                                    token: token,
                                    username: users_1[0].username,
                                };
                                return res.statusJson(200, { data: data });
                            }
                            return res.statusJson(402, { data: dataF });
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        data = {
                            error: error_1,
                            success: false,
                        };
                        return [2 /*return*/, res.statusJson(500, { data: data })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.userSignup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, address, firstname, lastname, users, data, error_2, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email, address = _a.address, firstname = _a.firstname, lastname = _a.lastname;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel.find({
                                username: username.toLowerCase(),
                            })];
                    case 2:
                        users = _b.sent();
                        if (users.length >= 1) {
                            data = {
                                message: "Sorry this username has already been taken",
                            };
                            return [2 /*return*/, res.statusJson(409, { data: data })];
                        }
                        else {
                            bcrypt_1.default.hash(password, 10, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                var user, newUser, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!err) return [3 /*break*/, 1];
                                            return [2 /*return*/, res.statusJson(500, {
                                                    data: {
                                                        err: err,
                                                    },
                                                })];
                                        case 1:
                                            user = new UserModel({
                                                username: username.toLowerCase(),
                                                password: hash,
                                                email: email,
                                                address: address,
                                                firstname: firstname,
                                                lastname: lastname,
                                            });
                                            return [4 /*yield*/, user.save()];
                                        case 2:
                                            newUser = _a.sent();
                                            data = {
                                                message: "User created",
                                                success: true,
                                                user: newUser,
                                            };
                                            return [2 /*return*/, res.statusJson(200, { data: data })];
                                    }
                                });
                            }); });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log("===============");
                        console.log(error_2);
                        console.log("===============");
                        data = {
                            error: error_2,
                            success: false,
                        };
                        return [2 /*return*/, res.statusJson(500, { data: data })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.checkUserExistence = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, data, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.params.username;
                        data = { status: false };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel.findOne({
                                username: username,
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.statusJson(404, { data: data })];
                        }
                        data.status = true;
                        return [2 /*return*/, res.statusJson(200, { data: data })];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        data["error"] = error_3;
                        return [2 /*return*/, res.statusJson(500, { data: data })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, users, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            status: false,
                            users: [],
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel.find({})];
                    case 2:
                        users = _a.sent();
                        if (users.length === 0) {
                            return [2 /*return*/, res.statusJson(404, { data: data })];
                        }
                        data.status = true;
                        data.users = users;
                        return [2 /*return*/, res.statusJson(200, { data: data })];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        data["error"] = error_4;
                        return [2 /*return*/, res.statusJson(500, { data: data })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        data = {
                            status: false,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                            data.message = "Invalid object id";
                            return [2 /*return*/, res.statusJson(400, { data: data })];
                        }
                        return [4 /*yield*/, UserModel.findOne({ id: id })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            data.message = "User not found";
                            return [2 /*return*/, res.statusJson(404, { data: data })];
                        }
                        data.status = true;
                        data.user = user;
                        return [2 /*return*/, res.statusJson(200, { data: data })];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        data["error"] = error_5;
                        return [2 /*return*/, res.statusJson(500, { data: data })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, index_1.post)("/login"),
        (0, index_1.bodyValidator)("username", "password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "userLogin", null);
    __decorate([
        (0, index_1.post)("/signup"),
        (0, index_1.bodyValidator)("username", "password", "email", "address", "firstname", "lastname"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "userSignup", null);
    __decorate([
        (0, index_1.get)("/exist/:username"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "checkUserExistence", null);
    __decorate([
        (0, index_1.get)("/users"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "getAllUsers", null);
    __decorate([
        (0, index_1.get)("/users/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "getUser", null);
    AuthController = __decorate([
        (0, index_1.controller)("/auth")
    ], AuthController);
    return AuthController;
}());
//# sourceMappingURL=AuthController.js.map