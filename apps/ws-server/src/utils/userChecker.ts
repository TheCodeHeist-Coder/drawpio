import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/common';

export function checkUser(token: string): string | null {

    try {
        

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
        return null;
    }

    if (!decoded || !(decoded as JwtPayload).userId) {
        return null;
    }

    return decoded.userId;
 } catch (error) {
         return null;
    }


}
