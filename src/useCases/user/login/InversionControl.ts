import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { LoginUserUseCase } from "./UseCase";
import { LoginUserController } from './Controller';




const repository = new UserRepository();
const loginUserUC = new LoginUserUseCase(repository);
const loginUserController = new LoginUserController(loginUserUC);

export {loginUserUC, loginUserController}