const express = require('express');
const router = express.Router();
const adminFacultyAuthController = require('../controllers/adminFacultyAuthController');
const studentAuthController = require('../controllers/studentAuthController');

router.post('/admin-faculty', adminFacultyAuthController.adminFacultyLogin);

router.post('/student', studentAuthController.studentLogin);

module.exports = router;
