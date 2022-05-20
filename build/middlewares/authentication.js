"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var authenticate = function (req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        try {
            if (token.startsWith('Bearer ')) {
                token = token.split(' ')[1];
            }
            var decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY);
            req.decoded = decodedToken;
            return next();
        }
        catch (error) {
            return res.status(401).send({ message: 'Unauthorized request, please provide a valid token.' });
        }
    }
    else {
        return res.status(401).send({ message: 'Unauthorized request, please login' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map