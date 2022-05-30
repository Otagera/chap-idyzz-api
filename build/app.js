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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = exports.base = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var airtable_1 = __importDefault(require("airtable"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.base = new airtable_1.default({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_DB_ID);
exports.view = "Grid view";
/**
 * Create HTTP server.
 */
var server = http.createServer(exports.app);
// view engine setup
exports.app.set("views", path_1.default.join(__dirname, "views"));
exports.app.set("view engine", "ejs");
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use("/api/uploads", express_1.default.static("uploads"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
exports.app.use(function (req, res, next) {
    res.statusJson = function (statusCode, data) {
        var obj = __assign(__assign({}, data), { statusCode: statusCode });
        res.status(statusCode).json(obj);
        return;
    };
    next();
});
var AppRouter_1 = require("./AppRouter");
exports.app.use(AppRouter_1.AppRouter.getInstance());
require("./models/db");
require("./controllers/RootController");
require("./controllers/AuthController");
require("./controllers/APIController");
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error  handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
/**
 * Module dependencies.
 */
var debug = require("debug")("chapidyzz:server");
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
exports.app.set("port", port);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : addr ? "port " + addr.port : "";
    debug("Listening on " + bind);
    console.log("=============");
    console.log("=============");
    console.log("App is listening from port: " + port);
}
//# sourceMappingURL=app.js.map