import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { AddUserUseCase } from "./UseCase";
import { AddUserController } from './Controller';




const repository = new UserRepository();
const addUserUC = new AddUserUseCase(repository);
const addUserController = new AddUserController(addUserUC);

export {addUserUC, addUserController}