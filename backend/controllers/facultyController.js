const Faculty = require('../models/Faculty');

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFaculty = async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    res.json(updatedFaculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ email: req.params.email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const deletedFaculty = await Faculty.findByIdAndDelete(faculty._id);
    if (!deletedFaculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    res.json({ message: 'Faculty member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
