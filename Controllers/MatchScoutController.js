const QuestionToField = require("../Models/QuestionToField")
const mongoose = require('mongoose')
const { User, MatchScout } = require("../Models/models")

module.exports.submitForm = async (req, res) => {
    let id = new mongoose.mongo.ObjectId();
    let {user, team, match, response} = req.body;
    let formatedForm = {user: user, team: team, match: match, _id: id};
    response?.forEach(item => {
        let value = "";
        if(item.type === "slider" || item.type === "timer") {
            value = parseInt(item.value)
        }
        else if(item.type === "yesno" || item.type === "comment") {
            value = item.value
        }
        formatedForm[QuestionToField.MatchScoutReverse[item.title]] = value;
    })

    let doc = await MatchScout.create(formatedForm);
    res.json(formatedForm);
}

module.exports.get = async (req, res) => {
    let docs = await MatchScout.find({})
    res.json(docs);   
}