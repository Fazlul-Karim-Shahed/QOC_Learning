
const fs = require('fs')
const { ModuleModel } = require('../../Models/ModuleModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const createModule = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Module upload failed', error: true })
        }
        
        else {

            let moduleObj = {}

            for (let i in fields) {

                moduleObj[i] = fields[i][0]

            }

            let module = new ModuleModel(moduleObj)

            if (files && Object.keys(files).length !== 0) {

                let arr = []

                if (files['materials[]'] && files['materials[]'].length > 0) {

                    for (let i in files['materials[]']) {

                        let x = new Promise(resolve => {

                            fs.readFile(files['materials[]'][i].filepath, (err, data) => {

                                resolve({
                                    data: data,
                                    contentType: files['materials[]'][i].mimetype,
                                    name: files['materials[]'][i].originalFilename,
                                })

                            })
                        })

                        arr.push(x)
                    }
                }


                Promise.all(arr).then(arr => {


                    module['materials'] = [...arr]

                    module.save().then(data => {

                        res.send({ message: 'module created successfully', error: false, value: data });
                    }).catch(err => {

                        res.send({ message: 'module creation failed', error: true, value: err.message });
                    })



                })

            }
            else {

                module.save().then(data => {

                    res.send({ message: 'module created successfully', error: false, value: data });

                }).catch(err => {

                    res.send({ message: 'module creation failed', error: true, value: err.message });
                })

            }

        }


    })


}


module.exports.createModule = createModule

