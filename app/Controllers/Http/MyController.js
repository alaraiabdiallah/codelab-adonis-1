

'use strict'


class MyController {

    handleOnValidationError(validation, response) {
        const errorMessage = this.errorValidationMessages(validation)
        return response.status(400).json(errorMessage)
    }

    handleOnDataNotFoundError(response) {
        const errorMessage = this.errorOnDataNotFound()
        return response.status(404).json(errorMessage)
    }

    errorValidationMessages(validation) {
        return {
            type: 'Validation Error',
            messages: validation.messages()
        }
    }

    errorOnDataNotFound() {
        return {
            type: 'Not Found',
            messages: 'Data your request not found'
        }
    }

}

module.exports = MyController
