import {prisma}  from "../prismaClient.js";
import { sendMail } from "../utils/sendMail.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerComplain = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      emailId,
      blockNumber,
      flatNumber,
      complaintCategory,
      subCategory,
      complaintDescription,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !emailId ||
      !blockNumber ||
      !flatNumber ||
      !complaintCategory ||
      !complaintDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (complaintCategory == "Clubhouse" || complaintCategory == "Park") {
      if (!subCategory) {
        return res.status(400).json({
          success: false,
          message: "Sub-category is required",
        });
      }
    }

    let galleryLocalPaths;
    if (
      req.files &&
      Array.isArray(req.files.gallery) &&
      req.files.gallery.length > 0
    ) {
      galleryLocalPaths = req.files.gallery;
    }

    let images = [];
    for(const gallerPath of galleryLocalPaths){
        const image = await uploadOnCloudinary(gallerPath.path);
        if(!image){
            return res.status(500).json({
                success: false,
                message: "Error uploading image"
            });
        } else {
            images.push(image.url);
        }
    }

    const newComplain = await prisma.complain.create({
      data: {
        name,
        phoneNumber: BigInt(phoneNumber),
        emailId,
        blockNumber: Number(blockNumber),
        flatNumber: Number(flatNumber),
        complaintCategory,
        subCategory: subCategory.trim().length > 0 ? subCategory : null,
        complaintDescription,
        images,
        timestamp: new Date(Date.now())
      },
    });
    if(!newComplain){
        return res.status(500).json({
            success: false,
            message: "Error creating complain"
        });
    }
    const mailInfo = await sendMail(emailId, "Complain Registered", "complain", name, null, {});
    
    return res.status(201).json({
      success: true,
      message: "Complain registered successfully",
      complain: {
        id: newComplain.id,
        name: newComplain.name,
        phoneNumber: newComplain.phoneNumber.toString(),
        emailId: newComplain.emailId,
        blockNumber: newComplain.blockNumber,
        flatNumber: newComplain.flatNumber,
        complaintCategory: newComplain.complaintCategory,
        subCategory: newComplain.subCategory,
        complaintDescription: newComplain.complaintDescription,
        images: newComplain.images
      },
    });

  } catch (error) {
    console.error("Error in registerComplain:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
    registerComplain
}