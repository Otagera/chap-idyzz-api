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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var basename = path_1.default.basename(__filename);
console.log("index");
var db = {};
var setUpDB = function () {
    var e_1, _a, _b;
    var files = fs_1.default.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-9) === ".model.js");
    });
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var file = files_1_1.value;
            var model = require(path_1.default.join(__dirname, file));
            db = __assign(__assign({}, db), (_b = {}, _b[Object.keys(model)[0]] = model[Object.keys(model)[0]], _b));
            console.log("db", db);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return db;
};
setUpDB();
console.log("***************");
console.log(db);
console.log("***************");
exports.default = setUpDB();
//# sourceMappingURL=index.js.map