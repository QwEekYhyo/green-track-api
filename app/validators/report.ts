import vine from "@vinejs/vine";

export const addReportValidator = vine.compile(
    vine.object({
        title: vine.string(),
        isBlockage: vine.boolean(),
        date: vine.date().optional(),
        address: vine.string(),
        city: vine.string(),
        zipCode: vine.string().fixedLength(5),
        description: vine.string().optional(),
    })
);

export const updateReportValidator = vine.compile(
    vine.object({
        id: vine.number().positive(),
        title: vine.string().optional(),
        isBlockage: vine.boolean().optional(),
        date: vine.date().optional(),
        address: vine.string().optional(),
        city: vine.string().optional(),
        zipCode: vine.string().fixedLength(5).optional(),
        description: vine.string().optional(),
    })
);
