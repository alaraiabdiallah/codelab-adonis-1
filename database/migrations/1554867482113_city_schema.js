'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table.integer('province_id').unsigned().notNullable()
      table.string('name')
      table.string('lat').nullable()
      table.string('long').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }
}

module.exports = CitySchema
