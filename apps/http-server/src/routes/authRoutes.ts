import { Router, Request, Response } from "express";
import { errorResponse } from "../utils/error";
import { prisma } from "@repo/db";
import { JWT_SECRET } from "@repo/common";
import bcrypt from 'bcrypt';

const router:Router = Router();


router.post("/signup", async(req:Request, res:Response) => {

    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return errorResponse(res, 400, "All fields are required!")
        }
         
        // logic to find already existed user
        const isUserExistsAlready = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(isUserExistsAlready) return errorResponse(res, 400, "Email already exists.Try another email")

        const hashedPassword = await bcrypt.hash(password, 10);

         const user = await prisma.user.create({
            data : {
                username,
                email,
                password: hashedPassword
            }
         });

         // token login -> put it in common
         
         return res.status(201).json({
            user: {
                userId: user.id,
                username: user.username,
                email: user.email
            }
         })





    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal Server Error..")
    }


});


router.post("/login", async(req:Request, res:Response) => {
    try {
        
    } catch (error) {
        
    }
})



export default router;
