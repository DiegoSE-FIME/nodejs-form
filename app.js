const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config()
// connect to mongoDB
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
	console.log('MongoDB connected')
})

// import routes
const authRoute = require('./routes/auth')

// route middleware
app.use('/api/user', authRoute)

// middlewares
app.use(express.json())
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
