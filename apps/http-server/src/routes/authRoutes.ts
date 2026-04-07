import { Router, Request, Response } from "express";
import { errorResponse } from "../utils/error";
import { prisma } from "@repo/db";

const router:Router = Router();


router.post("/signup", async(req:Request, res:Response) => {

    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return errorResponse(res, 400, "All fields are required!")
        }
         
        // logic to find already existed user
        const isUserExistsAlready = null;

        




    } catch (error) {
        
    }


});


router.post("/login", async(req:Request, res:Response) => {
    try {
        
    } catch (error) {
        
    }
})



export default router;
