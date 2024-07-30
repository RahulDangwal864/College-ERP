const Notice = require("../models/Notice");

exports.getAllNotice = async (req, res) => {
    try {
        const notice = await Notice.find();
        if (!notice) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(notice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addNotice = async (req, res) => {
    try {
        const newNotice = new Notice(req.body);
        await newNotice.save();
        res.status(201).json({
            message: "Notice added Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNotice = async (req, res) => {
    try {
        const deleteNotice = await Notice.findByIdAndDelete(req.params.id);
        if (!deleteNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.json({
            message: "Notice deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};