import { AddUserModel } from "../../useCases/user/add/Model"
import { LoginUserModel } from "../../useCases/user/login/Model"
import { ResponseModel } from "../../util/ResponseModel"


export interface IUserRepository {

    add(data:AddUserModel):Promise<ResponseModel>
    login(data:LoginUserModel):Promise<ResponseModel>
}