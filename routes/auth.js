const router = require('express').Router()
const User = require('../models/User')
const path = require('path')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({
		email: req.body.email,
		password: hashedPassword,
		name: req.body.name,
	})

	try {
		const newUser = await user.save()
		res.send(`<h1>Hola ${req.body.name} 🎉!!</h1>`)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../login/Formulario/index.html'))
})

module.exports = router
