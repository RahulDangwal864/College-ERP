const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('course'); // Populate the 'course' field
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('course'); // Populate the 'course' field
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, password, email, course } = req.body;
    const newStudent = new Student({ name, password, email, course });
    await newStudent.save();
    res.status(201).json({
      message: "Student created Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({
      message: "Student details Updated!"
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = await Student.findByIdAndDelete(student._id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const updates = req.body;
    if (!Array.isArray(updates)) {
      throw new Error('Updates must be an array');
    }

    const bulkOperations = updates.map(update => ({
      updateOne: {
        filter: { _id: update.studentId },
        update: { $inc: { attendance: update.attendanceCount } }
      }
    }));

    await Student.bulkWrite(bulkOperations);
    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.totalAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      "662b3c2219a7f45154c025bb",
      req.body,
      { new: true }
    );
    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.json({
      updatedAttendance: updatedAttendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}