const mongoose = require("mongoose");
const { User } = require("../Models/models");

module.exports.create = async (req, res) => {
    let id = new mongoose.mongo.ObjectId();
    let userParams = {...req.body, _id: id }

    let existingUser = await User.findOne({ name: req.body.name });
    if(existingUser) {
        return res.json(existingUser);
    }

    await User.create(userParams)
    res.json(userParams)
}