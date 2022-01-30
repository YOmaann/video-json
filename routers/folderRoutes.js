const express = require('express')

const controller = require('../controllers/folderController')

const router = express.Router()

router.use(controller.checkDir,controller.getDirInfo, controller.serve)
module.exports = router