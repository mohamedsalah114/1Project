/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dish', (table) => {
        table.increments('id');
        table.bigInteger('category_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('category');
        table.bigInteger('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('user');
        table.bigInteger('nationality_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('nationality');
        table.bigInteger('special_group_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('special_group');
        table.jsonb('ingredients_info').notNullable();
        table.integer('cooking_time');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('img').notNullable();
        table.integer('comments_num');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dish');
};

