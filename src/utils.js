const { DateTime } = require('luxon')
let utils = {}

utils.getLastTradingDay = () => {
    const now = DateTime.now()
    let lastTradingDay = now.minus({ days: 1 }) // By default get yesterday's date

    if (lastTradingDay.weekday == 0) {
        // If yesterday was Sunday, then get last Friday's date
        lastTradingDay = lastTradingDay.minus({ days: 2 })
    } else if (lastTradingDay.weekday == 6) {
        // If yesterday was Saturday, then get last Friday's date as well
        lastTradingDay = lastTradingDay.minus({ days: 1 })
    }

    return lastTradingDay.toFormat('yyyy-LL-dd')
}

utils.getRandomPriceChange = () => {
    let min = -0.1
    let max = 0.1
    return Math.random() * (max - min) + min
}

module.exports = utils
