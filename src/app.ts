import "reflect-metadata";
import express from "express";
import loaders from "./loaders";
import { PersistedEntityNotFoundError } from "typeorm";

const server = async () => {
    const app = express();
    const port = process.env.PORT || 3306;
    const host = process.env.HOST || "localhost";

    await loaders(app);

    app.listen(port, () => {
        console.log(`server start on [ http://${host}:${port} ]`);
    })
}

server();
export default server;