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
