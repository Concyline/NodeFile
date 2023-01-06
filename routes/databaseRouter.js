const express = require('express')
const router = express.Router()
const { jwtcheck } = require('../helper/jwtcheck')

const databaseController = require('../controller/databaseController')


router.get('/:database/:document', jwtcheck, databaseController.get)

router.get('/:database/:document/:atrib/:value',jwtcheck, databaseController.find)

router.post('/:database/:document',jwtcheck, databaseController.post)

router.put('/:database/:document',jwtcheck, databaseController.put)

router.delete('/:database/:document',jwtcheck, databaseController.delete)

router.delete('/deleteall/:database/:document',jwtcheck, databaseController.deleteAll)



module.exports = router

