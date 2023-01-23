const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Couple = require('../models/couple')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate({ path: 'watchedCouples createdCouples', select: 'origin'})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  console.log("creating new user")
  const { email, name, password } = request.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return response.status(400).json({
      error: 'Username is already in use'
    })
  }

  if (password === undefined) {
    return response.status(400).json({
      error: 'Password is undefined'
    })
  }

  if (password.length <= 8) {
    return response.status(400).json({
      error: 'Password must be at least 8 characters long'
    })
  }

  if (email.length <= 4) {
    return response.status(400).json({
      error: 'Username must be at least 4 characters long'
    })
  }

  if (name.length <= 2) {
    return response.status(400).json({
      error: 'Name must be at least 2 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let createdCouples = [];
  let watchedCouples = [];

  const user = new User({
    email,
    name,
    passwordHash,
    createdCouples,
    watchedCouples
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get("/:id", (request, response, next) => {
	console.log("getid accionado desde backend index")
	User.findById(request.params.id)
		.then(user => {
			if (user) {
				response.json(user)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

module.exports = usersRouter
