import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "users";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("surname").notNullable();
            table.string("username").notNullable();
            table.string("password");
            table.boolean("is_agent").notNullable().defaultTo(false);

            table.timestamp("created_at", { useTz: true });
            table.timestamp("updated_at", { useTz: true });
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
