import { Router } from "express";
import { Request, Response } from "express";
import { User_routes } from "./user/routes";
import { Book_routes } from "./book/routes";

const routes = Router();

routes.use(User_routes)
routes.use(Book_routes)
routes.get("/", async (req:Request, res:Response)=>{
    res.render('index', {});
})


export {routes};