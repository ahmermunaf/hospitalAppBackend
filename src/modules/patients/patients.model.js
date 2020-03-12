const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix');

const PatientsSchema = new mongoose.Schema({
    patient_id: {
        type: Number,
        default: 1
    },
    mrn: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    iqama_image: {
        type: String,
        required: true
    },
    insurance_image: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
});

PatientsSchema.index({
    patient_id: 1
})

PatientsSchema.plugin(autoIncrement, {
    model: 'patients',
    field: 'patient_id',
    startAt: 1,
});

module.exports = mongoose.model('patients', PatientsSchema, 'patients');