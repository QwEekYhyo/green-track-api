import type { HttpContext } from "@adonisjs/core/http";

export default class UsersController {
    async me({ auth }: HttpContext) {
        const user = auth.user!;
        await user.load("reports");
        return user;
    }
}
