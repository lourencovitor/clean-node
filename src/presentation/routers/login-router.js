const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
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
    return HttResponse.unauthorizedError()
  }
}
