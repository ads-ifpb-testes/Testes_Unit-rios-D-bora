
import { ResponseModel } from '../../../util/ResponseModel';
import { RemoveBookDTO, RemoveBookModel } from './Model';
import { IBookRepository } from '../../../repositories/interface/IBookRepository';

export class RemoveBookUC{

    constructor(private repository:IBookRepository){}

    async execute(data:RemoveBookModel){
        let typeCheck:any = RemoveBookDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.delete(typeCheck.data);
    }
}