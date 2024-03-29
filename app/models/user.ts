import { DateTime } from "luxon";
import { withAuthFinder } from "@adonisjs/auth";
import hash from "@adonisjs/core/services/hash";
import { compose } from "@adonisjs/core/helpers";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import { DbAccessTokensProvider } from "@adonisjs/auth/access_tokens";

import Report from "./report.js";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
    uids: ["username"],
    passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare firstName: string;

    @column()
    declare surname: string;

    @column()
    declare username: string;

    @column({ serializeAs: null })
    declare password: string;

    @column()
    declare isAgent: boolean;

    @hasMany(() => Report)
    declare reports: HasMany<typeof Report>;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    static accessTokens = DbAccessTokensProvider.forModel(User);
}
