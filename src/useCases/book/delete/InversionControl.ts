import { BookRepository } from "../../../repositories/implementations/BookRepository";
import { RemoveBookController } from "./Controller";
import { RemoveBookUC } from "./UseCase";



const repository = new BookRepository();
const removeBookUC = new RemoveBookUC(repository);
const removeBookController = new RemoveBookController(removeBookUC);

export {removeBookUC, removeBookController}