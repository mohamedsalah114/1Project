/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ingridient', (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.bigInteger('product_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('product');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ingridient');
};
