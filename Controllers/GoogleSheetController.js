const { GoogleSpreadsheet } = require('google-spreadsheet');
const googleapi = require('../googleapi.json')
const { GoogleSheet, PitScout, MatchScout } = require('../Models/models');
const { googleSheetID, googleSheetURL } = require('../config.json');
const { PitScoutReverse, PitScout: PitScoutField, MatchScoutReverse, MatchScout: MatchScoutField} = require('../Models/QuestionToField');

let doc;
let initalize = async () => {
    doc = new GoogleSpreadsheet(googleSheetID);

    await doc.useServiceAccountAuth({
        client_email: googleapi.client_email,
        private_key: googleapi.private_key,
    });
    await doc.loadInfo();
};

initalize()

let renameDocs = (docs, convertObject) => {
    for(let i = 0; i < docs.length; i++) {
        let notInField = {}
        for(key in docs[i]) {
            if(!convertObject.hasOwnProperty(key)) {
                notInField[key] = docs[i][key];
                delete docs[i][key];
            }
        } 
        for(key in docs[i]) {
            delete Object.assign(docs[i], {[convertObject[key]]: docs[i][key] })[key];
        }
        docs[i] = {...docs[i], ...notInField}
    }
}
    

let createPitScout = async (pitSheet) => {
    await pitSheet.clear()

    let pitTitles = Object.keys(PitScoutReverse)
    pitTitles = ["user", "team", ...pitTitles, "imageURL"]
    await pitSheet.setHeaderRow(pitTitles)
    let docs = await PitScout.find({})
    for(let i = 0; i < docs.length; i++) {
        docs[i] = docs[i].toObject()
        delete docs[i]._id;
        delete docs[i].__v;
    }
    renameDocs(docs, PitScoutField)
    
    for(document of docs) {
        await pitSheet.addRow(document)
    }
}

let createMatchScout = async (matchSheet) => {
    await matchSheet.clear()

    let matchTitles = Object.keys(MatchScoutReverse)
    matchTitles = ["user", "team", "match", ...matchTitles]
    await matchSheet.setHeaderRow(matchTitles)
    let docs = await MatchScout.find({})
    for(let i = 0; i < docs.length; i++) {
        docs[i] = docs[i].toObject()
        delete docs[i]._id;
        delete docs[i].__v;
    }
    renameDocs(docs, MatchScoutField)
    
    for(document of docs) {
        await matchSheet.addRow(document)
    }
}

module.exports.googleSheet = async (req, res) => {
    const sheets = doc.sheetsByTitle;

    let pitSheet = sheets["Pit Scout"];
    let matchSheet = sheets["Match Scout"];

    await createPitScout(pitSheet)
    await createMatchScout(matchSheet)

    res.json([googleSheetURL])
}