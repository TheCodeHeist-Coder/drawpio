import { configDotenv } from 'dotenv';
configDotenv();

import WebSocket, { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken'

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', async (ws: WebSocket, request) => {


    // extracting token from the url
    const url = request.url;
    if (!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (!decoded || !(decoded as JwtPayload).userId) {
        ws.close();
        return;
    }

    ws.on('message', (data) => {
        ws.send("pong")
    });
})