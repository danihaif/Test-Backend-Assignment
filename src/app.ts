import express from 'express'
import config from 'config'
import connect from './utils/connect';
import logger from './utils/logger'
import routes from './utils/routes';

const port = config.get<string>('port');

console.log("1");

const app = express();

app.use(express.json());

app.listen(port, async () => {
    await connect();
    logger.info(`Listening on port ${port}`);
    console.log("connected");
})

routes(app);