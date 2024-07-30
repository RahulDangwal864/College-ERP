const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
