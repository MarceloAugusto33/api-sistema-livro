import 'dotenv/config'
import express from 'express';

export default class Server {
    private server = express();

    constructor() {
        this.server = express()
        this.configureServer()

        this.server.listen(process.env.PORT, () => {
            console.log("Server rodando na porta " + process.env.PORT)
        })
    }

    configureServer() {
        this.server.use(express.json({ limit: '1mb' }))
        this.server.use(express.urlencoded({ extended: true }))
    }
}