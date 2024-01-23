
const fs = require('fs')
const { ResourceModel } = require('../../Models/ResourceModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { cleanObject } = require('../cleanObject')


const createResource = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Resource upload failed', error: true })
        }

        else {

            let resourceObj = {}

            for (let i in fields) {

                resourceObj[i] = fields[i][0]

            }

            let resource = new ResourceModel(cleanObject(resourceObj))

            if (files && Object.keys(files).length !== 0) {

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

