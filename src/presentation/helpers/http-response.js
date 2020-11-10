const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unathorized-error')

module.exports = class HttResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok () {
    return {
      statusCode: 200
    }
  }
}
