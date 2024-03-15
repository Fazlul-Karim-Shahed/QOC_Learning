
const fs = require('fs')
const { ResourceModel } = require('../../Models/ResourceModel')
const _ = require('lodash')
const { IncomingForm, formidable } = require('formidable')
const { cleanObject } = require('../cleanObject')


const createResource = async (req, res) => {

    let form = formidable({maxFileSize: 500 * 1024 * 1024})
    form.keepExtensions = true


    form.parse(req, (err, fields, files) => {

        if (err) {
            console.log(err)
            res.send({ message: 'Resource upload failed', error: true, data: err.message })
        }

        else {

            let resourceObj = {}

            for (let i in fields) {

                resourceObj[i] = fields[i][0]

            }

            let resource = new ResourceModel(cleanObject(resourceObj))

            if (files && Object.keys(files).length !== 0) {

                if (files['attachment'] && files['attachment'].length > 0) {

                    if (files['attachment'][0].size > 15 * 1024 * 1024) { // 15 mb
                        return res.send({ message: 'Size must me less than 15 mb', error: true })
                    }

                    let x = new Promise(resolve => {

                        fs.readFile(files['attachment'][0].filepath, (err, data) => {

                            if (err) {
                                console.log(err)
                                res.send({ message: 'Resource upload failed', error: true, data: err.message })
                            }

                            resolve({
                                data: data,
                                contentType: files['attachment'][0].mimetype,
                                name: files['attachment'][0].originalFilename,
                            })

                        })
                    })


                    x.then(data => {


                        resource['attachment'] = data

                        resource.save().then(data => {

                            res.send({ message: 'resource created successfully', error: false, value: data });
                        }).catch(err => {

                            res.send({ message: 'resource creation failed', error: true, value: err.message });
                        })

                    })

                }
            }
            else {

                resource.save().then(data => {

                    res.send({ message: 'resource created successfully', error: false, value: data });

                }).catch(err => {

                    res.send({ message: 'resource creation failed', error: true, value: err.message });
                })

            }

        }


    })


}


module.exports.createResource = createResource

