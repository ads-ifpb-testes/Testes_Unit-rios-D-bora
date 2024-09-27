
import { IUserRepository } from '../../../repositories/interface/IUserRepository';
import { ResponseModel } from '../../../util/ResponseModel';
import { AddUserDTO, AddUserModel } from './Model';
import bcrypt from 'bcrypt'
export class AddUserUseCase{

    constructor(private repository:IUserRepository){}

    async execute(data:AddUserModel){
        let typeCheck:any = AddUserDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        typeCheck.data.password = await bcrypt.hash(typeCheck.data.password, 12)
        return await this.repository.add(typeCheck.data);
    }
}