import { BookRepository } from "../../../repositories/implementations/BookRepository";
import { AddBookController } from "./Controller";
import { AddBookUC } from "./UseCase";


const repository = new BookRepository();
const addBookUC = new AddBookUC(repository);
const addBookController = new AddBookController(addBookUC);

export {addBookUC, addBookController}