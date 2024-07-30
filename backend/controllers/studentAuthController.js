const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const secret = "secret";
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isValidPassword = student.password === password;
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: student._id }, secret);

    res.json({ token, authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
