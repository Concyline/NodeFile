require('dotenv').config()

const express = require('express')
const app = express()


const bodyParser = require('body-parser')
const databaseRouter = require('./routes/databaseRouter')
const userRouter = require('./routes/userRouter')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('./'));


app.use('/storage', databaseRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Rodando na porta ${PORT}`))