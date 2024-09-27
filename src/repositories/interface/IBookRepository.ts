import { AddBookModel } from "../../useCases/book/add/Model";
import { RemoveBookModel } from "../../useCases/book/delete/Model";
import { EditBookModel } from "../../useCases/book/edit/Model";
import { FetchBookModel } from "../../useCases/book/fetch/Model";
import { ResponseModel } from "../../util/ResponseModel";

export interface IBookRepository {

    add(data:AddBookModel):Promise<ResponseModel>
    fetch(data:FetchBookModel):Promise<ResponseModel>
    edit(data:EditBookModel):Promise<ResponseModel>
    delete(data:RemoveBookModel):Promise<ResponseModel>
}