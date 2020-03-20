const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const OperationsSchema = new mongoose.Schema({
    operation_id: {
        type: Number
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients',
        required: true
    },
    operation_theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operation_theaters',
        required: true
    },
    operation_room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operation_rooms',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    procedure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'procedures',
        required: true
    },
    diagnosis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diagnosis',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required: true
    },
    comment: {
        type: String
    }
});

OperationsSchema.index({
    operation_id: 1
})

OperationsSchema.plugin(autoIncrement, {
    model: 'operations',
    field: 'operation_id',
    startAt: 1,
});

module.exports = mongoose.model('operations', OperationsSchema, 'operations');