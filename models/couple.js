const mongoose = require('mongoose')

console.log("using couple schema")

const coupleSchema = new mongoose.Schema({
  person1: {
    name: {type: String, minLength: 2, required: true },
    gender: String,
    sexualOrientation: String,
    genderIdentity: String,
    genderExpression: String,
    ethnicity: [String],
    lifeStage: String},
  person2: {
    name: {type: String, minLength: 2, required: true },
    gender: String,
    sexualOrientation: String,
    genderIdentity: String,
    genderExpression: String,
    ethnicity: [String],
    lifeStage: String},
  origin: {type: String, minLength: 2, required: true },
  originType: {type: String, minLength: 2, required: true },
  year: Date,
  status: String,
  description: String,
  image: {type: String, minLength: 2, required: true },
  altImg: String,
  screenTime: String,
  storyImportance: String,
  globalRating: Number,
  romanticConnection: Number,
  chemistry: Number,
  ending: String,
  concerns: {
    comingOut: Boolean,
    death: Boolean,
    cheating: Boolean,
    homophobia: Number
  },
  dateAdded: {type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  watchedByUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  watchedCount: Number,
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  upVotesCount: Number,
  downVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotesCount: Number
})

coupleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Couple', coupleSchema)
