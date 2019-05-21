'use strict'

class StoreUser {
  get rules () {
    return {
      fullname: "required",
      username: "required",
      email: "required|email",
      password: "required",
      role: "required",
    }
  }
}

module.exports = StoreUser
