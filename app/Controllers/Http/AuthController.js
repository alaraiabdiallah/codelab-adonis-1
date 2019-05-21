'use strict'

const MyController = use('App/Controllers/Http/MyController')
const { validate } = use('Validator')
const User = use('App/Models/User')

class AuthController extends MyController {

    async login({ request, response, auth }){
        const { email, password } = request.all()
        await this.validation(request, 'login')
        const token = await auth.attempt(email, password)

        return token
    }

    async register({ request, response }){
      await this.validation(request, 'login')
      const params = request.only(['username','email','password'])
      return await User.create(params)

    }

    async validation(request,type) {
      return validate(request.all(), this.rules(type));
    }

    rules(type) {
      const login = {
        email: 'required',
        password: 'required'
      }
      const register = { ...login, username: 'required' }
      const rules = {
        login,
        register
      }
      return rules[type]
    }
}

module.exports = AuthController
