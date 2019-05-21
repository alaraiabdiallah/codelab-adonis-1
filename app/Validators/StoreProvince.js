'use strict'

class StoreProvince {
  get rules () {
    return {
      name: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide a name field.',
    }
  }
}

module.exports = StoreProvince
