const mongoose = require('mongoose')

const url =  "mongodb://julia:jpnglKiOEoe9IQc9@qwr-shard-00-00.9a0bz.mongodb.net:27017,qwr-shard-00-01.9a0bz.mongodb.net:27017,qwr-shard-00-02.9a0bz.mongodb.net:27017/couples?ssl=true&replicaSet=atlas-ejj1v5-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const coupleSchema = new mongoose.Schema({
  person1: String,
  person2: String,
  origin: String,
  year: Date,
  originType: String,
  status: String,
  altImg: String,
  globalRating: Number,
  ending: String,
  description: String,
  image: String,
  watchedByUser: Boolean,
  dateAdded: Date
})



const Couple = mongoose.model('Couple', coupleSchema)

// const jean = new Couple({
//   person1: "Naomi",
//   person2: "Emily",
//   origin: "Skins UK",
//   year: new Date("09-01-22"),
//   originType: "TV Show",
//   status: "Finished",
//   altImg: "Naomi and Emily lie in the ground with bottles of alcohol",
//   globalRating: 7,
//   ending: "Other",
//   description: "The story of a group of British teens who are trying to grow up and find love and happiness despite questionable parenting and teachers who more want to be friends (and lovers) rather than authority figures.",
//   image: "https://2927639c-madman-com-au.akamaized.net/news/wp-content/uploads/2013/10/still_9399-2.jpg",
//   watchedByUser: true,
//   dateAdded: new Date()
// })

jean.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


Couple.find({}).then(result => {
  result.forEach(couple => {
    console.log(couple)
  })
  mongoose.connection.close()
})
