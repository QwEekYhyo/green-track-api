import type { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import { cuid } from "@adonisjs/core/helpers";

import { uploadImageValidator } from "#validators/image";
import Report from "#models/report";

export default class ImagesController {
    async uploadImage({ request }: HttpContext) {
        const truc = {
            ...request.all(),
            ...request.allFiles()
        };
        const imageInfo = await uploadImageValidator.validate(truc);

        const image = imageInfo.image;
        const report = await Report.findOrFail(imageInfo.reportId);
        await image!.move(app.makePath("uploads"), {
            name: `${cuid()}.${image.extname}`
        });

        return await report.related("images").create({
            fileName: image.fileName,
        });
    }
}
