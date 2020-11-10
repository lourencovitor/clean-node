const HttResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttResponse.badRequest(new MissingParamError('email'))
      }
      // if (!/email/.test(email)) {
      //   return HttResponse.badRequest('email')
      // }
      if (!password) {
        return HttResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
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
