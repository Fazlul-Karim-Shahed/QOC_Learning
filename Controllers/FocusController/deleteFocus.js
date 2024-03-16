

const { FocusModel } = require('../../Models/FocusModel')

const deleteFocus = async (req, res) => {

    let focus = await FocusModel.deleteOne({_id: req.params.focusId})

    if (focus) {

        res.status(200).send({ message: 'Focus Deleted', error: false, data: focus })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }

}

module.exports.deleteFocus = deleteFocus
