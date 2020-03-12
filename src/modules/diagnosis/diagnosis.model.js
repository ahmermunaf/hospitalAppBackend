const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const DiagnosisSchema = new mongoose.Schema({
    diagnose_id: {
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

DiagnosisSchema.index({
    diagnose_id: 1
})

DiagnosisSchema.plugin(autoIncrement, {
    model: 'diagnosis',
    field: 'diagnose_id',
    startAt: 1,
});

module.exports = mongoose.model('diagnosis', DiagnosisSchema, 'diagnosis');