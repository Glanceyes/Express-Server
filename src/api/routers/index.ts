import { Router } from "express";
import userRouter from "./user";

export default() => {
    const router = Router();
    userRouter(router);

    return router;
}