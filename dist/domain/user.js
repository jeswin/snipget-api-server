"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const psychopiggy_1 = require("psychopiggy");
function createUser(args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield psychopiggy_1.default.withTransaction((client) => __awaiter(this, void 0, void 0, function* () {
            const userParams = new psychopiggy_1.default.Params({
                username: args.username,
                name: args.name,
                email: args.email
            });
            yield client.query(`INSERT INTO user (${userParams.columns()}) VALUES (${userParams.ids()})`, userParams.values());
            const credentialParams = new psychopiggy_1.default.Params({
                username: args.username,
                name: args.name,
                email: args.email
            });
            yield client.query(`INSERT INTO credential (${credentialParams.columns()}) VALUES (${credentialParams.ids()})`, credentialParams.values());
        }));
    });
}
exports.createUser = createUser;
//# sourceMappingURL=user.js.map