const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const OperationTheaterSchema = new mongoose.Schema({
    operation_theater_id: {
        type: Number,
        default: 1
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
        unique: true
    }
});

OperationTheaterSchema.index({
    operation_theater_id: 1
})

OperationTheaterSchema.plugin(autoIncrement, {
    model: 'operation_theaters',
    field: 'operation_theater_id',
    startAt: 1,
});

module.exports = mongoose.model('operation_theaters', OperationTheaterSchema, 'operation_theaters');