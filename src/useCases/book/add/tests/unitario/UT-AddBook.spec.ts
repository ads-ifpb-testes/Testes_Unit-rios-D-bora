import { beforeAll, expect, describe, test } from "vitest";
import { AddBookUC } from "../../UseCase";
import { BookRepositoryMock } from "../Mock/BookRepositoryMock";
import { AddBookModel } from "../../Model";

let addBookUC;

beforeAll(() => {
    const bookRepo = new BookRepositoryMock();
    addBookUC = new AddBookUC(bookRepo);
});

describe("Testes de cadastro de livro", () => {
    test("Deve cadastrar um livro com todos os campos válidos.", async () => {
        const data: AddBookModel = {
            titulo: 'Livro Exemplo',
            idUsuario: 'usuario123',
            autor: 'Autor Exemplo',
            genero: 'Ficção',
            nota: 4,
            avaliacao: 'Muito bom!'
        };
        const outcome = await addBookUC.execute(data);
        expect(outcome).toMatchObject({ has_error: false });
    });

    test("Deve retornar erro se o campo 'titulo' estiver vazio.", async () => {
        const data: AddBookModel = {
            titulo: '',
            idUsuario: 'usuario123',
            autor: 'Autor Exemplo',
            genero: 'Ficção',
            nota: 4,
            avaliacao: 'Muito bom!'
        };
        const outcome = await addBookUC.execute(data);
        
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'autor' estiver vazio.", async () => {
        const data: AddBookModel = {
            titulo: 'Livro Exemplo',
            idUsuario: 'usuario123',
            autor: '',
            genero: 'Ficção',
            nota: 4,
            avaliacao: 'Muito bom!'
        };
        const outcome = await addBookUC.execute(data);
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'genero' estiver vazio.", async () => {
        const data: AddBookModel = {
            titulo: 'Livro Exemplo',
            idUsuario: 'usuario123',
            autor: 'Autor Exemplo',
            genero: '',
            nota: 4,
            avaliacao: 'Muito bom!'
        };
        const outcome = await addBookUC.execute(data);
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se a 'nota' estiver fora do intervalo permitido.", async () => {
        const data: AddBookModel = {
            titulo: 'Livro Exemplo',
            idUsuario: 'usuario123',
            autor: 'Autor Exemplo',
            genero: 'Ficção',
            nota: 6, // Nota inválida
            avaliacao: 'Muito bom!'
        };
        const outcome = await addBookUC.execute(data);
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'avaliacao' estiver vazio.", async () => {
        const data: AddBookModel = {
            titulo: 'Livro Exemplo',
            idUsuario: 'usuario123',
            autor: 'Autor Exemplo',
            genero: 'Ficção',
            nota: 4,
            avaliacao: ''
        };
        const outcome = await addBookUC.execute(data);
        expect(outcome).toMatchObject({ has_error: true });
    });
});