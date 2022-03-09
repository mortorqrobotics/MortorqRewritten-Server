const { event, TBAKey, adminPass } = require('../config.json')
const fs = require('fs');

module.exports.checkPassword = (req, res) => {
    let { password } = req.query;
    if(password !== adminPass) return res.status(401).send({"correct": false})
    
    res.status(200).send({"correct": true})
}

module.exports.getMatchTemplate = (req, res) => {
    let template = JSON.parse(fs.readFileSync('template.json'))

    res.json(template)
}

module.exports.getPitTemplate = (req, res) => {
    let template = JSON.parse(fs.readFileSync('pitTemplate.json'))

    res.json(template)
}

module.exports.setMatchTemplate = (req, res) => {
    let { password, template } = req.body;
    // if(password !== adminPass) return res.status(401).send({"corret": false})

    fs.writeFileSync('template.json', JSON.stringify(template))
    res.status(200).send({"correct": true})
}