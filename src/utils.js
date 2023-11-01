const { DateTime } = require("luxon")
let utils = {}

utils.getLastTradingDay = () => {
    let now = DateTime.now().setZone("America/New_York")
    let lastTradingDay = now.minus({ days: 1 }) // By default get yesterday's date

    console.log("Current Zone: ", now.zoneName)

    if (lastTradingDay.weekday == 0) {
        // If yesterday was Sunday, then get last Friday's date
        lastTradingDay = lastTradingDay.minus({ days: 2 })
    } else if (lastTradingDay.weekday == 6) {
        // If yesterday was Saturday, then get last Friday's date as well
        lastTradingDay = lastTradingDay.minus({ days: 1 })
    }

    console.log("Todays Date: ", now.toISO())
    console.log(
        "Last Trading Date Obtained: ",
        lastTradingDay.toFormat("yyyy-LL-dd")
    )

    return lastTradingDay.toFormat("yyyy-LL-dd")
}

utils.getRandomPriceChange = () => {
    let min = -0.1
    let max = 0.1
    return Math.random() * (max - min) + min
}

module.exports = utils
