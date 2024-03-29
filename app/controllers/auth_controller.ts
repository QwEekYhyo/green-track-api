import type { HttpContext } from "@adonisjs/core/http";

import User from "#models/user";

import { registerValidator, loginValidator } from "#validators/user";

export default class AuthController {
    async register({ request }: HttpContext) {
        const payload = await request.validateUsing(registerValidator);

        if (!(await User.findBy("username", payload.username))) {
            return await User.create(payload);
        }
    }

    async login({ request }: HttpContext) {
        const credentials = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(credentials.username, credentials.password);
        const token = await User.accessTokens.create(user);

        return {
            type: "bearer",
            token: token.value!.release(),
        };
    }
}
