
const fs = require('fs')
const { ModuleModel } = require('../../Models/ModuleModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const path = require('path')


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

                            const prefix = new Date().getTime() * Math.random()
                            const tempPath = files['materials[]'][i].filepath;
                            const destinationPath = path.join(process.cwd(), "uploads", prefix + files['materials[]'][i].originalFilename);

                            fs.copyFile(tempPath, destinationPath, (err) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                                }
                                resolve({
                                    contentType: files['materials[]'][i].mimetype,
                                    name: prefix + files['materials[]'][i].originalFilename,
                                })

                            });
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

