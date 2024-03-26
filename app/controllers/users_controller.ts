import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

import { registerValidator } from '#validators/user'

export default class UsersController {
    async register({ request }: HttpContext) {
        const credentials = request.all()
        const payload = await registerValidator.validate(credentials)

        // only check for surname, we need to also check for first name
        if (!(await User.findBy('surname', payload.surname))) {
            return await User.create({
                firstName: payload.firstName,
                surname: payload.surname,
                password: payload.password
            })
        }
    }
}
