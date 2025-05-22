import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.use(express.json());

app.listen(3333, () => {
    console.log('Server start from port 3333');
});