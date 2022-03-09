const { event, TBAKey, adminPass } = require('../config.json')
const fs = require('fs');
const path = require('path')

module.exports.checkPassword = (req, res) => {
    let { password } = req.query;
    if(password !== adminPass) return res.status(401).send({"correct": false})
    
    res.status(200).send({"correct": true})
}

module.exports.getMatchTemplate = (req, res) => {
    let template = JSON.parse(fs.readFileSync(path.resolve("./Templates/template.json")))

    res.json(template)
}

module.exports.getPitTemplate = (req, res) => {
    let template = JSON.parse(fs.readFileSync(path.resolve("./Templates/pitTemplate.json")))

    res.json(template)
}

module.exports.setMatchTemplate = (req, res) => {
    let { password, template } = req.body;
    // if(password !== adminPass) return res.status(401).send({"corret": false})

    fs.writeFileSync(path.resolve("../Templates/template.json"), JSON.stringify(template))
    res.status(200).send({"correct": true})
}