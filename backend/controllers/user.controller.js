const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
//User Registration

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }
    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);

      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const createdUser = await User.create({
      fullname,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    // Respond with success
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error during user registration:", err.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

//User Login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "365d",
    });

    const userResponse = {
      id: user._id,
      role: user.role,
      fullname: user.fullname,
      email: user.email,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };

    const maxAge = 365 * 24 * 60 * 60 * 1000;
    res
      .status(200)
      .cookie("token", token, {
        maxAge,
        httpsOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged in successfully",
        success: true,
        user: userResponse,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//User Logout
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//User Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Validate input
    if (!fullname || !email || !phoneNumber) {
      return res
        .status(400)
        .json({
          message: "Fullname, email, and phone number are required",
          success: false,
        });
    }

    // Ensure file is present and get its data URI
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);

      // Ensure the file is a PDF
      if (file.mimetype !== "application/pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF files are allowed", success: false });
      }

      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const skillsArray = skills ? skills.split(",") : [];

    const userId = req.id; // Middleware should set this properly

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update user profile data
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skillsArray.length
      ? skillsArray
      : user.profile.skills;

    // Save the updated user
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save original file name
    }

    await user.save();

    // Prepare response
    const responseUser = {
      id: user._id,
      role: user.role,
      fullname: user.fullname,
      email: user.email,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };

    return res
      .status(200)
      .json({
        message: "Profile updated successfully",
        user: responseUser,
        success: true,
      });
  } catch (error) {
    console.error("Error updating profile:", error.message); // Log error message
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
};
