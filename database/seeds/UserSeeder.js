'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    const searchAdmin = await User.query().where({role: 'admin'}).getCount()
    if (searchAdmin == 0) {
      await User.create({
        fullname: 'admin',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin',
        role: 'admin'
      })
    }
  }
}

module.exports = UserSeeder
