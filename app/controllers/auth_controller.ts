import type { HttpContext } from "@adonisjs/core/http";

import User from "#models/user";

import { registerValidator, loginValidator } from "#validators/user";

export default class AuthController {
    async register({ request }: HttpContext) {
        const credentials = request.all();
        const payload = await registerValidator.validate(credentials);

        if (!(await User.findBy("username", payload.username))) {
            return await User.create({
                firstName: payload.firstName,
                surname: payload.surname,
                username: payload.username,
                password: payload.password,
            });
        }
    }

    async login({ request }: HttpContext) {
        const credentials = await loginValidator.validate(request.all());
        const user = await User.verifyCredentials(credentials.username, credentials.password);
        const token = await User.accessTokens.create(user);

        return {
            type: "bearer",
            token: token.value!.release(),
        };
    }
}
