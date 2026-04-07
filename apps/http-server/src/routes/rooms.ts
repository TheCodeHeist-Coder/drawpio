import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorResponse } from "../utils/error";
import { prisma } from "@repo/db";


const router: Router = Router();



router.post("/room", authMiddleware, async (req: Request, res: Response) => {
    try {

        const { slug } = req.body;
        if (!slug) return errorResponse(res, 400, 'All fields are required.');

        const userId = req.userId;

        const room = await prisma.room.create({
            data: {
                slug,
                adminId: userId
            }
        })

        return res.status(201).json({
            success: true,
            room: {
                roomName: room.slug,
                adminId: room.adminId
            }
        })

    } catch (error) {
        console.log('Errro while creating room', error)
    }
});



router.get("/chat/:roomId", async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId);

        const messages = await prisma.chat.findMany({
            where: { roomId: roomId },
            orderBy: { id: 'desc' },
            take: 50
        })

        return res.status(200).json({
            success: true,
            messages
        })

    } catch (error) {
        console.log('Error while fetching messages', error)
    }
})










export default router;