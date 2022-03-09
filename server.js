const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const { event, TBAKey, adminPass } = require('./config.json')
const port = process.env.PORT || 8080;

// mongoose.connect(
//     process.env.DB_URL,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     },
//     () => {
//       console.log("Connected!");
//     }
// );

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')))

const BlueAllianceController = require("./Controllers/BlueAllianceController");
const TemplateController = require("./Controllers/TemplateController");
const MatchScoutController = require("./Controllers/MatchScoutController");
const PitScoutController = require("./Controllers/PitScoutController");
const UserController = require("./Controllers/UserController");

app.get('/api/getMatches', BlueAllianceController.getMatches);
app.get('/api/teams', BlueAllianceController.getTeams);
app.post('/api/checkPassword', TemplateController.checkPassword);
app.get('/api/template', TemplateController.getMatchTemplate);
app.get('/api/pitTemplate', TemplateController.getPitTemplate);
app.post('/api/setTemplate', TemplateController.setMatchTemplate);
app.post('/api/match/submitForm', MatchScoutController.submitForm)
app.post('/api/pit/submitForm', PitScoutController.submitForm)
app.post('/api/users', UserController.create);

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../client/build')});
});

app.listen(port, () => {
    console.log(`Started server on port http://localhost:${port}`)
})