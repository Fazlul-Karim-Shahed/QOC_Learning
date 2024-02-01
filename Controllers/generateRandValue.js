const { default: mongoose } = require("mongoose")


const generateRandValue = (totalArray, finalArray) => {

    console.log(finalArray)
    let randId = totalArray[Math.floor(Math.random() * totalArray.length)]._id
    if (finalArray.includes(new mongoose.Types.ObjectId(randId))) {
        generateRandValue(totalArray)
    }
    else {

        return randId

    }
}


exports.generateRandValue = generateRandValue