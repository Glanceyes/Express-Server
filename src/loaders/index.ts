import { Express } from "express";
import expressLoader from "./express";
import databaseConnection from "./connect";

export default async (app: Express) => {
    await expressLoader(app);

    await databaseConnection();
}