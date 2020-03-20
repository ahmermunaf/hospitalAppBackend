const Admin = require('./admins.model')
const { sendResponse } = require('./../../services')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const get = async (req, res) => {
    try {
        let data = await Admin.find({ ...req.query, status: 'active' }, '-password').exec()
        sendResponse(res, false, data)
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const create = async (req, res) => {
    let { full_name, type, email_address, password } = req.body
    try {
        password = md5(password)
        await Admin.create({ full_name, type, email_address, password })
        sendResponse(res, false, [])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const update = async (req, res) => {
    let { full_name, type, email_address, password, id } = req.body
    try {
        if (full_name && type && email_address && password && id) {
            password = md5(password)
            await Admin.updateOne({ _id: id }, { full_name, type, email_address, password }).exec()
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided.')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const remove = async (req, res) => {
    let { id } = req.body
    try {
        if (id) {
            await Admin.updateOne({ _id: id }, { status: 'deactive' }).exec()
            sendResponse(res, false, [])
        } else {
            throw new Error('Data not provided.')
        }
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const checkAuth = async (req, res) => {
    try {
        let { admin } = req
        sendResponse(res, false, [admin])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

const login = async (req, res) => {
    let { email_address, password } = req.body
    try {
        password = md5(password)
        let data = await Admin.findOne({ email_address, password })
            .lean()
            .exec()

        if (!data) {
            throw new Error('Incorrect email address or password.')
        }

        let access_token = jwt.sign({ _id: data._id }, process.env.JWT_KEY)
        sendResponse(res, false, [{ ...data, access_token }])
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}

module.exports = {
    get,
    create,
    update,
    remove,
    checkAuth,
    login
}