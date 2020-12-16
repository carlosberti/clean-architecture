import { Email } from './email'

describe('Email validation', () => {
  it('Should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should accept valid email', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })
})
