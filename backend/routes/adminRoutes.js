const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/:id", adminController.getAdminById)
router.post('/faculty', adminController.createFaculty);
router.post('/students', adminController.createStudent);

module.exports = router;
