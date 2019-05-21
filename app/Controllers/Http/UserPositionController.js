'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserPosition = use('App/Models/UserPosition')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with userpositions
 */
class UserPositionController {
  
  async index ({ params ,request, response }) {
    const { user_id } = params
    return await UserPosition.query()
          .where({ user_id }).with('position')
          .fetch()
  }

  async store ({ params, request, response }) {
    const validation = await this.validation(request);
    const body = this.postBody(request, params)
    return UserPosition.create(body)
  }

  async update ({ params, request, response }) {
    const { id } = params
    await UserPosition.findOrFail(id)
    const body = this.postBody(request, params)
    await UserPosition.query()
      .where({ id }).update(body)

    return await UserPosition.find(id)
  }

  async destroy ({ params, request, response }) {
    const find = await UserPosition.findOrFail(params.id)

    await find.delete()
    return response.status(204).json([])
  }
  
  async validation(request) {
    return validate(request.all(), this.rules());
  }

  postBody(request,{ user_id }){
    return { ...request.all(), user_id }
  }

  rules() {
    return {
      position_id: 'required',
      user_id: 'required'
    }
  }
}

module.exports = UserPositionController
