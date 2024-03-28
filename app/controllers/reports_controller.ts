import type { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";

import { addReportValidator } from "#validators/report";

export default class ReportsController {
    async addReport({ request, auth }: HttpContext) {
        const reportInfo = await addReportValidator.validate(request.all());
        const reportDate = reportInfo.date ? DateTime.fromJSDate(reportInfo.date) : undefined;
        const report = await auth.user?.related("reports").create({
            title: reportInfo.title,
            isBlockage: reportInfo.isBlockage,
            date: reportDate,
            address: reportInfo.address,
            city: reportInfo.city,
            zipCode: reportInfo.zipCode,
            description: reportInfo.description,
        });
        return report;
    }
}
