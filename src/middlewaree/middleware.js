let validateAppType = function (req, res, next) {
    let appTypeHeader = req.headers["isfreeapp"]
    if (!appTypeHeader) {
        res.send({ message: 'Missing mandatory header' })
    }
    if (appTypeHeader === 'false') {
        isAppFree = false
    } else {
        isAppFree = true
    }
    next()
}

module.exports.validateAppType = validateAppType