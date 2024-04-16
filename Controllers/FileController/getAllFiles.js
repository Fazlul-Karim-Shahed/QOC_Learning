

const { CurriculumModel } = require("../../Models/CurriculumModel")
const fs = require('fs')
const path = require('path')
const { SubjectModel } = require("../../Models/SubjectModel")
const { ChapterModel } = require("../../Models/ChapterModel")
const { ModuleModel } = require("../../Models/ModuleModel")

const getAllFiles = async (req, res) => {

    let filesInDatabase = []
    let allFiles = []

    await fs.readdir(path.join(process.cwd(), "uploads"), (err, files) => {
        if (!err) {
            files.map(file => allFiles.push(file))
        }
    })



    await CurriculumModel.find({}).then(data => {
        data.map(item => {
            item.outlines.map(file => {
                filesInDatabase.push(file.name)
            })
        })

    })

    await SubjectModel.find({}).then(data => {
        data.map(item => {
            item.outlines.map(file => {
                filesInDatabase.push(file.name)
            })

            item.materials.map(file => {
                filesInDatabase.push(file.name)
            })
        })

    })

    await ChapterModel.find({}).then(data => {
        data.map(item => {
            item.materials.map(file => {
                filesInDatabase.push(file.name)
            })
        })

    })

    await ModuleModel.find({}).then(data => {
        data.map(item => {
            item.materials.map(file => {
                filesInDatabase.push(file.name)
            })
        })

    })




    res.send({ message: 'All files in database', error: false, data: { filesInDatabase, allFiles } })




}

module.exports.getAllFiles = getAllFiles
