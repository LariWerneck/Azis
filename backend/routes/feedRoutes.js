const express = require('express')
const { verifyToken, requireLevel } = require('../middlewares/authMiddleware')
const feedController = require('../controllers/feedController')

const router = express.Router()

router.use(verifyToken)

router.get('/', requireLevel(1), feedController.getFeed)
router.get('/leaderboard', requireLevel(1), feedController.getLeaderboard)
router.get('/online', requireLevel(1), feedController.getOnlineUsers)

module.exports = router
