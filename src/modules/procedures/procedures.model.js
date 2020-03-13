const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const ProceduresSchema = new mongoose.Schema({
    procedure_id: {
        type: Number
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

ProceduresSchema.index({
    procedure_id: 1
})

ProceduresSchema.plugin(autoIncrement, {
    model: 'procedures',
    field: 'procedure_id',
    startAt: 1,
});

module.exports = mongoose.model('procedures', ProceduresSchema, 'procedures');