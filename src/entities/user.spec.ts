import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('User domain class', () => {
  it('Should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })

    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it('Should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'any@gmail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  it('Should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@gmail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  it('should create user with valid data', () => {
    const validName = 'any_name'
    const validEmail = 'any@mail.com'
    const user: User = User.create({ name: validName, email: validEmail })
      .value as User

    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
