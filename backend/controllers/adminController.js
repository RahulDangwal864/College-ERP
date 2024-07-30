const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFaculty = async (req, res) => {
  try {
    // Create faculty
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json({
      message: "Faculty Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    // Create student
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({
      message: "Student Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
