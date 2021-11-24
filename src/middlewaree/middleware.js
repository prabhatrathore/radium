const jwt = require("jsonwebtoken")
const authenticate = function (req, res, next) {
    try {
        let token = req.headers['x-auth-token'];
        if (!token) {
            res
                .status(401)
                .send({ status: false, message: 'mandatory authentication header missing' })
        } else {
            let decodedToken = jwt.verify(token, 'titanium1245')
            if (decodedToken) {
                next();
            } else {
                res
                    .status(401)
                    .send({ status: false, message: 'authentication token is invalid' });

            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.authenticate = authenticate