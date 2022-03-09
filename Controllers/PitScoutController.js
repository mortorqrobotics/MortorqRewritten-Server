const QuestionToField = require("../Models/QuestionToField")
const mongoose = require('mongoose')
const { PitScout } = require("../Models/models")
const cloudinary = require('../Util/cloudinary')

module.exports.submitForm = async (req, res) => {
    let id = new mongoose.mongo.ObjectId();
    let {user, team, response} = req.body;
    let formatedForm = {user: user, team: team, _id: id};
    response.forEach(item => {
        let value = "";
        if(item.type === "numpad") {
            value = parseInt(item.value);
        }
        else if(item.type === "yesno") {
            value = item.value === "No" ? false : true; 
        }
        else if(item.type === "comment" || item.type === "shortcomment" || item.type === "dropdown") {
            value = item.value;
        }
        formatedForm[QuestionToField.PitScoutReverse[item.title]] = value;
    })

    await PitScout.create(formatedForm);
    res.json(formatedForm);
}

module.exports.image = async (req, res) => {
    try {
        const image = await cloudinary.uploader.upload(req.file.path, {
            public_id: req.params.pitid,
        });

        const data = { imageURL: image.secure_url };
        let doc = await PitScout.findByIdAndUpdate(req.params.pitid, data, {
            new: true,
        });
        res.json(doc);
    } catch (e) {
        console.log(e);
        res.status(500).send("Failed");
    }
}

module.exports.get = async (req, res) => {
    let docs = await PitScout.find({})
    res.json(docs);   
}