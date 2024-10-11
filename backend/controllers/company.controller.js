const Company = require("../models/company.medel.js");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

//The `registerCompany` function creates a new company with the given name if it doesn't already exist and returns a success or error message.
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      UserId: req.id,
    });
    return res.status(200).json({
      message: "company registerd successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

//The getCompany function retrieves and returns all companies associated with the logged-in user,
const getCompany = async (req, res) => {
  try {
    const UserId = req.id; //logged in userId
    const companies = await Company.find({ UserId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error fetching company",
      success: false,
    });
  }
};

//The `getCompanyById` function retrieves and returns a company by its ID, or an error message if the company is not found.
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

//The `updateCompany` function updates a company's details based on its ID and returns a success or error message.
const updateCompany = async (req, res) => {
  try {
    const { name, location, description, website } = req.body;
    console.log(name, location, description, website);

    const file = req.file;
    //cloudinary
    const fileUri = getDataUri(file);
    cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const logo = cloudResponse.secure_url;

    const updateData = { name, location, description, website, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company information updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};
