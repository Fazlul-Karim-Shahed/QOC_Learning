
////////////////////////////////

// dependent to roleCheck //

////////////////////////////////


const jwt = require('jsonwebtoken')

const premiumCheck = field => {

    return async (req, res, next) => {

        try {

            if (req.user[field]) {

                if (new Date() > new Date(req.user[field].startTime) && new Date() < new Date(req.user[field].endTime)) {
                    next()
                }
                else {
                    res.send({ message: 'Premium service not activated', error: true, data: req.user })
                }

            }
            else {
                res.send({ message: 'Premium service not activated', error: true, data: req.user })
            }


        }

        catch (err) {
            res.send({ message: 'Something went wrong in checking premium', error: true, data: err.message })
        }


    }
}

module.exports.premiumCheck = premiumCheck