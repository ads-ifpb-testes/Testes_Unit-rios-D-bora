import { Request, Response } from "express";
import { FetchBookUC } from "./UseCase";


export class FetchBookController{

    constructor(private useCase:FetchBookUC){}

    async handle(request:Request, response:Response){
        const result = await this.useCase.execute(request.body);
        if(result.has_error) return response.status(400).json(result);
        return response.status(200).json(result);
    }
}