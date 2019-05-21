'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const City = use('App/Models/City')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with cities
 */
class CityController{
  /**
   * Show a list of all cities.
   * GET cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ params ,request, response }) {
    const { province_id } = params
    return await City.query()
          .where({ province_id }).with('province').fetch()
  }

  /**
   * Create/save a new city.
   * POST cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const validation = await this.validation(request);
    const body = this.postBody(request, params)
    return City.create(body)
  }

  /**
   * Display a single city.
   * GET cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const { id }= params
    await City.findOrFail(id)
    return await City.query()
              .with('province').where({ id }).first()
    
  }

  /**
   * Update city details.
   * PUT or PATCH cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    await City.findOrFail(id)
    const body = this.postBody(request, params)
    await City.query()
      .where({ id }).update(body)

    return await City.find(id)
  }

  /**
   * Delete a city with id.
   * DELETE cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const find = await City.findOrFail(params.id)

    await find.delete()
    return response.status(204).json([])
  }
  
  async validation(request) {
    return validate(request.all(), this.rules());
  }

  postBody(request,{ province_id }){
    return { ...request.all(), province_id }
  }

  rules() {
    return {
      name: 'required',
      province_id: 'required'
    }
  }

}

module.exports = CityController
