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
var fastify_1 = __importDefault(require("fastify"));
var dateType_1 = require("./dateType");
var getSubscription_1 = require("./getSubscription");
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
var args = yargs_1.default(helpers_1.hideBin(process.argv))
    .option("port", {
    description: "The port to bind on, default 3000.",
    type: "number",
    default: 3000,
})
    .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Display detailed logs.",
})
    .help()
    .parse();
var server = fastify_1.default({
    logger: args.verbose
});
server.get("/DateType", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, scheme, extension, i, url, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = request.query.baseUrl;
                scheme = request.query.scheme.split("/") || ["yymmdd"];
                extension = request.query.extension || "";
                if (baseUrl.at(-1) !== "/")
                    baseUrl += "/";
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 6];
                url = baseUrl +
                    dateType_1.parseDateType(scheme, i) +
                    (extension ? "." + extension : "");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, getSubscription_1.getSubscription(url)];
            case 3:
                result = _a.sent();
                response.status(200).send(result.data);
                return [3 /*break*/, 6];
            case 4:
                err_1 = _a.sent();
                console.error("Failed with Axios Error [" + err_1.code + "]. ");
                return [3 /*break*/, 5];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6:
                response.status(500).send("Fail to load from remote. ");
                return [2 /*return*/];
        }
    });
}); });
var start = function (port) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Server starts listening on port " + port + ".");
                return [4 /*yield*/, server.listen({ port: port })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start(args.port);
//# sourceMappingURL=index.js.map