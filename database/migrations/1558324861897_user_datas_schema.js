'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDatasSchema extends Schema {
  up () {
    this.create('user_datas', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.enu('gender',['L','P'])
      table.string('religion')
      table.string('place_of_birth')
      table.enu('marital',['married','single'])
      table.date('date_of_birth')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_datas')
  }
}

module.exports = UserDatasSchema
