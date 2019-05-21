'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const logger = use('Logger')

class AdminRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth,response }, next) {
    if(auth.user.role != "admin")
      return response.status(400).send({message: "You need to be admin role for this action"})
    await next()
  }
}

module.exports = AdminRole
