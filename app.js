import express from 'express';
import 'express-async-errors';
import { config } from './config.js';
import tweetsRouter  from './router/tweets.js';
import signRouter from './router/sign.js'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {db} from './db/database.js';


const app = express()

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets', tweetsRouter)
app.use('/sign', signRouter)

app.use((req, res, next) => {
    res.sendStatus(404);
  });
  
  app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
  });

  db.getConnection()
  .then((connection) => console.log(connection))
app.listen(config.host.port)