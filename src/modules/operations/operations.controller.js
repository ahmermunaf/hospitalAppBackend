const Operation = require('./operations.model')
const { sendResponse } = require('./../../services')

const get = async (req, res) => {
    try {
        let { filter, from_date, to_date } = req.query

        delete req.query.filter
        delete req.query.from_date
        delete req.query.to_date

        let query = filter ? {
            data: { $lte: new Date(to_date), $gte: new Date(from_date) },
            ...req.query
        } : req.query
        let data = await Operation
            .find(query)
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
            .populate({
                path: 'created_by',
                select: '-password -type'
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
    let { admin } = req
    try {
        await Operation.create({
            patient,
            operation_theater,
            operation_room,
            date: new Date(date),
            time: new Date(time),
            procedure, diagnosis,
            comment,
            created_by: admin._id
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