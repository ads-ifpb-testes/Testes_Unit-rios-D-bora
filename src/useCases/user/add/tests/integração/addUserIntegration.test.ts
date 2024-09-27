import { describe, test, expect, afterAll } from 'vitest';
import request from "supertest";
import { app } from '../../../../../app';
import { prisma } from '../../../../../database';

describe("Testando o registro de um usuário", () => {

    test("Deve permitir o cadastro do usuário com dados válidos.", async () => {
        const validUserData = {
            name: 'Teste',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(validUserData);
        
        expect(response.status).toBe(200); 
        expect(response.body).toMatchObject({ has_error: false });
    });

    test("Deve retornar erro ao tentar registrar um e-mail já utilizado.", async () => {
        const duplicateUserData = {
            name: 'Teste Duplicado',
            email: 'teste@example.com',
            phoneNumber: '0987654321',
            password: 'senha456',
            confirmPassword: 'senha456'
        };

        const response = await request(app)
            .post("/user")
            .send(duplicateUserData);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve emitir erro se todos os campos obrigatórios forem enviados vazios.", async () => {
        const emptyFieldsData = {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };
        
        const response = await request(app)
            .post("/user")
            .send(emptyFieldsData);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'name' estiver em branco.", async () => {
        const nameEmptyData = {
            name: '',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(nameEmptyData);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao fornecer um e-mail inválido.", async () => {
        const invalidEmailData = {
            name: 'Teste',
            email: 'emailinvalido',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(invalidEmailData);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro quando as senhas não coincidirem.", async () => {
        const mismatchedPasswordsData = {
            name: 'Teste',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha321'
        };

        const response = await request(app)
            .post("/user")
            .send(mismatchedPasswordsData);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });
});

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'teste@example.com' } });
});
