const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    noticeNumber: { type: Number, required: true },
    noticeDescription: { type: String, required: true },
    noticeDate: { type: String, required: true }
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;