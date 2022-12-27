const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('./'));

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/object', (req, res) => {

    res.status(200).send(db.read())

})

app.get('/object/:atrib/:value', (req, res) => {

    const atrib = req.params.atrib
    const value = req.params.value

    res.status(200).send(db.find(atrib, value))

})

app.post('/object', (req, res) => {

    const body = req.body
    res.status(200).send(db.post(body))

})

app.put('/object', (req, res) => {

    const body = req.body

    res.status(200).send(db.put(body))

})

app.delete('/object', (req, res) => {

    const body = req.body

    res.status(200).send(db.delete(body))

})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Rodando na porta ${PORT}`))