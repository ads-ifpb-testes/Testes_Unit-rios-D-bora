import { prisma } from "../../database";
import { AddUserModel } from "../../useCases/user/add/Model";
import { LoginUserModel } from "../../useCases/user/login/Model";
import { ResponseModel } from "../../util/ResponseModel";
import { IUserRepository } from "../interface/IUserRepository";


export class UserRepository implements IUserRepository {
    async login(data: LoginUserModel): Promise<ResponseModel> {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });
            if (!result) {
                return new ResponseModel("E-mail ou senha inválidos", true);
            }
    
            return new ResponseModel(result, false);
    
        } catch (error) {
            return new ResponseModel("Erro ao fazer login", true);
        }
    }
    async add(data:AddUserModel): Promise<ResponseModel> {
        try {
            await prisma.user.create({
                data:{
                    name:data.name,
                    phone:data.phoneNumber,
                    email:data.email,
                    password:data.password
                }
            })

            return await new ResponseModel("Usuário cadastrado!", false);
        } catch (error) {
            return await new ResponseModel("Houve um erro ao cadastrar o usuário", true);
        }
    }
    
}