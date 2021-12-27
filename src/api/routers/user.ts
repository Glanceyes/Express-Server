import { Router } from "express";
import { doTryCatch } from "../../helper/utils/doTryCatch";
import { 
    createUser,
    login
} from "../controllers/userController";
import { 
    createUserValidation, loginValidation
} from "../../helper/middlewares/validations/userValidation";

const userRouter = Router();

export default (router: Router) => {
    router.use("/user", userRouter);
    
    userRouter.post("/signup", doTryCatch(createUserValidation), doTryCatch(createUser));
    userRouter.post("/login", doTryCatch(loginValidation), doTryCatch(login));
}