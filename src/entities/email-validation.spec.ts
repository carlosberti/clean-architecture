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

  it('Should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should not accept empty domain part', () => {
    const email = 'local@'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('Should not accept domain with a part larger than 63 chars', () => {
    const email = 'local@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
