const {Schema, model}= require('mongoose')

const betClassificationSchema = new Schema({
idUser:{type:String, required:true},
// idClassification:{type:String, required:true, default:" "},
group:{type:String, required:true},
firstTeam:{type:String,required:true, default:"NO-BET"},
secondTeam:{type:String,required:true,default:"NO-BET"},
thirdTeam:{type:String,required:true,default:"NO-BET"},
fourthTeam:{type:String,required:true,default:"NO-BET"},
earnedScore:{type:Number, default:0},
created_at:{type:Date, default:Date.now}
},
{versionKey:false})

module.exports = model('BetClassification', betClassificationSchema)