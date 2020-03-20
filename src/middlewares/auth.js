const jwt = require('jsonwebtoken')
const Admin = require('./../modules/admins/admins.model')
const { sendResponse } = require('./../services')

const auth = async (req, res, next) => {
    if (req.path.search('login') !== -1) {
        next()
        return
    }

    try {
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : ''
        const data = jwt.verify(token, process.env.JWT_KEY)
        const token_doc = await Admin
            .findOne({ _id: data._id, status: 'active' })
            .lean()
            .exec()
        if (!token_doc) {
            throw new Error("Session not found")
        }
        req.admin = token_doc
        req.token = token
        next()
    } catch (error) {
        sendResponse(res, true, [error.message])
    }
}
module.exports = auth