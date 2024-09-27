import { Router } from "express";
import { Request, Response } from "express";
import { addUserController } from "../../useCases/user/add/InversionControl";
import { loginUserController } from "../../useCases/user/login/InversionControl";

const User_routes = Router();

User_routes.post("/user", async (req:Request, res:Response)=>{
    return await addUserController.handle(req, res)
})
User_routes.post("/user/login", async (req:Request, res:Response)=>{
    return await loginUserController.handle(req, res)
})
User_routes.get("/inicio", async (req:Request, res:Response)=>{
    const token = req.query.token;
    if (token) {
        res.render('home')
    } else {
        res.status(400).send('Acesso negado.');
    }
})

export {User_routes}