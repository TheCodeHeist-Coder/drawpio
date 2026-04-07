import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from 'jsonwebtoken'
import { errorResponse } from "../utils/error";
import { JWT_SECRET } from "@repo/common";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers["authorization"];

        if (!authHeader) return errorResponse(res, 401, "You're not authorized")

        const token = authHeader.split(' ')[1];

        if (!token) return errorResponse(res, 401, "Not authorized...")

        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded) {
            req.userId = (decoded as JwtPayload).id;
            next();

        } else {
            return errorResponse(res, 400, 'You are not authorized...')
        }

    } catch (err) {
        console.log("Error while authentication", err)
        return errorResponse(res, 500, 'Internal Server Error');
    }
}