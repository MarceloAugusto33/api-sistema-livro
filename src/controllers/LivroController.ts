import { Request, Response } from "express";
import { prisma } from "../database";

export default class LivroController {
    async all(request: Request, response: Response) {
        try {
            const livros = await prisma.livro.findMany();
            return response.status(200).json(livros);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async index(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const livro = await prisma.livro.findFirst({ where: { id: Number(id) } })

            if (!livro) return response.status(403).json({ message: "Livro não encontrado!" })

            return response.status(200).json(livro)
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async create(request: Request, response: Response) {
        const { titulo, autor, ano_publi, quantidade } = request.body;

        if (!titulo || !autor || !ano_publi || !quantidade) return response.status(401).json({ message: "titulo, autor, ano_publi e quantidade são obrigatorios!" });

        try {
            const livro = await prisma.livro.create({
                data: {
                    titulo,
                    autor,
                    ano_publi,
                    quantidade
                }
            })

            return response.status(201).json({ message: "Livro cadastrado com sucesso!", livro });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async update(request: Request, response: Response) {
        const { titulo, autor, ano_publi, quantidade } = request.body;
        const { id } = request.params;

        try {
            const livro = await prisma.livro.update({
                where: {
                    id: Number(id)
                }, data: {
                    titulo,
                    autor,
                    ano_publi,
                    quantidade
                }
            });

            return response.status(200).json({ message: "Livro atualizado com sucesso!", livro })
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const livro = await prisma.livro.delete({ where: { id: Number(id) } })

            return response.status(200).json({ message: "Livro deletado com sucesso!", livro })
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}