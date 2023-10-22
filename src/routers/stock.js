const express = require('express')
const axios = require('axios')
const router = new express.Router()
const token = process.env.API_TOKEN
const utils = require('../utils')

router.get('/stocks', async (req, res) => {
    try {
        const {
            data: { results: headers },
        } = await axios.get('https://api.polygon.io/v3/reference/tickers', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                type: 'CS',
                market: 'stocks',
            },
        })

        let tickers = headers.map((t) => {
            return {
                ticker: t.ticker,
                name: t.name,
                market: t.market,
                locale: t.locale,
                primaryExchange: t.primary_exchange,
            }
        })

        const {
            data: { results: prices },
        } = await axios.get(
            `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${utils.getLastTradingDay()}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        tickers.forEach((t, index, object) => {
            let priceFound = prices.find((price) => price.T == t.ticker)

            // If price is not found, remove element and continue with the next one
            if (priceFound == undefined) {
                object.splice(index, 1)
                return
            }

            t.prices = {
                open: priceFound.o,
                current:
                    Math.round(
                        priceFound.o * (1 + utils.getRandomPriceChange()) * 100
                    ) / 100,
            }
        })

        res.status(200).send(tickers)
    } catch (e) {
        console.error('Error in GET /stocks endpoint: ', e)
        res.status(500).send()
    }
})

router.get('*', (req, res) => {
    res.status(404).send('Requested endpoint not found.')
})

module.exports = router
