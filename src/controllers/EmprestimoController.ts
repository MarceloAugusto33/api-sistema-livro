import { Request, Response } from "express";
import { prisma } from "../database";

export default class EmprestimoController {
    async all(request: Request, response: Response) {
        try {
            const emprestimos = await prisma.emprestimo.findMany();
            return response.status(200).json(emprestimos)
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async create(request: Request, response: Response) {
        const { id_aluno, id_livro, data_emp, data_dev } = request.body;

        if (!id_aluno || !id_livro || !data_emp || !data_dev) return response.status(401).json({ message: "Digite todos os campos!" });

        try {
            const livro = await prisma.livro.findUnique({ where: { id: Number(id_livro) } })

            if (livro.quantidade === 0) return response.status(401).json({ message: "Não há quantia suficiente para o emprestimo!" })

            const emprestimo = await prisma.emprestimo.create({ data: { id_aluno, id_livro, data_emp: new Date(data_emp), data_dev: new Date(data_dev) } });

            const livroUpdated = await prisma.livro.update({ where: { id: Number(id_livro) }, data: { quantidade: livro.quantidade - 1 } });

            return response.status(201).json({ message: "Emprestimo feito com sucesso!", emprestimo })
        } catch (error) {
            return response.status(500).json({ message: error.message })
        }
    }

    async update(request: Request, response: Response) {
        const { data_dev } = request.body;
        const { id } = request.params;

        try {
            const emprestimoUpdated = await prisma.emprestimo.update({ where: { id: Number(id) }, data: { data_dev: new Date(data_dev) } })

            return response.status(200).json(emprestimoUpdated);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}