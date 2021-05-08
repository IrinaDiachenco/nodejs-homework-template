const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helpers/guard')

router.post('/register', ctrl.reg)
router.post('/login', ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.post('/current', guard, ctrl.current)

module.exports = router
