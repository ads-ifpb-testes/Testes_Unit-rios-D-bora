
import { ResponseModel } from '../../../util/ResponseModel';
import { AddBookDTO, AddBookModel } from './Model';
import { IBookRepository } from '../../../repositories/interface/IBookRepository';

export class AddBookUC{

    constructor(private repository:IBookRepository){}

    async execute(data:AddBookModel){
        let typeCheck:any = AddBookDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.add(typeCheck.data);
    }
}