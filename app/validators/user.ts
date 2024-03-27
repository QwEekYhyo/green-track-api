import vine from "@vinejs/vine";

export const registerValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim().maxLength(30),
        surname: vine.string().trim().maxLength(30),
        username: vine.string().trim().maxLength(30),
        password: vine.string().trim().minLength(5),
    })
);

export const loginValidator = vine.compile(
    vine.object({
        username: vine.string().trim().maxLength(30),
        password: vine.string().trim().minLength(5),
    })
);
