'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserPosition extends Model {

    static get table() {
      return 'user_positions'
    }
    
    position(){
        return this.belongsTo('App/Models/Position')
    }

    user(){
        return this.belongsTo('App/Models/User')
    }

}

module.exports = UserPosition
