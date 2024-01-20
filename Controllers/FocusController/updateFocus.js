
const fs = require('fs')
const { FocusModel } = require('../../Models/FocusModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { cleanObject } = require('../cleanObject')


const updateFocus = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    let updatedFocus = await FocusModel.findOne({ _id: req.params.focusId })

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Focus upload failed', error: true })
        }

        else {

            let focusObj = {}

            for (let i in fields) {

                focusObj[i] = fields[i][0]

            }

            Object.assign(updatedFocus, cleanObject(focusObj));

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


                        updatedFocus['attachment'] = data

                        updatedFocus.save().then(data => {

                            res.send({ message: 'focus updated successfully', error: false, value: data });
                        }).catch(err => {

                            res.send({ message: 'focus update failed', error: true, value: err.message });
                        })

                    })

                }
            }
            else {

                updatedFocus.save().then(data => {

                    res.send({ message: 'focus updated successfully', error: false, value: data });
                }).catch(err => {

                    res.send({ message: 'focus update failed', error: true, value: err.message });
                })



            }

        }


    })


}


module.exports.updateFocus = updateFocus

