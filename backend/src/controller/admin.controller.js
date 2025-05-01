import {prisma} from "../prismaClient.js"
import bcrypt from "bcrypt";
import {sendMail} from "../utils/sendMail.js"
import jwt from "jsonwebtoken"

const registerAdmin = async (req, res) => {
    try {
        const {email, password, name, phone, access} = req.body;
        console.log(req.body, "Register body");
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
        console.log(req.body, "Login body");
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

const verifyAdmin = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Admin verified successfully",
    })
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
    try {
        const dashBoardData = await prisma.complain.findMany();
        if(!dashBoardData){
            return res.status(500).json({
                success: false,
                message: "Error fetching dashboard data"
            });
        }
        // console.log(dashBoardData.name, "Dashboard Data");
        const formattedDashBoardData = dashBoardData.map(data => ({
            id: data.id,
            name: data.name,
            phoneNumber: data.phoneNumber?.toString(),
            emailId: data.emailId,
            blockNumber: data.blockNumber,
            flatNumber: data.flatNumber,
            complaintCategory: data.complaintCategory,
            subCategory: data.subCategory,
            complaintDescription: data.complaintDescription,
            images: data.images,
            status: data.status,
            timestamp: data.timestamp
        }));

        return res.status(200).json({
            success: true,
            isVerified: true,
            message: "Dashboard data fetched successfully",
            dashBoard: formattedDashBoardData
        });
    } catch (error) {
        console.error("Error in getAdminDashBoard:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const changeStatus = async (req, res) => {
    try {
      const { complaintId, newStatus } = req.body;
      const userAccess = req.userAccess;
      if(userAccess !== "READ_WRITE"){
          return res.status(403).json({
              success: false,
              message: "You are not authorized to change the status of this complain"
          });
      }
      if(!complaintId || !newStatus){
          return res.status(400).json({
              success: false,
              message: "Complaint ID and new status are required"
          });
      }
      const complain = await prisma.complain.findUnique({
        where: {
          id: complaintId
        }
      });
      if(!complain){
          return res.status(404).json({
              success: false,
              message: "Complain not found"
          });
      }
      const updatedComplain = await prisma.complain.update({
        data: {
          status: newStatus
        },
        where: {
          id: complaintId
        }
      })
      if(!updatedComplain){
        return res.status(500).json({
          success: false,
          message: "Error updating complain"
        });
      }
      return res.status(200).json({
        success: true,
        message: "Complain status updated successfully",
        complain: {
          id: updatedComplain.id,
          name: updatedComplain.name,
          phoneNumber: updatedComplain.phoneNumber.toString(),
          emailId: updatedComplain.emailId,
          blockNumber: updatedComplain.blockNumber,
          flatNumber: updatedComplain.flatNumber,
          complaintCategory: updatedComplain.complaintCategory,
          subCategory: updatedComplain.subCategory,
          complaintDescription: updatedComplain.complaintDescription,
          images: updatedComplain.images
        }
      })
    } catch (error) {
      console.error("Error in changeStatus:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

export {
    registerAdmin,
    loginAdmin,
    verifyAdmin,
    logoutAdmin,
    getAdminDashBoard,
    changeStatus
}