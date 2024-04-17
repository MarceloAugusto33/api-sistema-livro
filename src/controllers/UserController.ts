import { Request, Response } from "express";
import { prisma } from "../database";
import { hash } from 'bcryptjs';

interface userId extends Request {
    user?: Request & { id: number }
}


export default class UserController {
    async index(request: userId, response: Response) {
        const { id } = request.user;

        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });

            if (!user) return response.status(403).json({ message: "Usuario não encontrado!" })
            return response.status(200).json(user)
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async create(request: Request, response: Response) {
        const { email, password } = request.body;
        if (!email || !password) return response.status(401).json({ message: "Email e/ou Senha não está presente!" });

        try {
            const userExists = await prisma.user.findUnique({ where: { email } });

            if (userExists) return response.status(401).json({ message: "Email já em uso!" });

            const hashedPassword = await hash(password, 8);

            const user = await prisma.user.create({ data: { email, password: hashedPassword } });

            return response.status(201).json({ message: "Usuario criado com sucesso!", user });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}