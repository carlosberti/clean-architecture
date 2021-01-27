import { UserData } from '@/entities'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('In memory user repository', () => {
  it('Should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('anymail.com')
    expect(user).toBeNull()
  })

  it('Should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  it('Should return all user in the repository', async () => {
    const users: UserData[] = [
      { name: 'any_name', email: 'any@mail.com' },
      { name: 'second_name', email: 'second@mail.com' }
    ]
    const sut = new InMemoryUserRepository(users)
    const returnedUsers = await sut.findAllUsers()
    expect(returnedUsers).toHaveLength(2)
  })
})
