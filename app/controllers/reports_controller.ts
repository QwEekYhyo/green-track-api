import type { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";

import { addReportValidator } from "#validators/report";
import Report from "#models/report";

export default class ReportsController {
    async all() {
        return await Report.query().preload("author");
    }

    async addReport({ request, auth }: HttpContext) {
        const reportInfo = await request.validateUsing(addReportValidator);
        const reportDate = reportInfo.date ? DateTime.fromJSDate(reportInfo.date) : undefined;
        return await auth.user!.related("reports").create({
            title: reportInfo.title,
            isBlockage: reportInfo.isBlockage,
            date: reportDate,
            address: reportInfo.address,
            city: reportInfo.city,
            zipCode: reportInfo.zipCode,
            description: reportInfo.description,
        });
    }
}
