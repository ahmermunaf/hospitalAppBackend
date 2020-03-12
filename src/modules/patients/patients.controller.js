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
    let { mrn, name, mobile_number, email, notes = '' } = req.body
    try {
        if (mrn && name && mobile_number && email && req.files && req.files.iqama_image && req.files.insurance_image) {
            let iqama_image = await uploadImage(req.files.iqama_image)
            let insurance_image = await uploadImage(req.files.insurance_image)
            await Patient.create({ mrn, name, mobile_number, email, iqama_image, insurance_image, notes })
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let { id, mrn, name, mobile_number, email, notes = '' } = req.body
    try {
        if (id && mrn && name && mobile_number && email) {
            let obj = {
                mrn,
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

module.exports = {
    get,
    create,
    update
}