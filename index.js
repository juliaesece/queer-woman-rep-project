// require("dotenv").config()
// const express = require("express")

// const cors = require("cors")
// const mongoose = require("mongoose")
// const Couple = require("./models/couple")
// const path = require('path');


//añadido por
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// terminar

// app.use(express.static(path.join(__dirname, 'build')))
//
// app.use(cors())
// app.use(express.json())
// app.use(bodyParser.json())

// database connection
// const url = process.env.MONGODB_URI
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//
// app.use(express.json())
//
// app.get("/", (request, response) => {
// 	response.send("<h1>Hello World!</h1>")
// })
//
// app.get("/api/couples", (request, response) => {
// 	console.log("getall accionado desde backend index")
// 	Couple.find({}).then(couple => {
// 		response.json(couple)
// 	})
// })
//
// app.get("/api/couples/movies", (request, response) => {
// 	Couple.find({originType:"Movie"}).then(couple => {
// 		response.json(couple)
// 	})
// })
//
// app.get("/api/couples/tv-shows", (request, response) => {
// 	Couple.find({originType:"TV Show"}).then(couple => {
// 		response.json(couple)
// 	})
// })
//
// app.get("/api/couples/happy-ending", (request, response) => {
// 	Couple.find({ending:"Happy"}).then(couple => {
// 		response.json(couple)
// 	})
// })
//
// app.get("/api/couples/:id", (request, response, next) => {
// 	console.log("getid accionado desde backend index")
// 	Couple.findById(request.params.id)
// 		.then(couple => {
// 			if (couple) {
// 				response.json(couple)
// 			} else {
// 				response.status(404).end()
// 			}
// 		})
// 		.catch(error => next(error))
// })
//
// app.put("/api/couples/:id", (req, res) => {
// 	console.log("put o update accionado desde backend index")
// 	Couple.findByIdAndUpdate(
// 		req.params.id,
// 		{
// 			watchedByUser: req.body.watchedByUser
// 		},
// 		{ new: true },
// 		function(err, response) {
// 			if (err) {
// 				console.log("we hit an error" + err)
// 				return res.json({
// 					message: "Database Update Failure"
// 				})
// 			}
// 			return res.send(response)
// 		}
// 	)
// })


// anterior a nuevos añadidos pa new backend organisation
// console.log("request")
// console.log(request)
// console.log("response")
// console.log(response)
// const body = request.body
// if (body === undefined) {
//   return response.status(400).json({ error: "content missing" })
// }
// Couple.findById(request.params.id)
//   .then(body => {
//     response.json(body)
//   })
//   .catch(error => {
//     return next(error);
//     console.log(error)
//   })


// app.delete("/api/couples/:id", (request, response) => {
// 	Couple.findByIdAndRemove(request.params.id)
// 		.then(result => {
// 			response.status(204).end()
// 		})
// 		.catch(error => next(error))
// })
//
// app.post("/api/couples", (request, response, next) => {
// 	const body = request.body
// 	if (body === undefined) {
// 		return response.status(400).json({ error: "content missing" })
// 	}
// 	console.log("backend index create")
// 	const couple = new Couple({
// 		person1: body.person1,
// 		person2: body.person2,
// 		origin: body.origin,
// 		originType: body.originType,
// 		year: body.year,
// 		status: body.status,
// 		description: body.description,
// 		image: body.image,
// 		altImg: body.altImg,
// 		screenTime: body.screenTime,
// 		storyImportance: body.storyImportance,
// 		globalRating: body.globalRating,
// 		romanticConnection: body.romanticConnectoin,
// 		chemistry: body.chemistry,
// 		ending: body.ending,
// 		concerns: body.concerns,
// 		watchedByUser: body.watchedByUser || false,
// 		dateAdded: new Date()
// 	})
//
// 	console.log(couple)
//
// 	couple.save().then(savedCouple => {
// 		response.json(savedCouple)
// 	})
// 		.catch(error => next(error))
// })
//
// const errorHandler = (error, request, response, next) => {
// 	console.error(error.message)
//
// 	if (error.name === "CastError") {
// 		return response.status(400).send({ error: "malformatted id" })
// 	} else if (error.name === "ValidationError") {
// 		return response.status(400).json({ error: error.message
// 		})
// 	}
//
// 	next(error)
// }
//
// const unknownEndpoint = (request, response) => {
// 	response.status(404).send({ error: "unknown endpoint" })
// }

// handler of requests with unknown endpoint
// app.use(unknownEndpoint)
//
// app.use(errorHandler)
//
// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`)
// })
