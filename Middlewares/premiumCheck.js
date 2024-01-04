
////////////////////////////////

// dependent to roleCheck //

////////////////////////////////


const jwt = require('jsonwebtoken')

const premiumCheck = field => {

    return async (req, res, next) => {

        try {

            // let data = await StudentModel({ _id: req.body.studentId })

            if (req.user.hasOwnProperty(field)) {

                if (new Date() > new Date(req.user.field.startTime) && new Date() < new Date(req.user.field.endTime)) {
                    next()
                }
                else {
                    res.send({ message: 'Assignment premium service not activated', error: true })
                }

            }
            else {
                res.send({ message: 'Assignment premium service not activated', error: true })
            }


        }

        catch (err) {
            res.send({ message: 'Something went wrong in checking premium', error: true, data: err.message })
        }


    }
}

module.exports.premiumCheck = premiumCheck