exports.up = function(knex) {
    return knex.schema.createTable('hpt', function(table){
        table.increments();

        table.string('hospital').notNullable();
        table.string('address').notNullable();
        table.decimal('value').notNullable();
        
        table.string('inputers_id').notNullable();

        table.foreign('inputers_id').references('id').inTable('inputers');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('hpt');
};
