import WebSocket, { WebSocketServer } from 'ws';
import { checkUser } from './utils/userChecker.js';

const wss = new WebSocketServer({ port: 8080 });


interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users:User[] = [];




wss.on('connection', async (ws: WebSocket, request) => {

    

    // extracting token from the url
    const url = request.url;
    if (!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";

    const userId = checkUser(token);

    if (userId == null) {
        ws.close();
        return null ;
    }


    // push users to global array of users
    users.push({
        userId,
        rooms:[],
        ws
    })


    ws.on('message', function message(data) {

        const parsedData = JSON.parse(data as unknown as string); 

        // join the room
        if(parsedData.type === "join_room"){
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }
        
        // want to leave the room
        if(parsedData.type === "leave_room"){
            const user = users.find(x => x.ws === ws);
            if(!user) return null;
            user.rooms = user?.rooms.filter(x => x === parsedData.room);
        }

        
        // broadcast messages to the room
        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId 
                    }))
                }
            })
        }


      
    });
})