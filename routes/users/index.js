const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/upload-avatar')

router.post('/register', ctrl.reg)
router.post('/login', ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.post('/current', guard, ctrl.current)
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrl.updateAvatar,
)

router.get('/verify/:token', ctrl.verify)
router.post('/verify', ctrl.repeatEmailVerify)

module.exports = router
