const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttResponse.badRequest('email')
    }
    if (!password) {
      return HttResponse.badRequest('password')
    }
    this.authUseCase.auth(email, password)
  }
}
