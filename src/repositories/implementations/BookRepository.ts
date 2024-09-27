import { prisma } from '../../database';
import { AddBookModel } from '../../useCases/book/add/Model';
import { RemoveBookModel } from '../../useCases/book/delete/Model';
import { EditBookModel } from '../../useCases/book/edit/Model';
import { FetchBookModel } from '../../useCases/book/fetch/Model';

import { ResponseModel } from '../../util/ResponseModel';
import { IBookRepository } from '../interface/IBookRepository'


export class BookRepository implements IBookRepository {
    async edit(data: EditBookModel): Promise<ResponseModel> {
        try {
            await prisma.book.update({
                where:{
                    id:data.id
                }, data:{
                    title:data.title,
                    author:data.author,
                    genre:data.genre,
                    rating:data.rating,
                    review:data.review,
                }
            })
            return new ResponseModel("Livro Editado com sucesso.", false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao editar o livro", true)
        }
    }
    async delete(data: RemoveBookModel): Promise<ResponseModel> {
        try {
            await prisma.book.delete({where:{id:data.bookId}})
            return new ResponseModel("Livro removido", false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao remover o livro", true)
        }
    }
    async fetch(data: FetchBookModel): Promise<ResponseModel> {
        try {
            let res = await prisma.book.findMany({
                where:{
                    userId:data.idUsuario
                }
            })

            return new ResponseModel(res, false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao listar os livros", true)
        }
    }
    async add(data: AddBookModel): Promise<ResponseModel> {
        try {
            await prisma.book.create({
                data:{
                    author:data.autor,
                    title:data.titulo,
                    review:data.avaliacao,
                    rating:data.nota,
                    genre:data.genero,
                    userId:data.idUsuario
                }
            })
            return new ResponseModel("Livro cadastrado", false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao cadastrar o livro", true, error)
        }
    } 
}