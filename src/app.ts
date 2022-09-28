import express from 'express'
import config from 'config'
import connect from './utils/connect';
import logger from './utils/logger'
import routes from './utils/routes';
import des from './middleware/deserializeUser'
import deserializeUser from './middleware/deserializeUser';

const port = config.get<string>('port');

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
    await connect();
    logger.info(`Listening on port ${port}`);
    console.log("connected");
})

routes(app);