import jwt from "jsonwebtoken";
import crypto from "crypto"
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Please Login!"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({
                success: false,
                message: "Invalid Token!"
            })
        }
        const { id } = decodedToken;
        req.userId = id;
        next();
    } catch (error) {
        console.error("Error verifying user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export default verifyUser;