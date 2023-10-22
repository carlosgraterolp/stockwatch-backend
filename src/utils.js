let utils = {}

utils.getTodaysDate = () => {
    let ts = Date.now()
    let date_ob = new Date(ts)

    return (
        date_ob.getFullYear() +
        '-' +
        (date_ob.getMonth() + 1) +
        '-' +
        date_ob.getDate()
    )
}

module.exports = utils
