const HttResponse = require('../helpers/http-response')
const InvalidParamError = require('../helpers/invalid-param-error')
const MissingParamError = require('../helpers/missing-param-error')
module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttResponse.unauthorizedError()
      }
      return HttResponse.ok({ accessToken })
    } catch (error) {
      console.error(error)
      return HttResponse.serverError()
    }
  }
}
