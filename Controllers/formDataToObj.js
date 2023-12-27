

const formDataToObj = (fields) => {
    let chapterObj = {}

    for (let i in fields) {

        chapterObj[i] = fields[i][0]

    }

    return chapterObj
}

module.exports.formDataToObj = formDataToObj