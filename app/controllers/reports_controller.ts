import type { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";

import { addReportValidator, updateReportValidator } from "#validators/report";
import UnauthorizedException from "#exceptions/unauthorized_exception";
import Report from "#models/report";

export default class ReportsController {
    async all() {
        return await Report.query().preload("author");
    }

    async addReport({ request, auth }: HttpContext) {
        const reportInfo = await request.validateUsing(addReportValidator);
        const reportDate = reportInfo.date ? DateTime.fromJSDate(reportInfo.date) : undefined;
        return await auth.user!.related("reports").create({
            ...reportInfo,
            date: reportDate,
        });
    }

    async updateReport({ request, auth }: HttpContext) {
        const updateInfo = await request.validateUsing(updateReportValidator);
        const report = await Report.findOrFail(updateInfo.id);
        if (auth.user!.id != report.userId && !auth.user!.isAgent)
            throw new UnauthorizedException("Your are not the author of this report");

        const reportDate = updateInfo.date ? DateTime.fromJSDate(updateInfo.date) : undefined;
        return await report
            .merge({
                ...updateInfo,
                date: reportDate,
            })
            .save();
    }
}
