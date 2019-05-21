'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Province = use('App/Models/Province')

class CheckProvinceById{
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ params, response }, next) {
    const { province_id } = params
    const find = await Province.findOrFail(province_id)
    await next()
  }
}

module.exports = CheckProvinceById
