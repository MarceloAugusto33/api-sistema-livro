import 'dotenv/config'
import express from 'express';
import { routes } from './routes';

export default class Server {
    private server = express();

    constructor() {
        this.server = express()
        this.configureServer()
        this.setRoutes()

        this.server.listen(process.env.PORT, () => {
            console.log("Server rodando na porta " + process.env.PORT)
        })
    }

    configureServer() {
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
    }

    setRoutes() {
        this.server.use(routes)
    }
}