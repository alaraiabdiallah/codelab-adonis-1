'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Position extends Model {

    users(){
        return this.belongsToMany('App/Models/UserPosition','id','position_id')
    }
}

module.exports = Position
