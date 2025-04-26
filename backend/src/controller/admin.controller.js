import {prisma} from "../prismaClient.js"
import bcrypt from "bcrypt";
import {sendMail} from "../utils/sendMail.js"
import jwt from "jsonwebtoken"

const registerAdmin = async (req, res) => {
    try {
        const {email, password, name, phone, access} = req.body;
        if(!email || !password || !name || !phone || !access){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email
            }
        });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.admin.create({
            data:{
                email,
                password: hashedPassword,
                name,
                phone: BigInt(phone),
                access
            }
        })
        const mailInfo = await sendMail(email, "Welcome to the Admin Panel", "register", name);
        const token = jwt.sign({id: newAdmin.id, access: newAdmin.access}, process.env.JWT_SECRET, {expiresIn: "30d"});
        if(!token){
            return res.status(500).json({
                success: false,
                message: "Error generating token"
            });
        }
        return res
        .status(201)
        .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 30
        })
        .json({
            success: true,
            message: "Admin registered successfully",
            admin: {
                id: newAdmin.id,
                email: newAdmin.email,
                name: newAdmin.name,
                phone: newAdmin.phone.toString(),
                access: newAdmin.access
            }
        })
    } catch (error) {
        console.error("Error in registerAdmin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const loginAdmin = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            });
        }
        const token = jwt.sign({id: admin.id, access: admin.access}, process.env.JWT_SECRET, {expiresIn: "30d"});
        if(!token){
            return res.status(500).json({
                success: false,
                message: "Error generating token"
            });
        }
        return res
        .status(201)
        .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 30
        })
        .json({
            success: true,
            message: "Admin logged in successfully",
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                phone: admin.phone.toString(),
                access: admin.access
            }
        })
        
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const logoutAdmin = async (req, res) => {
    try {
        res
        .clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .status(200)
        .json({
            success: true,
            message: "Admin logged out successfully"
        });
    } catch (error) {
        console.error("Error in logoutAdmin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getAdminDashBoard = async (req, res) => {
    
}

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}