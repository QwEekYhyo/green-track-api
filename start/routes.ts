/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";

import AuthController from "#controllers/auth_controller";
import ReportsController from "#controllers/reports_controller";
import UsersController from "#controllers/users_controller";
import { middleware } from "./kernel.js";

router.get("/", async () => {
    return {
        hello: "world",
    };
});

router.get("/reports", [ReportsController, "all"]);

router
    .group(() => {
        router.post("/register", [AuthController, "register"]);
        router.post("/login", [AuthController, "login"]);
    })
    .prefix("/auth");

router
    .group(() => {
        router.get("/hello", async ({ auth }) => {
            return {
                hello: auth.user!.serialize().firstName,
            };
        });
        router.get("/me", [UsersController, "me"]);
        router.post("/reports", [ReportsController, "addReport"]);
    })
    .use(
        middleware.auth({
            guards: ["api"],
        })
    );
