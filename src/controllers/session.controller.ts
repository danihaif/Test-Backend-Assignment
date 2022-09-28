import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config'

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the user pass
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    
    // Create session
    const session = await createSession(user._id, req.get("userAgent") || "");

    // Create access token
    const accessToken = signJwt( {...user, session: session._id}, {expiresIn: config.get('accessTokenTtl')} /*15 minutes*/);

    // Create refresh token
    const refreshToken = signJwt( {...user, session: session._id}, {expiresIn: config.get('refreshTokenTtl')} /*1y*/);

    // Return access and refresh tokens
    return res.send({accessToken, refreshToken});
}