module.exports.MatchScout = {
    "autoAttGoalUpp": "Goals attempted upper",
    "autoMadeGoalUpp": "Goals made upper",
    "autoAttGoalLow": "Goals attempted lower",
    "automadeGoalLow": "Goals made lower",
    "autoMoveLine": "Moved off line?",
    "autoAttHPShot": "H.P. shots attempted",
    "autoMadeHPShot": "H.P. shots made",
    "teleAttGoalUpp": "Goals attempted upper",
    "teleMadeGoalUpp": "Goals made upper",
    "teleAttGoalLow": "Goals attempted lower",
    "teleMadeGoalLow": "Goals made lower",
    "climbTime": "Climbing time",
    "climbLowAtt": "Climb low attempted",
    "climbLowMade": "Climb low made",
    "climbMidAtt": "Climb mid attempted",
    "climbMidMade": "Climb mid made",
    "climbHighAtt": "Climb high attempted",
    "climbHighMade": "Climb high made",
    "climbTravAtt": "Climb traversal attempted",
    "climbTravMade": "Climb traversal made",
    "comments": "General comments",
    "defense": "Played defense?"
}

module.exports.MatchScoutReverse = swap(module.exports.MatchScout);

module.exports.PitScout = {
    "weight": "Weight (lbs)",
    "drivetrain": "Type of drivetrain",
    "shootLocation": "Where do you like to shoot?",
    "ballCarry": "Carry 2 or 1 balls?",
    "doesClimb": "Climbs?",
    "climbLocation": "Where do you climb to",
    "doesAuto": "Auto?",
    "autoProgram": "What is the auto",
    "doesDefense": "Plays defense?",
    "whatIsDefense": "What is the defense?",
    "comments": "General comments"
}

module.exports.PitScoutReverse = swap(module.exports.PitScout);

function swap(json){
    var ret = {};
    for(let key in json){
      ret[json[key]] = key;
    }
    return ret;
}