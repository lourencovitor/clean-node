class TokenGenerator {
  async generate (id) {
    return null
  }
}

describe('Email Validator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
})