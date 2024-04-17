import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import authConfig from '../config/auth';

interface RequestWithUser extends Request {
    user?: JwtPayload & { id: number };
}

export default function ensureAuthenticated(request: RequestWithUser, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token não informado!" })
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret) as JwtPayload & { id: number };

        request.user = {
            id: Number(user_id)
        };

        return next()
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}