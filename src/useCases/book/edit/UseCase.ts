
import { IBookRepository } from "../../../repositories/interface/IBookRepository";
import { ResponseModel } from "../../../util/ResponseModel";
import { EditBookDTO, EditBookModel } from "./Model";


export class EditBookUC{

    constructor(private repository:IBookRepository){}

    async execute(data:EditBookModel){
        let typeCheck:any = EditBookDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.edit(typeCheck.data);
    }
}