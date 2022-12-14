import express from 'express';
import 'express-async-errors';
import { config } from './config.js';
import tweetsRouter  from './router/tweets.js';
import signRouter from './router/sign.js'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';




const app = express()
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
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

  app.listen(config.port || 8080)


