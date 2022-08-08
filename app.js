import {express} from "express"
import { tweetsRouter } from './router/tweets';

const app = express()

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets', tweetsRouter)
app.use('/sign', signRouter)