'use strict'

/*
|--------------------------------------------------------------------------
| PositionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Position = use('App/Models/Position')


class PositionSeeder {
  async run () {
    const data = [
      {name: 'Manager'},
      {name: 'Developer'}
    ]
    if (await Position.getCount() == 0)
      await Position.createMany(data)
  }
}

module.exports = PositionSeeder
