const Patient = require('./patients.model')
const { sendResponse, uploadImage } = require('./../../services')

const get = async (req, res) => {
    try {
        let data = await Patient.find(req.query).exec()
        sendResponse(res, false, data)
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const create = async (req, res) => {
    let { name, mobile_number, email, notes = '' } = req.body
    try {
        if (name && mobile_number && email && req.files && req.files.iqama_image && req.files.insurance_image) {
            let iqama_image = await uploadImage(req.files.iqama_image)
            let insurance_image = await uploadImage(req.files.insurance_image)
            let lastData = await Patient.findOne({}).sort({ _id: -1 }).lean().exec()
            let mrn = lastData ? (Number(lastData.mrn) + 1) : 7000001
            await Patient.create({ name, mobile_number, email, iqama_image, insurance_image, notes, mrn })
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let { id, name, mobile_number, email, notes = '' } = req.body
    try {
        if (id && name && mobile_number && email) {
            let obj = {
                name,
                mobile_number,
                email,
                notes
            }

            if (req.files && req.files.iqama_image) {
                obj['iqama_image'] = await uploadImage(req.files.iqama_image)
            }

            if (req.files && req.files.insurance_image) {
                obj['insurance_image'] = await uploadImage(req.files.insurance_image)
            }

            await Patient.updateOne({ _id: id }, obj).exec()
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}
const lastId = async (req, res) => {
    try {
        let data = await Patient
            .findOne({})
            .sort({ _id: -1 })
            .lean()
            .exec()
        sendResponse(res, false, [{ id: Number(data.patient_id) + 1 }])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}


module.exports = {
    get,
    create,
    update,
    lastId
}
