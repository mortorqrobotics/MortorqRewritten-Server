const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('fs');
const { event, TBAKey, adminPass } = require('./config.json')
const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/api/getMatches', async (req, res) => {
    let matches = [];
  
    let response = await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/matches`, {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': TBAKey
        }
    })
    let data = await response.json()
    data.sort((a, b) => a.time - b.time);
    data.forEach(object => {
        matches.push([...object.alliances.blue.team_keys.map(str => str.slice(3)), ...object.alliances.red.team_keys.map(str => str.slice(3))])
    })

    res.send(matches);
})

app.get('/api/teams', async (req, res) => {
    let teams = [];
    let response = await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/teams`, {
        method: "GET",
        headers: {
            'X-TBA-Auth-Key': TBAKey
        }
    })
    let data = await response.json();
    data.forEach(object => {
        teams.push(object.team_number.toString())
    })
    teams.sort((a, b) => a-b)

    res.json(teams);
})

// TODO: Fix this mess. Completely unusable for final product
app.post('/api/checkPassword', (req, res) => {
    let { password } = req.query;
    if(password !== adminPass) return res.status(401).send({"correct": false})
    
    res.status(200).send({"correct": true})
})

app.get('/api/template', (req, res) => {
    let template = JSON.parse(fs.readFileSync('template.json'))

    res.json(template)
})

app.get('/api/pitTemplate', (req, res) => {
    let template = JSON.parse(fs.readFileSync('pitTemplate.json'))

    res.json(template)
})

app.post('/api/setTemplate', (req, res) => {
    let { password, template } = req.body;
    // if(password !== adminPass) return res.status(401).send({"corret": false})

    fs.writeFileSync('template.json', JSON.stringify(template))
    res.status(200).send({"correct": true})
})

app.post('/api/match/submitForm', (req, res) => {
    let scores = req.body
    fs.writeFileSync('form.json', JSON.stringify(scores, null, 4));

    res.json({"correct": true})
})

app.post('/api/pit/submitForm', (req, res) => {
    let scores = req.body
    fs.writeFileSync('pitform.json', JSON.stringify(scores, null, 4));

    res.json({"correct": true})
})

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../client/build')});
});

app.listen(port, () => {
    console.log(`Started server on port http://localhost:${port}`)
})