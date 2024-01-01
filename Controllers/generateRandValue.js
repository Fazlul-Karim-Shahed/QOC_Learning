


const generateRandValue = (totalArray, finalArray) => {

    console.log(finalArray)
    let randId = totalArray[Math.floor(Math.random() * totalArray.length)]._id
    if (finalArray.includes(randId, 0)) {
        generateRandValue(totalArray)
    }
    else {

        return randId

    }
}


exports.generateRandValue = generateRandValue