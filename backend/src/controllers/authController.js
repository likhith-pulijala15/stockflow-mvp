const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Organization } = require("../models");

const signup = async (req, res) => {
  try {
    const { email, password, organizationName } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await Organization.create({
      name: organizationName,
    });

    await User.create({
      email,
      password: hashedPassword,
      OrganizationId: organization.id,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: user.OrganizationId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
