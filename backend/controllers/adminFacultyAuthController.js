const Admin = require("../models/Admin");
const Faculty = require("../models/Faculty");
const jwt = require("jsonwebtoken");

const secret = "secret";

exports.adminFacultyLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) {
      user = await Faculty.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }
    let isAdmin = user.isAdmin;
    // Validate password
    const isValidPassword = user.password === password;
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, isAdmin: isAdmin }, secret);

    res.json({ token, isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
