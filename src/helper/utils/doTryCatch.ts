import { Request, Response, NextFunction } from "express";

export const doTryCatch = function (controller){
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        }
        catch(error) {
            console.error(error);
            const { name, statusCode, message, isOperational, stack } = error;
            res.status(400).send({ name, statusCode, message, isOperational });
        }
    }
}