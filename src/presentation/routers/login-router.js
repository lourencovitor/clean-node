const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttResponse.badRequest('email')
      }
      if (!password) {
        return HttResponse.badRequest('password')
      }
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttResponse.unauthorizedError()
      }
      return HttResponse.ok({ accessToken })
    } catch (error) {
      // console.error(error)
      return HttResponse.serverError()
    }
  }
}
