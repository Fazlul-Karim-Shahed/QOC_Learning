

const checkTeacherPremium = async (req, res) => {

    res.send({ message: 'Your batch service is Premium', error: false })

}

module.exports.checkTeacherPremium = checkTeacherPremium
