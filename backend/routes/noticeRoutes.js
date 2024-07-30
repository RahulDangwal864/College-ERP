const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.get('/', noticeController.getAllNotice);
router.post('/', noticeController.addNotice);
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
