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
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("koa-route");
const session_1 = require("./api/session");
const packages_1 = require("./api/packages");
const publish_1 = require("./api/publish");
const search_1 = require("./api/search");
const users_1 = require("./api/users");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new Koa();
        app.use(bodyParser());
        [
            router.get("/users/:id", users_1.getUser),
            router.post("/users", users_1.createUser),
            router.del("/users/:id", users_1.removeUser),
            router.post("/login", session_1.login),
            router.get("/logout", session_1.logout),
            router.get("/packages/:id", packages_1.getPackage),
            router.get("/packages/:id/:versions", packages_1.getVersions),
            router.post("/packages", publish_1.publish),
            router.del("/packages/:id/:version", publish_1.removeVersion),
            router.get("/search", search_1.search)
        ].forEach(r => app.use(r));
        app.listen(3000);
        console.log("Listening on 3000");
    });
}
init();
//# sourceMappingURL=index.js.map