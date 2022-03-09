const QuestionToField = require("../Models/QuestionToField")
const { PitScout } = require("../Models/models")

module.exports.submitForm = (req, res) => {
    let {user, team, response} = req.body;
    let formatedForm = {user: user, team: team};
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
        formatedForm[QuestionToField.MatchScoutReverse(item.title)] = value;
    })

    await PitScout.create(formatedForm);
    res.json(formatedForm);
}