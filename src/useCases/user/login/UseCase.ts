import { IUserRepository } from '../../../repositories/interface/IUserRepository';
import { ResponseModel } from '../../../util/ResponseModel';
import { LoginUserDTO, LoginUserModel } from './Model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export class LoginUserUseCase{

    constructor(private repository:IUserRepository){}

    async execute(data:LoginUserModel){
        let emailCompareOk = false
        let passwordCompare = false
        let typeCheck:any = LoginUserDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        let response =  await this.repository.login(typeCheck.data);
        if(response.has_error) return response
        if(response.data.email === data.email) emailCompareOk = true
        passwordCompare = await bcrypt.compare(typeCheck.data.password, response.data.password)

        if(emailCompareOk == false) return new ResponseModel("E-mail ou senha  inválidos", true)
        if(passwordCompare == false) return new ResponseModel("E-mail ou senha inválidos", true) 
        let payload = {email: response.data.email, id:response.data.id} 
        let token =  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })   
        response.data.token = token
        return await response
    }
}