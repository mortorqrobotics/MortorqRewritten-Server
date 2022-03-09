const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String 
})

const MatchScoutSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: String,
    team: Number,
    match: Number,
    autoAttGoalUpp: Number,
    autoMadeGoalUpp: Number,
    autoAttGoalLow: Number,
    automadeGoalLow: Number,
    autoMoveLine: Boolean,
    autoAttHPShot: Number,
    autoMadeHPShot: Number,
    teleAttGoalUpp: Number,
    teleMadeGoalUpp: Number,
    teleAttGoalLow: Number,
    teleMadeGoalLow: Number,
    climbTime: Number,
    climbLowAtt: Number,
    climbLowMade: Number,
    climbMidAtt: Number,
    climbMidMade: Number,
    climbHighAtt: Number,
    climbHighMade: Number,
    climbTravAtt: Number,
    climbTravMade: Number,
    comments: String,
    defense: Boolean
})

const PitScoutSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: String,
    team: Number,
    weight: Number,
    drivetrain: String,
    shootLocation: String,
    ballCarry: String,
    doesClimb: Boolean,
    climbLocation: String,
    doesAuto: Boolean,
    autoProgram: String,
    doesDefense: Boolean,
    whatIsDefense: Boolean,
    comments: String,
    imageURL: String
})

module.exports.User = mongoose.model("User", UserSchema);
module.exports.PitScout = mongoose.model("PitScout", PitScoutSchema);
module.exports.MatchScout = mongoose.model("MatchScout", MatchScoutSchema);