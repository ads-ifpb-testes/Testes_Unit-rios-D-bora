import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors'
import { routes } from './routes/routes';



const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../views')));
app.use(routes)

export {app};