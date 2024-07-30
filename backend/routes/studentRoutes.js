const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.post('/update-attendance', studentController.updateAttendance);
router.post('/total-attendance', studentController.totalAttendance);
router.put('/:id', studentController.updateStudent);
router.delete('/:email', studentController.deleteStudent);

module.exports = router;
