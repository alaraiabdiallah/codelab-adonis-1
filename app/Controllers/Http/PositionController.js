'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Position = use('App/Models/Position')

/**
 * Resourceful controller for interacting with positions
 */
class PositionController {
  /**
   * Show a list of all positions.
   * GET positions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    return await Position.all()
  }


  /**
   * Create/save a new position.
   * POST positions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const body = request.all()
    return Position.create(body)
  }

  /**
   * Display a single position.
   * GET positions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const { id } = params
    return await Position.query().where({id}).first()
  }

  /**
   * Display a single position.
   * GET positions/:id/users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showUsers ({ params, request, response }) {
    const { id } = params
    return await Position.query().with('users').where({id}).first()
  }

  /**
   * Update position details.
   * PUT or PATCH positions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    await Position.findOrFail(id)
    const body = request.all()
    await Position.query()
      .where({ id }).update(body)

    return await Position.find(id)
  }

  /**
   * Delete a position with id.
   * DELETE positions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const find = await Position.findOrFail(params.id)

    await find.delete()
    return response.status(204).json([])
  }
}

module.exports = PositionController
