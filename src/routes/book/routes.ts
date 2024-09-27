import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../../middlewares/VerifyToken";
import { addBookController } from "../../useCases/book/add/InversionControl";
import { fetchBookController } from "../../useCases/book/fetch/InversionControl";
import { editBookController } from "../../useCases/book/edit/InversionControl";
import { removeBookController } from "../../useCases/book/delete/InversionControl";




const Book_routes = Router();


Book_routes.post("/book", authMiddleware, async (req:Request, res:Response)=>{
  return await addBookController.handle(req, res)
})
Book_routes.post("/book/list", authMiddleware, async (req:Request, res:Response)=>{
    return await fetchBookController.handle(req, res)
  })
  Book_routes.put("/book/", authMiddleware, async (req:Request, res:Response)=>{
    return await editBookController.handle(req, res)
  })

Book_routes.delete("/book/", authMiddleware, async (req:Request, res:Response)=>{
    return await removeBookController.handle(req, res)
  })

export {Book_routes};