/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id');
        table.bigInteger('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('user');
        table.bigInteger('dish_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('user');
        table.string('content').notNullable();;
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
