import Koa = require("koa");
import bodyParser = require("koa-bodyparser");
import router = require("koa-route");
import { login, logout } from "./api/session";
import { getPackage, getVersions } from "./api/packages";
import { publish, removeVersion } from "./api/publish";
import { search } from "./api/search";
import { getUser, createUser, removeUser } from "./api/users";

async function init() {
  const app = new Koa();
  app.use(bodyParser());

  [
    router.get("/users/:id", getUser),
    router.post("/users", createUser),
    router.del("/users/:id", removeUser),
    router.post("/login", login),
    router.get("/logout", logout),
    router.get("/packages/:id", getPackage),
    router.get("/packages/:id/:versions", getVersions),
    router.post("/packages", publish),
    router.del("/packages/:id/:version", removeVersion),
    router.get("/search", search)
  ].forEach(r => app.use(r));

  app.listen(3000);

  console.log("Listening on 3000");
}

init();
