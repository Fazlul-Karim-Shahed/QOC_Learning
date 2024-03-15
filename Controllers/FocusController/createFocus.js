
const fs = require('fs')
const { FocusModel } = require('../../Models/FocusModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { cleanObject } = require('../cleanObject')


const createFocus = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Focus upload failed', error: true })
        }

        else {

            let focusObj = {}

            for (let i in fields) {

                focusObj[i] = fields[i][0]

            }

            let focus = new FocusModel(cleanObject(focusObj))

            if (files && Object.keys(files).length !== 0) {

                if (files['attachment'] && files['attachment'].length > 0) {

                    if (files['attachment'][0].size > 15 * 1024 * 1024) { // 15 mb
                        return res.send({ message: 'Size must me less than 15 mb', error: true })
                    }

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


                        focus['attachment'] = data

                        focus.save().then(data => {

                            res.send({ message: 'focus created successfully', error: false, value: data });
                        }).catch(err => {

                            res.send({ message: 'focus creation failed', error: true, value: err.message });
                        })

                    })

                }
            }
            else {

                focus.save().then(data => {

                    res.send({ message: 'focus created successfully', error: false, value: data });

                }).catch(err => {

                    res.send({ message: 'focus creation failed', error: true, value: err.message });
                })

            }

        }


    })


}


module.exports.createFocus = createFocus

