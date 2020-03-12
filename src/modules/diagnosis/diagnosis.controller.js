const Diagnosis = require('./diagnosis.model')
const { sendResponse } = require('./../../services')

const get = async (req, res) => {
    try {
        let data = await Diagnosis.find(req.query).exec()
        sendResponse(res, false, data)
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const create = async (req, res) => {
    let { name, code } = req.body
    try {
        await Diagnosis.create({ name, code })
        sendResponse(res, false, [])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let { name, code, id } = req.body
    try {
        if (name && code && id) {
            await Diagnosis.updateOne({ _id: id }, { name, code }).exec()
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