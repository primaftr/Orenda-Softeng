"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling = (err, column) => {
    if (err.errno == "1062") {
        return { status: 409, message: `${column} already exist!` };
    }
    else {
        return { status: 400, message: err };
    }
};
exports.default = errorHandling;
