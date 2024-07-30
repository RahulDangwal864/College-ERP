const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({
            message: "Course created Successfully",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({
            message: "Course details Updated!"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const findCourse = await Course.findOne({ name: req.params.name });

        if (!findCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        const deletedCourse = await Course.findByIdAndDelete(findCourse._id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
