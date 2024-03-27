import { DateTime } from "luxon";
import { withAuthFinder } from "@adonisjs/auth";
import hash from "@adonisjs/core/services/hash";
import { compose } from "@adonisjs/core/helpers";
import { BaseModel, column } from "@adonisjs/lucid/orm";
import { DbAccessTokensProvider } from "@adonisjs/auth/access_tokens";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
    uids: ["firstName", "surname"],
    passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare firstName: string | null;

    @column()
    declare surname: string | null;

    @column()
    declare password: string;

    @column()
    declare isAgent: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    static accessTokens = DbAccessTokensProvider.forModel(User);
}
