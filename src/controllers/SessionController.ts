import { Request, Response } from "express";
import { prisma } from "../database";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwtConfig from '../config/auth';

export default class SessionController {
    async create(request: Request, response: Response) {
        const { email, password } = request.body;

        if (!email || !password) return response.status(401).json({ message: "Email e/ou senha estão ausentes!" });

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return response.status(401).json({ message: "Email e/ou senha invalidos!" });
            }

            const passwordMatched = await compare(password, user.password);

            if (!passwordMatched) {
                return response.status(401).json({ message: "Email e/ou senha invalidos!" });
            }

            const { secret, expiresIn } = jwtConfig.jwt;

            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })

            return response.status(201).json({ user, token })
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }
}