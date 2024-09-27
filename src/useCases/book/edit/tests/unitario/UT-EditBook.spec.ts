import { beforeAll, expect, describe, test } from "vitest";
import { EditBookUC } from "../../UseCase";
import { Book, BookRepositoryMock } from "../Mock/BookRepositoryMock";
import { EditBookModel } from "../../Model";

let editBookUC: EditBookUC;
let BookSavedPreviously: Book;
let bookRepo: BookRepositoryMock;

beforeAll(() => {
    bookRepo = new BookRepositoryMock();
    const addData = {
        titulo: 'Livro Original',
        idUsuario: 'usuario123',
        autor: 'Autor Original',
        genero: 'Ficção',
        nota: 4,
        avaliacao: 'Muito bom!'
    };
    bookRepo.add(addData);
    BookSavedPreviously = bookRepo.books[0];
    editBookUC = new EditBookUC(bookRepo);
});

describe("Testes de edição de livro", () => {
    test("Deve editar um livro existente com todos os campos válidos.", async () => {
        const editData: EditBookModel = {
            id: BookSavedPreviously.id,
            title: 'Livro Editado',
            author: 'Autor Editado',
            genre: 'Não-Ficção',
            rating: 5,
            review: 'Excelente!',
        };
        const outcome = await editBookUC.execute(editData);
        expect(outcome).toMatchObject({ has_error: false });

        const updatedBook = bookRepo.books[0];
        expect(updatedBook.titulo).toBe('Livro Editado');
        expect(updatedBook.autor).toBe('Autor Editado');
        expect(updatedBook.genero).toBe('Não-Ficção');
        expect(updatedBook.nota).toBe(5);
        expect(updatedBook.avaliacao).toBe('Excelente!');
    });

    test("Deve retornar erro ao tentar editar um livro que não existe.", async () => {
        const editData: EditBookModel = {
            id: 'livro-inexistente',
            title: 'Novo Título',
            author: 'Novo Autor',
            genre: 'Novo Gênero',
            rating: 3,
            review: 'Avaliação nova',
        };
        const outcome = await editBookUC.execute(editData);
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'rating' for inválido (por exemplo, menor que 0).", async () => {
        const editData: EditBookModel = {
            id: BookSavedPreviously.id,
            title: 'Título Válido',
            author: 'Autor Válido',
            genre: 'Gênero Válido',
            rating: -1, 
            review: 'Avaliação válida',
        };
        const outcome = await editBookUC.execute(editData);
        expect(outcome).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro se o campo 'title' for vazio.", async () => {
        const editData: EditBookModel = {
            id: BookSavedPreviously.id,
            title: '', // Título vazio
            author: 'Autor Válido',
            genre: 'Gênero Válido',
            rating: 4,
            review: 'Avaliação válida',
        };
        const outcome = await editBookUC.execute(editData);
        expect(outcome).toMatchObject({ has_error: true });
    });
});
