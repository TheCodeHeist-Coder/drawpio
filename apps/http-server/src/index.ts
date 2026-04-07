import express from 'express';
import {configDotenv} from 'dotenv'
configDotenv();

import authRoutes from './routes/authRoutes'
import roomRoutes from './routes/rooms'

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1", roomRoutes);

app.listen(PORT, () => {
    console.log(`Hii I'm srvr..lives with localhost ${PORT}`);
})