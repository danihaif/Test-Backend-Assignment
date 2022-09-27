import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the user pass
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    
    // Create session
    const session = await createSession(user._id, req.get("userAgent") || "");

    // Create access token

    // Create refresh token

    // Return access and refresh tokens
}