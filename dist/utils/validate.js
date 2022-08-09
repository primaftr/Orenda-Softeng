"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (email) => {
    if (!email.includes("@")) {
        return { errorMessage: "Invalid email!" };
    }
    if (email.length <= 2) {
        return {
            errorMessage: "Username length must be greater than 2 ",
        };
    }
    return { errorMessage: null };
};
exports.validateEmail = validateEmail;
