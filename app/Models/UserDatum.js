'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserDatum extends Model {

    static get table() {
      return 'user_datas'
    }

    user(){
      return this.belongsTo('App/Models/User')
    }
}

module.exports = UserDatum
