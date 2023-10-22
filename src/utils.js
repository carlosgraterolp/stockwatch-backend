let utils = {}

utils.getLastTradingDay = () => {
    let dateObject = new Date(Date.now())
    let dayOfWeek = dateObject.getDay()
    let dateString = ''

    if (dayOfWeek == 0) {
        // If today is Sunday, then get last Friday's date
        dateString =
            dateObject.getFullYear() +
            '-' +
            (dateObject.getMonth() + 1) +
            '-' +
            (dateObject.getDate() - 2)
    } else if (dayOfWeek == 1) {
        // If today is Monday, then get last Friday's date as well since Poligon's Basic Plan cannot provide today's data
        dateString =
            dateObject.getFullYear() +
            '-' +
            (dateObject.getMonth() + 1) +
            '-' +
            (dateObject.getDate() - 3)
    } else {
        // For any other day, then get yesterday's date to comply with the same limitation
        dateString =
            dateObject.getFullYear() +
            '-' +
            (dateObject.getMonth() + 1) +
            '-' +
            (dateObject.getDate() - 1)
    }

    return dateString
}

utils.getRandomPriceChange = () => {
    let min = -0.1
    let max = 0.1
    return Math.random() * (max - min) + min
}

module.exports = utils
