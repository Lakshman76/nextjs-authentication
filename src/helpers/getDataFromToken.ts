import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
    id: string; // Specify that the payload contains an 'id' property
}

export const getDataFromToken = (request: NextRequest): TokenPayload => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;

        return decodedToken;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(errorMessage);
    }

}