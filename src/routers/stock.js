const express = require('express')
const axios = require('axios')
const router = new express.Router()
const token = process.env['API_TOKEN']
const utils = require('../utils')

router.get('/stocks', async (req, res) => {
    try {
        const { data } = await axios.get(
            'https://api.polygon.io/v3/reference/tickers',
            {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    type: 'CS',
                    market: 'stocks',
                    limit: 1,
                },
            }
        )

        const completeTickers = data.results

        let tickerHeaders = completeTickers.map((t) => {
            return {
                ticker: t.ticker,
                name: t.name,
                market: t.market,
                locale: t.locale,
                primary_exchange: t.primary_exchange,
            }
        })

        tickers = tickerHeaders.map((t) => {
            tickerString = t.ticker
            todayString = utils.getTodayString()

            // const { data } = await axios.get(`https://api.polygon.io/v1/open-close/${tickerString}/${todayString}`, {
            //     headers: {'Authorization': `Bearer ${token}`}
            // });

            // TODO: Remove dummy data
            let data = {
                preMarket: 1,
                open: 1,
            }

            t.priceData = {
                preMarket: data.preMarket,
                open: data.open,
            }

            return t
        })

        console.log(tickers)

        res.status(200).send(tickers)
    } catch (e) {
        console.error('Error in GET /stocks Endpoint: ', e)
        res.status(500).send()
    }
})

router.get('*', (req, res) => {
    res.status(404).send('Requested endpoint not found.')
})

module.exports = router
