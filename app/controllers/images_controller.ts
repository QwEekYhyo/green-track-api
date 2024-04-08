import type { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import { cuid } from "@adonisjs/core/helpers";

import { uploadImageValidator } from "#validators/image";
import Report from "#models/report";
import UnauthorizedException from "#exceptions/unauthorized_exception";

export default class ImagesController {
    async uploadImage({ request, auth }: HttpContext) {
        const truc = {
            ...request.all(),
            ...request.allFiles(),
        };
        const imageInfo = await uploadImageValidator.validate(truc);

        const images = imageInfo.images;
        const report = await Report.findOrFail(imageInfo.reportId);

        if (auth.user!.id != report.userId && !auth.user!.isAgent)
            throw new UnauthorizedException("Your are not the author of this report");

        let results = []
        for (let image of images) {
            await image.move(app.makePath("uploads"), {
                name: `${cuid()}.${image.extname}`,
            });

            results.push(await report.related("images").create({
                fileName: image.fileName,
            }));
        }
        return results;
    }

    async downloadImage({ request, response }: HttpContext) {
        const fileName = request.param("*")[0];
        const path = app.makePath("uploads", fileName);
        return response.download(path);
    }
}
