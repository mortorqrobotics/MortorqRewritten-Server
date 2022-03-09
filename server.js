const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('./Util/multer')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
        if(err) console.log(err) 
        else console.log("mongdb is connected");
    }
);

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')))

const BlueAllianceController = require("./Controllers/BlueAllianceController");
const TemplateController = require("./Controllers/TemplateController");
const MatchScoutController = require("./Controllers/MatchScoutController");
const PitScoutController = require("./Controllers/PitScoutController");
const UserController = require("./Controllers/UserController");
const GoogleSheetController = require('./Controllers/GoogleSheetController');

app.get('/api/getMatches', BlueAllianceController.getMatches);
app.get('/api/teams', BlueAllianceController.getTeams);
app.post('/api/checkPassword', TemplateController.checkPassword);
app.get('/api/template', TemplateController.getMatchTemplate);
app.get('/api/pitTemplate', TemplateController.getPitTemplate);
app.get('/api/googleSheets', GoogleSheetController.googleSheet);
app.post('/api/setTemplate', TemplateController.setMatchTemplate);
app.post('/api/match/submitForm', MatchScoutController.submitForm)
app.post('/api/pit/submitForm', PitScoutController.submitForm)
app.post("/api/pit/:pitid/image", multer.single("image"), PitScoutController.image);
app.get('/api/match', MatchScoutController.get)
app.get('/api/pit', PitScoutController.get)
app.post('/api/users', UserController.create);

app.listen(port, () => {
    console.log(`Started server on port http://localhost:${port}`)
})