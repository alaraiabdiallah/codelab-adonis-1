'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {
    static get hidden() {
      return ['province_id']
    }
    province(){
        return this.belongsTo('App/Models/Province')
    }
}

module.exports = City
