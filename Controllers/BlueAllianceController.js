const { event, TBAKey, adminPass } = require('../config.json')
const fetch = require('node-fetch')

module.exports.getMatches = async (req, res) => {
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
}

module.exports.getTeams = async (req, res) => {
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
}