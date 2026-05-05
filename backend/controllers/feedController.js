const { pool } = require('../config/db')
const rewardsQueries = require('../queries/rewardsQueries')
const feedQueries = require('../queries/feedQueries')

async function getFeed(req, res) {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const feed = await feedQueries.getFeedEvents(limit, page)
        return res.json({ feed })
    } catch (error) {
        console.error('getFeed error:', error)
        return res.status(500).json({ error: 'Erro ao buscar feed' })
    }
}

async function getLeaderboard(req, res) {
    try {
        const leaderboardRows = await rewardsQueries.getLeaderboard(10)
        const userIds = leaderboardRows.map((row) => row.user_id)

        let lastBadgeMap = {}
        if (userIds.length > 0) {
            const badgeResult = await pool.query(
                `SELECT DISTINCT ON (ub.user_id) ub.user_id, b.name AS last_badge_title
                 FROM user_badges ub
                 JOIN badges b ON b.id = ub.badge_id
                 WHERE ub.user_id = ANY($1)
                 ORDER BY ub.user_id, ub.unlocked_at DESC`,
                [userIds],
            )
            lastBadgeMap = badgeResult.rows.reduce((acc, item) => {
                acc[item.user_id] = item.last_badge_title || 'Sem selos ainda'
                return acc
            }, {})
        }

        const leaderboard = leaderboardRows.map((item, index) => ({
            rank: index + 1,
            userId: item.user_id?.toString?.() ?? String(index + 1),
            name: item.name ?? 'Usuário',
            score: Number(item.total_points ?? 0),
            lastBadgeTitle: lastBadgeMap[item.user_id] || 'Sem selos ainda',
        }))

        return res.json({ leaderboard })
    } catch (error) {
        console.error('getFeedLeaderboard error:', error)
        return res.status(500).json({ error: 'Erro ao buscar leaderboard' })
    }
}

async function getOnlineUsers(req, res) {
    try {
        const result = await pool.query(
            `SELECT id, name FROM users ORDER BY created_at DESC LIMIT 20`,
        )

        const users = result.rows.map((row) => ({
            userId: row.id?.toString?.() ?? '',
            name: row.name,
        }))

        return res.json({ users, count: users.length })
    } catch (error) {
        console.error('getOnlineUsers error:', error)
        return res.status(500).json({ error: 'Erro ao buscar usuários online' })
    }
}

module.exports = {
    getFeed,
    getLeaderboard,
    getOnlineUsers,
}
