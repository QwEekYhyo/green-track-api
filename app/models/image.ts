import { DateTime } from "luxon";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";

import Report from "./report.js";

export default class Image extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare fileName: string;

    @column()
    declare reportId: number;

    @belongsTo(() => Report)
    declare parentReport: BelongsTo<typeof Report>;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;
}
