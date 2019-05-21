'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Province extends Model {

    city(){
        return this.hasMany('App/Models/City')
    }
}

module.exports = Province
