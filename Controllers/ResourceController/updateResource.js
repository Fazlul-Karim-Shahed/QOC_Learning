
const fs = require('fs')
const { ResourceModel } = require('../../Models/ResourceModel')
const _ = require('lodash')
const { IncomingForm, formidable } = require('formidable')
const { cleanObject } = require('../cleanObject')


const updateResource = async (req, res) => {

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

                    let x = new Promise(resolve => {

                        fs.readFile(files['attachment'][0].filepath, (err, data) => {

                            resolve({
                                data: data,
                                contentType: files['attachment'][0].mimetype,
                                name: files['attachment'][0].originalFilename,
                            })

                        })
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


module.exports.updateResource = updateResource

