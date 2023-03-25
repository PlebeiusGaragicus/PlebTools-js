import path from 'path';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    // res.sendFile(path.join(process.cwd(), 'public/index.html'));
    res.sendFile(path.join(process.cwd(), 'public/calc.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
