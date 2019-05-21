'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Province = use('App/Models/Province')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with provinces
 */
class ProvinceController{


  /**
   * Show a list of all provinces.
   * GET provinces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    return await Province.all()
  }

  /**
   * Create/save a new province.
   * POST provinces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    return Province.create(request.all())
  }

  /**
   * Display a single province.
   * GET provinces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    return await Province.findOrFail(params.id)
  }

  /**
   * Update province details.
   * PUT or PATCH provinces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    await Province.findOrFail(id)
    const update = await Province.query()
      .where({ id }).update(request.all())

    return await Province.find(id)
  }

  /**
   * Delete a province with id.
   * DELETE provinces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const find = await Province.findOrFail(params.id)
    await find.delete()
    return response.status(204).json([])
  }

  
}

module.exports = ProvinceController
