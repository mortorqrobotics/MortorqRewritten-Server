const QuestionToField = require("../Models/QuestionToField")
const { User, MatchScout } = require("../Models/models")

module.exports.submitForm = async (req, res) => {
    let {user, team, match, response} = req.body;
    let formatedForm = {user: user, team: team, match: match};
    response.forEach(item => {
        let value = "";
        if(item.type === "slider") {
            value = parseInt(item.value)
        }
        else if(item.type === "yesno" || item.type === "comment") {
            value = item.value
        }
        formatedForm[QuestionToField.MatchScoutReverse(item.title)] = value;
    })

    await MatchScout.create(formatedForm);
    res.json(formatedForm);
}