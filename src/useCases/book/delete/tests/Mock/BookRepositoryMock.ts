import { IBookRepository } from "../../../../../repositories/interface/IBookRepository";
import { ResponseModel } from "../../../../../util/ResponseModel";
import { AddBookModel } from "../../../add/Model";
import { RemoveBookModel } from "../../../delete/Model";
import { EditBookModel } from "../../../edit/Model";
import { FetchBookModel } from "../../../fetch/Model";
import { v4 as uuidv4 } from 'uuid';

export type Book = AddBookModel & { id: string };
export class BookRepositoryMock implements IBookRepository {

    
    edit(data: EditBookModel): Promise<ResponseModel> {
        throw new Error("Method not implemented.");
    }
    books: Book[] = [];

    async fetch(data: FetchBookModel): Promise<ResponseModel> {
        // Implementar a lógica de fetch, se necessário
        throw new Error("Método não implementado.");
    }

    async delete(data: RemoveBookModel): Promise<ResponseModel> {
        const index = this.books.findIndex(book => book.id === data.bookId);
        if (index === -1) {
            return new ResponseModel("Livro não encontrado.", true);
        }
        this.books.splice(index, 1);
        return new ResponseModel("Livro removido com sucesso!", false);
    }

    async add(data: AddBookModel): Promise<ResponseModel> {
        const requiredFields = ['titulo', 'idUsuario', 'autor', 'genero', 'nota', 'avaliacao'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return new ResponseModel(`O campo ${field} deve ser preenchido.`, true);
            }
        }
    
        const bookWithId: Book = {
            ...data,
            id: uuidv4(), // Adiciona um ID único
        };
    
        this.books.push(bookWithId);
        return new ResponseModel("Livro cadastrado com sucesso!", false);
    }
}
