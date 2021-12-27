import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "../config";
import routers from '../api/routers';
import { visitFunctionBody } from "typescript";

export default async (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
            maxAge: 3600 * 5,
            credentials: true,
        })
    );

    app.use(config.api.schema + config.api.prefix, routers());

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ message: "Invalid Request" });
    })
}