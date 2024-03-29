import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "reports";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("title").notNullable();
            table.boolean("is_blockage").notNullable();
            table.timestamp("date", { useTz: true }).notNullable().defaultTo(this.now());
            table.text("address").notNullable();
            table.string("city").notNullable();
            table.string("zip_code").notNullable();
            table.text("description").notNullable().defaultTo("");
            table.integer("user_id").unsigned().references("users.id").onDelete("CASCADE");

            table.timestamp("created_at", { useTz: true });
            table.timestamp("updated_at", { useTz: true });
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
