const {Schema, model}= require('mongoose')

const betClassificationSchema = new Schema({
idUser:{type:String, required:true},
group:{type:String, required:true},
firstTeam:{type:String,required:true, default:" "},
secondTeam:{type:String,required:true,default:" "},
thirdTeam:{type:String,required:true,default:" "},
fourthTeam:{type:String,required:true,default:" "},
earnedScore:{type:Number, default:0},
created_at:{type:Date, default:Date.now}
},
{versionKey:false})

module.exports = model('BetClassification', betClassificationSchema)