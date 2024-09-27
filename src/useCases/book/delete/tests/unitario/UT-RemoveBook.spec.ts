import { beforeAll, expect, describe, test } from "vitest";
import { RemoveBookUC } from "../../UseCase"; // Importa a classe RemoveBookUC
import { Book, BookRepositoryMock } from "../Mock/BookRepositoryMock";
import { RemoveBookModel } from "../../Model";

let removeBookUC;
let BookToRemove:Book
beforeAll(async () => {
    const bookRepo = new BookRepositoryMock();
    const bookData = {
        titulo: 'Livro Para Remover',
        idUsuario: 'usuario123',
        autor: 'Autor Exemplo',
        genero: 'Ficção',
        nota: 4,
        avaliacao: 'Muito bom!'
    };
    await bookRepo.add(bookData)
    BookToRemove = bookRepo.books[0]
    removeBookUC = new RemoveBookUC(bookRepo);
});

describe("Testes de remoção de livro", () => {
    test("Deve remover um livro existente com sucesso.", async () => {
        let income:RemoveBookModel = {
            bookId: BookToRemove.id
        }
        const outcome = await removeBookUC.execute(income);
        expect(outcome).toMatchObject({ has_error: false });
    });

    test("Deve retornar erro se tentar remover um livro que não existe.", async () => {
        const removeData: RemoveBookModel = {
            bookId: '999', // ID que não existe
        };

        const outcome = await removeBookUC.execute(removeData);
        expect(outcome).toMatchObject({ has_error: true});
    });

    test("Deve retornar erro se o ID do livro estiver vazio.", async () => {
        const removeData: RemoveBookModel = {
            bookId: '', // ID vazio
        };

        const outcome = await removeBookUC.execute(removeData);
        expect(outcome).toMatchObject({ has_error: true});
    });
});
