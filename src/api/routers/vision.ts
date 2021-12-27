import { Router } from "express";
import Container from "typedi";
const visionRouter = Router();

export default (router: Router) => {
    router.use("/vision", visionRouter);

    router.get("", async (req, res, next) => {
        
        try {

        } catch (error) {
            
        }
    });
}
