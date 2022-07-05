"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateType = void 0;
function parseDateType(scheme, offset) {
    var timestamp = new Date().valueOf() - offset * 24 * 60 * 60 * 1000;
    var time = new Date(timestamp);
    var result = deepCopy(scheme);
    for (var i in result) {
        result[i] = result[i].replace("yy", time.getUTCFullYear().toString().substring(2));
        result[i] = result[i].replace("YYYY", time.getUTCFullYear().toString());
        result[i] = result[i].replace("mm", ("0" + (time.getUTCMonth() + 1).toString()).substring(-2));
        result[i] = result[i].replace("dd", ("0" + time.getUTCDate().toString()).substring(-2));
    }
    return result.join("/");
}
exports.parseDateType = parseDateType;
function deepCopy(obj) {
    var _obj = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        //@ts-ignore
        _obj[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
    }
    return _obj;
}
//# sourceMappingURL=dateType.js.map