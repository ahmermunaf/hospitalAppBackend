const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const OperationRoomsSchema = new mongoose.Schema({
    operation_room_id: {
        type: Number
    },
    operation_theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operatios_theaters',
        required: true
    },
    room_no: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

OperationRoomsSchema.index({
    operation_room_id: 1
})

OperationRoomsSchema.plugin(autoIncrement, {
    model: 'operation_rooms',
    field: 'operation_room_id',
    startAt: 1,
});

module.exports = mongoose.model('operation_rooms', OperationRoomsSchema, 'operation_rooms');