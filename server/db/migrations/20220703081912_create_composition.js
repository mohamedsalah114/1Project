/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('composition', (table) => {
        table.increments('id');
        table.bigInteger('ingridient_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('ingridient');
        table.integer('amount').notNullable();
        table.bigInteger('measure_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('measure');
        table.string('additionally');
        table.bigInteger('dish_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('dish');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('composition');
};
