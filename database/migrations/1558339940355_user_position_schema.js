'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPositionSchema extends Schema {
  up () {
    this.create('user_positions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('position_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_positions')
  }
}

module.exports = UserPositionSchema
