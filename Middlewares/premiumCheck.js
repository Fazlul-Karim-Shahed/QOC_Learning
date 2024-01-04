
////////////////////////////////

// dependent to roleCheck //

////////////////////////////////


const jwt = require('jsonwebtoken')

const premiumCheck = field => {

    return async (req, res, next) => {

        try {

            // let data = await StudentModel({ _id: req.body.studentId })
            // console.log(req.user[field])
            // console.log(!req.user.assignment)
            if (req.user[field]) {

                if (new Date() > new Date(req.user[field].startTime) && new Date() < new Date(req.user[field].endTime)) {
                    next()
                }
                else {
                    res.send({ message: 'Assignment premium service not activated 1', error: true, data: req.user })
                }

            }
            else {
                res.send({ message: 'Assignment premium service not activated 2', error: true, data: req.user })
            }


        }

        catch (err) {
            res.send({ message: 'Something went wrong in checking premium', error: true, data: err.message })
        }


    }
}

module.exports.premiumCheck = premiumCheck