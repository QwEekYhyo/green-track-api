import { DateTime } from "luxon";
import type { BelongsTo, HasMany } from "@adonisjs/lucid/types/relations";
import { BaseModel, belongsTo, column, hasMany } from "@adonisjs/lucid/orm";

import User from "./user.js";
import Image from "./image.js";

export default class Report extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare title: string;

    @column()
    declare isBlockage: boolean;

    @column.dateTime()
    declare date: DateTime;

    @column()
    declare address: string;

    @column()
    declare city: string;

    @column()
    declare zipCode: string;

    @column()
    declare description: string;

    @column()
    declare userId: number;

    @belongsTo(() => User)
    declare author: BelongsTo<typeof User>;

    @hasMany(() => Image)
    declare images: HasMany<typeof Image>;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;
}
