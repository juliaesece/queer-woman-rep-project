const couplesRouter = require('express').Router()
const Couple = require('../models/couple')
const User = require('../models/user')
const Logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

couplesRouter.get("/", async (request, response) => {
	const couples = await Couple
		.find({}).populate({ path: 'createdBy watchedByUsers', select: 'email', options: { _recursed: true } })
		response.json(couples)
})

couplesRouter.get("/movies", (request, response) => {
	Couple.find({originType:"Movie"}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/tv-shows", (request, response) => {
	Couple.find({originType:"TV Show"}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/happy-ending", (request, response) => {
	Couple.find({ending:"Happy"}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/popularity", (request, response) => {
	Couple.find({}).sort({watchedCount:  -1}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/most-liked", (request, response) => {
	Couple.find({}).sort({upVotesCount:  -1}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/recently-added", (request, response) => {
	Couple.find({}).sort({dateAdded:  -1}).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/newest", (request, response) => {
	Couple.find({}).sort({year:  -1}).then(couple => {
		response.json(couple)
	})
})




couplesRouter.get("/more-diversity", (request, response) => {
	Couple.find({$or:
 [
 {"person1.gender": {$not: {$eq: "Woman"}}},
 {"person2.gender": {$not: {$eq: "Woman"}}},
{"person1.genderIdentity": {$not: {$eq: "Cisgender"}}},
{"person2.genderIdentity": {$not: {$eq: "Cisgender"}}},
// {$nor: [{"person1.genderExpression": "Femme"}, {"person1.genderExpression" : "None"}]},
// {$nor: [{"person2.genderExpression": "Femme"}, {"person2.genderExpression" : "None"}]},
{"person1.ethnicity": {$not: { $size: 1}}},
{"person1.ethnicity": {$not: { $eq: "white"}}},
{"person2.ethnicity": {$not: { $size: 1}}},
{"person2.ethnicity": {$not: { $eq: "white"}}},
 ]
 }).then(couple => {
		response.json(couple)
	})
})

couplesRouter.get("/:id", (request, response, next) => {
	console.log("getid accionado desde backend index")
	Couple.findById(request.params.id)
		.then(couple => {
			if (couple) {
				response.json(couple)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

couplesRouter.put("/:id/watched", async (req, res) => {
	console.log("put o update accionado desde backend index")
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const couple = await Couple.findById(req.params.id)
  // user receives only ids
  const index = couple.watchedByUsers.findIndex((id)=> id == String(user._id))

  if(index == -1) {
    // wants to mark as watch
    couple.watchedByUsers.push(user._id)
    user.watchedCouples.push(couple._id)
    // couple.save()
    user.save()
  } else {
    // wants to mark as did not watch
    couple.watchedByUsers = couple.watchedByUsers.filter((id)=> id != String(user._id))
    user.watchedCouples = user.watchedCouples.filter((id)=> id != String(couple._id))
    user.save()
    // couple.save()
  }
  Logger.info(couple.watchedByUsers.length)
  couple.watchedCount = couple.watchedByUsers.length;
  Logger.info(couple.watchedCount)
  const updatedCouple = await Couple.findByIdAndUpdate(req.params.id, couple, {new: true})

  return res.send(updatedCouple)
})

couplesRouter.put("/:id/vote-up", async (req, res) => {
	console.log("put o update accionado desde backend index pa vote up")
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const couple = await Couple.findById(req.params.id)
  // user receives only ids
  const indexUp = couple.upVotes.findIndex((id)=> id == String(user._id))
  const indexDown = couple.downVotes.findIndex((id)=> id == String(user._id))
  Logger.info("start info")
  Logger.info("up votes:", couple.upVotes.length)
  Logger.info("down votes:", couple.downVotes.length)

  if(indexUp == -1 && indexDown == -1) {
    // first time vote
    couple.upVotes.push(user._id)
    // user.watchedCouples.push(couple._id)
    // couple.save()
    // user.save()
  } else if (indexUp == -1 && indexDown != -1){
    // wants to change from down to up
    couple.downVotes = couple.downVotes.filter((id)=> id != String(user._id))
    couple.upVotes.push(user._id)
    // couple.save()
  } else {
    // wants to retire up vote
    couple.upVotesCount = couple.upVotes.length;
    couple.upVotes = couple.upVotes.filter((id)=> id != String(user._id))
  }

  const updatedCouple = await Couple.findByIdAndUpdate(req.params.id, couple, {new: true})

  Logger.info("final info")
  Logger.info("up votes:", couple.upVotes.length)
  Logger.info("down votes:", couple.downVotes.length)

  return res.send(updatedCouple)
})

couplesRouter.put("/:id/vote-down", async (req, res) => {
	console.log("put o update accionado desde backend index pa vote down")
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const couple = await Couple.findById(req.params.id)
  // user receives only ids
  const indexUp = couple.upVotes.findIndex((id)=> id == String(user._id))
  const indexDown = couple.downVotes.findIndex((id)=> id == String(user._id))
  Logger.info("start info")
  Logger.info("up votes:", couple.upVotes.length)
  Logger.info("down votes:", couple.downVotes.length)

  if(indexUp == -1 && indexDown == -1) {
    // first time vote, down vote
    couple.downVotes.push(user._id)
    // user.watchedCouples.push(couple._id)
    // couple.save()
    // user.save()
  } else if (indexDown == -1 && indexUp != -1){
    // wants to change from up to down
    couple.upVotes = couple.upVotes.filter((id)=> id != String(user._id))
    couple.downVotes.push(user._id)
    // couple.save()
  } else {
    // wants to retire down vote
    couple.downVotes = couple.downVotes.filter((id)=> id != String(user._id))
  }

  couple.downVotesCount = couple.downVotes.length;

  const updatedCouple = await Couple.findByIdAndUpdate(req.params.id, couple, {new: true})

  Logger.info("final info")
  Logger.info("up votes:", couple.upVotes.length)
  Logger.info("down votes:", couple.downVotes.length)
  return res.send(updatedCouple)
})


couplesRouter.delete("/:id", (request, response) => {
	Couple.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

couplesRouter.post("", async (request, response, next) => {
	const body = request.body
 	const token = getTokenFrom(request)
 	const decodedToken = jwt.verify(token, process.env.SECRET)
 	if (!decodedToken.id) {
	 	return response.status(401).json({ error: 'token missing or invalid' })
 	}
 	const user = await User.findById(decodedToken.id)

	// const user = await User.findById("6313cf5b789df77295dcc6e8")

	if (body === undefined) {
		return response.status(400).json({ error: "content missing" })
	}


	console.log("backend index create, correct one day")
	const couple = new Couple({
		person1: body.person1,
		person2: body.person2,
		origin: body.origin,
		originType: body.originType,
		year: body.year,
		status: body.status,
		description: body.description,
		image: body.image,
		altImg: body.altImg,
		screenTime: body.screenTime,
		storyImportance: body.storyImportance,
		globalRating: body.globalRating,
		romanticConnection: body.romanticConnectoin,
		chemistry: body.chemistry,
		ending: body.ending,
		concerns: body.concerns,
		watchedByUser: body.watchedByUser || false,
		dateAdded: new Date(),
		createdBy: user._id,
    watchedByUsers: []
	})

	console.log(couple)

	const savedCouple = await couple.save()
  user.createdCouples = user.createdCouples.concat(savedCouple._id)
	await user.save()

  response.json(savedCouple)

	// couple.save().then(savedCouple => {
	// 	user.createdCouples = user.createdCouples.concat(savedCouple._id)
	// 	response.status(201).json(savedCouple)
	// })
	// 	.catch(error => next(error))
	//
	//
	// await user.save()
})

module.exports = couplesRouter
