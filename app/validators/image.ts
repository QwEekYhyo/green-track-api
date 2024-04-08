import vine from "@vinejs/vine";

export const uploadImageValidator = vine.compile(
    vine.object({
        images: vine.array(
            vine.file({
                size: "80mb",
                extnames: ["jpg", "jpeg", "png", "gif"],
            }),
        ),
        reportId: vine.number().positive(),
    })
);
