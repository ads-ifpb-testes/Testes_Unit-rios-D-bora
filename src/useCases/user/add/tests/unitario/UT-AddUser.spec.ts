import { beforeAll, describe, expect, test } from 'vitest';
import { UserRepositoryMock } from './Mock/UserRepositoryMock';
import { AddUserUseCase } from '../../UseCase';


let userRegistrationUC;

beforeAll(() => {
    const userRepo = new UserRepositoryMock();
    userRegistrationUC = new AddUserUseCase(userRepo);
});

describe("Tentativas de registro de usuário com campos obrigatórios ausentes.", () => {
    test("Deve retornar um objeto de resposta com erro.", async () => {
        const userData = {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };
        const outcome = await userRegistrationUC.execute(userData);
        expect(outcome).toMatchObject({ has_error: true });
    });
});

test("Deve retornar erro se o campo 'nome' estiver vazio.", async () => {
    const userData = {
        name: '',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se o campo 'e-mail' estiver vazio.", async () => {
    const userData = {
        name: 'User Test',
        email: '',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se o campo 'telefone' estiver vazio.", async () => {
    const userData = {
        name: 'User Test',
        email: 'test@example.com',
        phoneNumber: '',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se o campo 'senha' estiver vazio.", async () => {
    const userData = {
        name: 'User Test',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: '',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se o campo 'confirmar senha' estiver vazio.", async () => {
    const userData = {
        name: 'User Test',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: ''
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se o e-mail já estiver cadastrado.", async () => {
    const existingUser = {
        name: 'Existing User',
        email: 'duplicate@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    await userRegistrationUC.execute(existingUser);

    const newUserData = {
        name: 'Another User',
        email: 'duplicate@example.com',
        phoneNumber: '987654321',
        password: 'password456',
        confirmPassword: 'password456'
    };
    const outcome = await userRegistrationUC.execute(newUserData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve retornar erro se as senhas não coincidirem.", async () => {
    const userData = {
        name: 'User Test',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'differentPassword'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});

test("Deve registrar um usuário com todos os dados válidos.", async () => {
    const userData = {
        name: 'Valid User',
        email: 'valid@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: false });
});

test("Deve retornar erro se o e-mail informado for inválido.", async () => {
    const userData = {
        name: 'User Test',
        email: 'invalid-email',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const outcome = await userRegistrationUC.execute(userData);
    expect(outcome).toMatchObject({ has_error: true });
});