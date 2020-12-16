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

  it('Should not accept strings larger than 320 chars', () => {
    const email = 'a'.repeat(64) + '@' + 'c'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should not accept local part larger than 64 chars', () => {
    const email = 'a'.repeat(65) + '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'c'.repeat(129) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })
})
