const express = require('express')
const router = new express.Router()

router.get('/stocks', async (req, res) => {
    try {
        res.send('Hello, World!')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router