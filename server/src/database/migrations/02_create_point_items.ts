import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary()
    /*
    No campo point_id ele cria uma chave extrangeira na tabela points no campo id
    Todo campo id dessa tebela precisa ser um id válido dentro da tabela points

    Observação: no knex o id é integer por padrão
    */
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points')
    // item_id faz a mesma coisa o point_id
    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items')
}