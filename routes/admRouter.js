const express = require('express')
const router = express.Router()
const {jwtcheck} = require('../helper/jwtcheck')

const admController = require('../controller/admController')

router.get('/data',jwtcheck, admController.data)

router.get('/databases',jwtcheck, admController.databases)

router.get('/documents/:database',jwtcheck, admController.documents)


module.exports = router