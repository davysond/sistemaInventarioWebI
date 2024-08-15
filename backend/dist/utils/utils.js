"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNulls = void 0;
const filterNulls = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null && value !== ''));
};
exports.filterNulls = filterNulls;
