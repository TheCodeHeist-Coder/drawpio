import express from 'express';
import {configDotenv} from 'dotenv'
configDotenv();


const app = express();

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
    console.log(`Hii I'm srvr..lives with localhost ${PORT}`);
})