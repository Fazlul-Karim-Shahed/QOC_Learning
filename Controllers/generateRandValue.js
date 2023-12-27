


const generateRandValue = async (totalArray, finalArray) => {

    let randId = await totalArray[Math.floor(Math.random() * totalArray.length)]._id
    if (finalArray.includes(randId, 0)) {
        generateRandValue(totalArray)
    }
    else return randId

}


exports.generateRandValue = generateRandValue