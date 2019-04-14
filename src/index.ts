import Koa = require("koa");
import bodyParser = require("koa-bodyparser");
import router = require("koa-route");

/* tslint:disable */
declare module "koa" {
  interface Context {
    user: IUser;
  }
}

/* tslint:enable */

/*
  Supported urls
  --------------
  /
  /posts
  /projects
  /events
  /resume
  /todos
  /lessons

  Url rewrites
  ------------
  Before getting called, custom domain paths are rewritten with the rewrite middleware.
  So https://jeswin.org/posts/hello -> https://scuttle.space/jeswin/posts/hello
*/

async function init() {
  const app = new Koa();
  app.use(bodyParser());

  [router.get("/:username", user.home)].forEach(r => app.use(r));

  app.listen(3000);

  console.log("Listening on 3000");
}

init();
