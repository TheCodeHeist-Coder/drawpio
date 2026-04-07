import WebSocket, { WebSocketServer } from 'ws'


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async (ws: WebSocket) => {

    ws.on('message', (data) => {
        ws.send("pong")
    })
})