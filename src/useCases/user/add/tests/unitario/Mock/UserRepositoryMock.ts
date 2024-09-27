import { IUserRepository } from "../../../../../../repositories/interface/IUserRepository";
import { ResponseModel } from "../../../../../../util/ResponseModel";
import { LoginUserModel } from "../../../../login/Model";
import { AddUserModel } from "../../../Model";

export class UserRepositoryMock implements IUserRepository {
    
    users: AddUserModel[] = [];
    
    async login(data: LoginUserModel): Promise<ResponseModel> {
        throw new Error("Method not implemented.");
    }
    
    async add(data: AddUserModel): Promise<ResponseModel> {
        try {
            const requiredFields = ['name', 'phoneNumber', 'email', 'password'];
            for (const field of requiredFields) {
                if (!data[field]) {
                    return new ResponseModel(`O campo ${field} é obrigatório.`, true);
                }
            }
        
            const emailExists = this.users.some(user => user.email === data.email);
            if (emailExists) {
                return new ResponseModel("Esse email já está cadastrado.", true);
            }
        
            this.users.push(data);
            return new ResponseModel("Usuário cadastrado com sucesso!", false);
        } catch (error) {
            return new ResponseModel("Houve um erro ao cadastrar o usuário.", true);
        }
    }
}