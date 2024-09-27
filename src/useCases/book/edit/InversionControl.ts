import { BookRepository } from "../../../repositories/implementations/BookRepository";
import { EditBookController } from "./Controller";
import { EditBookUC } from "./UseCase";



const repository = new BookRepository();
const editBookUC = new EditBookUC(repository);
const editBookController = new EditBookController(editBookUC);

export {editBookUC, editBookController}