import { Request, Response } from 'express'
import { prisma } from '../database'

export default class AlunoController {
    async all(request: Request, response: Response) {
        try {
            const alunos = await prisma.aluno.findMany();
            return response.status(200).json(alunos)
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async index(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } })

            if (!aluno) return response.status(403).json({ message: "Aluno não foi encontrado!" })

            return response.status(200).json(aluno)
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async create(request: Request, response: Response) {
        const { nome, matricula, email, curso } = request.body;

        if (!nome || !matricula || !email || !curso) return response.status(401).json({ message: "nome, matricula, email e curso são obrigratorios!" });

        try {
            const aluno = await prisma.aluno.create({
                data: {
                    nome,
                    matricula,
                    email,
                    curso
                }
            });

            return response.status(201).json({ message: "Aluno Cadastrado com sucesso!", aluno });
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async update(request: Request, response: Response) {
        const { nome, curso } = request.body;
        const { id } = request.params;

        try {
            const aluno = await prisma.aluno.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    curso
                }
            });

            return response.status(200).json({ message: "Aluno atualizado com sucesso!", aluno })
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }

    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const alunoExists = await prisma.aluno.findFirst({ where: { id: Number(id) } });

            if (!alunoExists) return response.status(401).json({ message: "Aluno não encontrado!" })

            const aluno = await prisma.aluno.delete({ where: { id: Number(id) } });

            return response.status(200).json({ message: "Aluno deletado com sucesso!", aluno });
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }
}