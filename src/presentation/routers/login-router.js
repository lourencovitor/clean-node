const HttResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
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
  }
}
