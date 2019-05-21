'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const UserDatum = use('App/Models/UserDatum')
const Database = use('Database')
const logger = use('Logger')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ auth, request, response }) {
    const userQuery = User.query().with('data')
    let data 
    if (auth.user.role == "user")
      data =  await userQuery.with('positions.position').whereNot('role', 'admin').fetch()
    else
      data = await userQuery.with('positions.position').fetch()

    const results = this.reMapUserData(JSON.stringify(data)) 
    return results
    
    // const positions = data.positions.map(d => {
    //   const { id,name } = d
    //   return {id , name}
    // })
    // return {...data, positions}
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const reqPar = this.reqPar()
      const userBody = request.only(reqPar)
      const createUser = await User.create(userBody,trx)
  
      const userDataBody = {...request.except(reqPar), user_id: createUser.id}
      await UserDatum.create(userDataBody,trx)
      await trx.commit()
      
      return await User.query()
      .with('data')
      .with('position')
      .where({id: createUser.id})
      .first()
    } catch (e) {
      await trx.rollback()
      throw new Error(e.message)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const { id } = params
    return await User.query().where({id})
    .with('data').with('position').first()
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showMe ({ auth }) {
    const { id } = auth.user
    return await User.query().where({id})
    .with('data').with('position').first()
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { id } = params
      const reqPar = this.reqPar()
      const userBody = request.only(reqPar)
      const userDataBody = request.except(reqPar)
      await User.query().where({id}).update(userBody, trx)
      await this.createOrUpdate({ user_id: id },userDataBody,trx)

      await trx.commit()
      return await User.query()
      .with('data').with('position')
      .where({id})
      .first()
    }catch(e){
      await trx.rollback()
      throw new Error(e.message)
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { id } = params
      const user = await User.findOrFail(id)
      const userDatum = await UserDatum.findBy('user_id',id)
      await user.delete(trx)
      await userDatum.delete(trx)
      await trx.commit()
      return response.status(204).send()
    } catch (e) {
      await trx.rollback()
      throw new Error(e.message)
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/me
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async selfUpdate ({ auth, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { id } = auth.user
      const reqPar = this.reqPar()
      const userBody = request.only(reqPar)
      const userDataBody = request.except(reqPar)
      await User.query().where({id}).update(userBody, trx)
      await this.createOrUpdate({ user_id: id },userDataBody,trx)

      await trx.commit()
      return await User.query()
      .with('data').with('position')
      .where({id})
      .first()
    }catch(e){
      await trx.rollback()
      throw new Error(e.message)
    }
  }

  async createOrUpdate(whereClause,body,trx){
    const check = await UserDatum.query().where(whereClause).first()
    const createBody = {...body,...whereClause}
    if (check)
      await UserDatum.query().where(whereClause).update(body,trx)
    else
      await UserDatum.create(createBody, trx)

  }
  
  reMapUserData(data){
    const user = JSON.parse(data)
    return user.map(d => {
      const positions = d.positions.map( a => a.position)
      return {...d, positions}
    })
  }

  reqPar(){
    return ['fullname', 'username', 'email', 'password', 'role', 'position_id']
  }

}

module.exports = UserController
