import jwt, { JwtPayload } from "jsonwebtoken";


// Verify JWT token
export async function verifyResetToken(token: string) {
    try {
        const secret = process.env.JWT_SECRET;
        // console.log(34567, secret);

        if (!secret) {
            return {
                valid: false,
                data: {
                    userId: null,
                }
            };
        }

        const decoded = jwt.verify(token, secret as string) as JwtPayload;
        // console.log(decoded, 1234);
        // Check if token has expired (JWT handles this automatically, but double-check)
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            return {
                valid: false,
                data: {
                    userId: null,
                }
            };
        }
        return {
            valid: true,
            data: {
                userId: decoded.userId,
            }
        };

    } catch (error) {
        console.log(error);
        return {
            valid: false,
            data: {
                userId: null,
            }
        };
    }
}