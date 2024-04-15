
const fs = require('fs')
const { ResourceModel } = require('../../Models/ResourceModel')
const _ = require('lodash')
const { IncomingForm, formidable } = require('formidable')
const { cleanObject } = require('../cleanObject')
const path = require('path')


const updateResource = async (req, res, next) => {

    try {
        let form = formidable({ maxFileSize: 5000 * 1024 * 1024 })
        form.keepExtensions = true

        let updatedResource = await ResourceModel.findOne({ _id: req.params.resourceId })

        form.parse(req, (err, fields, files) => {

            if (err) {
                res.send({ message: 'Resource update failed', error: true, data: err.message })
            }

            else {

                let resourceObj = {}

                for (let i in fields) {

                    resourceObj[i] = fields[i][0]

                }

                Object.assign(updatedResource, cleanObject(resourceObj));

                if (files && Object.keys(files).length != 0) {

                    if (files['attachment'] && files['attachment'].length > 0) {

                        fs.unlink(path.join(process.cwd(), "uploads", updatedResource['attachment'].name), () => {
                            console.log('File deleted successfully');
                        })

                        let x = new Promise(resolve => {

                            // const prefix = new Date().getTime() * Math.random()
                            const prefix = ""
                            const tempPath = files['attachment'][0].filepath;
                            const destinationPath = path.join(process.cwd(), "uploads", prefix + files['attachment'][0].originalFilename);

                            fs.copyFile(tempPath, destinationPath, (err) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                                }
                                resolve({
                                    contentType: files['attachment'][0].mimetype,
                                    name: prefix + files['attachment'][0].originalFilename,
                                })

                            });
                        })


                        x.then(data => {


                            updatedResource['attachment'] = data

                            updatedResource.save().then(data => {

                                res.send({ message: 'resource updated successfully', error: false, value: data });
                            }).catch(err => {

                                res.send({ message: 'resource update failed', error: true, value: err.message });
                            })

                        })

                    }
                }
                else {

                    updatedResource.save().then(data => {

                        res.send({ message: 'resource updated successfully', error: false, value: data });
                    }).catch(err => {

                        res.send({ message: 'resource update failed', error: true, value: err.message });
                    })



                }

            }


        })

    }

    catch (err) {
        next(err)
    }

}


module.exports.updateResource = updateResource

