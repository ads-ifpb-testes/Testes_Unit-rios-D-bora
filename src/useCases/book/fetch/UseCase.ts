
import { IBookRepository } from "../../../repositories/interface/IBookRepository";
import { ResponseModel } from "../../../util/ResponseModel";
import {  FetchBookDTO, FetchBookModel } from "./Model";


export class FetchBookUC{

    constructor(private repository:IBookRepository){}

    async execute(data:FetchBookModel){
        let typeCheck:any = FetchBookDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.fetch(typeCheck.data);
    }
}