const userModel = require("../models/User"); // Matches your architecture
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Checks the "isAdmin" flag you set in MongoDB Atlas
        if (!user.isAdmin) {
            return res.json({ success: false, message: "Access Denied: Not an Admin" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

module.exports = { adminLogin };