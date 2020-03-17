const Operation = require('./operations.model')
const { sendResponse } = require('./../../services')

const get = async (req, res) => {
    try {
        let data = await Operation
            .find(req.query)
            .populate({
                path: 'patient'
            })
            .populate({
                path: 'operation_theater'
            })
            .populate({
                path: 'operation_room'
            })
            .populate({
                path: 'procedure'
            })
            .populate({
                path: 'diagnosis'
            })
            .exec()
        sendResponse(res, false, data)
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const create = async (req, res) => {
    let {
        patient,
        operation_theater,
        operation_room,
        date,
        time,
        procedure,
        diagnosis,
        comment
    } = req.body
    try {
        await Operation.create({
            patient,
            operation_theater,
            operation_room,
            date: new Date(date),
            time: new Date(time),
            procedure, diagnosis,
            comment
        })
        sendResponse(res, false, [])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let {
        id,
        patient,
        operation_theater,
        operation_room,
        date,
        time,
        procedure,
        diagnosis,
        comment
    } = req.body
    try {
        if (id && patient && operation_theater && operation_room && date && time && procedure && diagnosis && comment) {
            await Operation.updateOne({
                _id: id
            }, {
                patient,
                operation_theater,
                operation_room,
                date: new Date(date),
                time: new Date(time),
                procedure,
                diagnosis,
                comment
            }).exec()
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided.')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

module.exports = {
    get,
    create,
    update
}