'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRoleToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.enu('role',['admin','user'])
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddRoleToUserSchema
