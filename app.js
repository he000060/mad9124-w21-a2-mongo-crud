// Don't forget to use NPM to install Express and Mongoose.

import morgan from 'morgan'
import express from 'express'
import sanitizeMongo from 'express-mongo-sanitize'
import studentRouter from './routes/Student.js'
import courseRouter from './routes/Courses.js'

import connectDatabase from './startup/connectDatabase.js'
connectDatabase()

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())


//routes 

app.use('/api/student', studentRouter)
app.use('api/courses',courseRouter)


export default app