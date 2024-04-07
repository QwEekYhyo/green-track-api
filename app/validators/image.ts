import vine from "@vinejs/vine";

export const uploadImageValidator = vine.compile(
    vine.object({
        image: vine.file({
            size: "80mb",
            extnames: ["jpg", "jpeg", "png", "gif"],
        }),
        reportId: vine.number().positive(),
    })
);
