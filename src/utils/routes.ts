import {Express, Request, Response} from 'express'
import { createUser } from '../services/user.service';
import validate from '../middleware/validteResource';
import { createUserSchema } from '../schema/user.schema';
import validateResource from "../middleware/validteResource";
import { createUserHandler } from '../controllers/user.controller';
import { createUserSessionHandler } from '../controllers/session.controller';
import { createSessionSchema } from '../schema/session.schema';

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
   app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

   /**
    * @openapi
    * '/api/users':
    *  post:
    *     tags:
    *     - User
    *     summary: Register a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateUserInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateUserResponse'
    *      409:
    *        description: Conflict
    *      400:
    *        description: Bad request
    */
   app.post("/api/users", validateResource(createUserSchema), createUserHandler);

   app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);


}

export default routes;