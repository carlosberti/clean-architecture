import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user web controller', () => {
  it('Should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  it('Should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  it('Should return status code 400 when request contains invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'invalid_mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  it('Should return status code 400 when request is missing user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        email: 'invalid_mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: name'
    )
  })

  it('Should return status code 400 when request is missing user email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any name'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: email'
    )
  })

  it('Should return status code 400 when request is missing user name and email', async () => {
    const requestWithInvalidNameAndEmail: HttpRequest = {
      body: {}
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidNameAndEmail
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: name email'
    )
  })
})
