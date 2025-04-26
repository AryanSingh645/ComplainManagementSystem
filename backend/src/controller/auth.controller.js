const registerAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
    } catch (error) {
        console.error("Error in registerAdmin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}