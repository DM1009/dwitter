import {express} from "express"
import { config } from './config.js';
import { tweetsRouter } from './router/tweets.js';
import dotenv from 'dotenv'

dotenv.config()


const app = express()

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets', tweetsRouter)
app.use('/sign', signRouter)

app.listen(config.host.port)