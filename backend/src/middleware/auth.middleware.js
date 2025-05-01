import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                isVerified: false,
                success: false,
                message: "Please Login!"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({
                isVerified: false,
                success: false,
                message: "Invalid Token!"
            })
        }
        const { id, access } = decodedToken;
        console.log("Decoded Token:", decodedToken);
        const user = await prisma.admin.findUnique({
            where: {
                id
            }
        });
        if(!user){
            return res.status(401).json({
                isVerified: false,
                success: false,
                message: "User not found!"
            })
        }
        req.userId = id;
        req.userAccess = access;
        next();
    } catch (error) {
        console.error("Error verifying user:", error);
        return res.status(500).json({
            isVerified: false,
            success: false,
            message: "Internal Server Error"
        });
    }
}

export default verifyUser;