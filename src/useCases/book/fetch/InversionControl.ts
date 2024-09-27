import { BookRepository } from "../../../repositories/implementations/BookRepository";
import { FetchBookController } from "./Controller";
import { FetchBookUC } from "./UseCase";



const repository = new BookRepository();
const fetchBookUC = new FetchBookUC(repository);
const fetchBookController = new FetchBookController(fetchBookUC);

export {fetchBookUC, fetchBookController}