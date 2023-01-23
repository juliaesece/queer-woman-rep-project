const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {type: String, minLength: 4, required: true },
  name: {type: String, minLength: 2, required: true },
  passwordHash: String,
  createdCouples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Couple'
    }
  ],
  watchedCouples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Couple'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
