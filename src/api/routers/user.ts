import { Router } from "express";
import { doTryCatch } from "../../helper/utils/doTryCatch";
import { 
    createUser,
    login,
    updateUserProfile
} from "../controllers/userController";
import { 
    createUserValidation, loginValidation, updateUserValidation
} from "../../helper/middlewares/validations/userValidation";
import { isAuthorized } from "../../helper/middlewares/authorization";

const userRouter = Router();

export default (router: Router) => {
    router.use("/user", userRouter);
    
    userRouter.post("/signup", 
        doTryCatch(createUserValidation), 
        doTryCatch(createUser)
    );
    userRouter.post("/login", 
        doTryCatch(loginValidation), 
        doTryCatch(login)
    );
    userRouter.post("/profile", 
        doTryCatch(isAuthorized), 
        doTryCatch(updateUserValidation), 
        doTryCatch(updateUserProfile)
    );
}