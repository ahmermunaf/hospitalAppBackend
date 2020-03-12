const OperationRoom = require('./operationRooms.model')
const { sendResponse } = require('./../../services')

const get = async (req, res) => {
    try {
        let data = await OperationRoom.find(req.query).exec()
        sendResponse(res, false, data)
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const create = async (req, res) => {
    let { name, operation_theater, room_no } = req.body
    try {
        if (name && operation_theater && room_no) {
            await OperationRoom.create({ name, operation_theater, room_no })
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided.')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let { id, name, operation_theater, room_no } = req.body
    try {
        if (name && operation_theater && room_no && id) {
            await OperationRoom.updateOne({ _id: id }, { name, operation_theater, room_no }).exec()
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