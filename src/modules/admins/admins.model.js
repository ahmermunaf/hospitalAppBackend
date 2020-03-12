const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const AdminsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },
    admin_id: {
        type: Number,
        default: 1
    },
    email_address: {
        type: String,
        validate: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    profile_image: {
        type: String
    }
});

AdminsSchema.index({
    admin_id: 1
})

AdminsSchema.plugin(autoIncrement, {
    model: 'admins',
    field: 'admin_id',
    startAt: 1,
});

module.exports = mongoose.model('admins', AdminsSchema, 'admins');