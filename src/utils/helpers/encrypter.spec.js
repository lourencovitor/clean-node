const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Shold return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Shold return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Shold call bcrypt with correct values', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value', 'hashed_value')
  })
})
