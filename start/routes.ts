/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import app from "@adonisjs/core/services/app";

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

router.post("/image", async ({ request }) => {
    const image = request.file("file");
    console.log(image);
    await image?.move(app.makePath("uploads"));
    return image;
});
router.get("/image", async ({ response }) => {
    const absolutePath = app.makePath("uploads/test.png");
    return response.download(absolutePath);
});

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
        router.put("/reports", [ReportsController, "updateReport"]);
        router.patch("/reports", [ReportsController, "updateReport"]);
    })
    .use(
        middleware.auth({
            guards: ["api"],
        })
    );
