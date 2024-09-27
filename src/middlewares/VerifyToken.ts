import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['token'];

    // Verifica se o token está presente
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    // Se o token estiver presente, chama o próximo middleware ou a rota
    next();
};