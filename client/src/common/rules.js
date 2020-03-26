import React from "react";

const emailRule = [
    {
        type: 'email',
        message: 'The input is not valid Email!',
    },
    {
        required: true,
        message: 'Please input your Email!',
    },
];
const numberRule = [
    {
        required: true,
        message: 'Please enter mobile number!',
    },
];
const nameRule = [
    {
        required: true,
        message: 'Please enter name!',
    },
];
const passwordRule = [
    {
        required: true,
        message: 'Please enter password!',
    },
];
const mrnRule = [
    {
        required: true,
        message: 'Please enter MRN number!',
    },
];
const idRule = [
    {
        required: true,
        message: 'Please enter Id number!',
    },
];
const timeRule = [
    {
        type: 'object',
        required: true,
        message: 'Please select time!',
    },
];
const dateRule = [
    {
        type: 'object',
        required: true,
        message: 'Please select time!',
    },
];

const proceduresRule = [
    {
        required: true,
        message: 'Please select procedures!',
    },
];
const diagnosisRule = [
    {
        required: true,
        message: 'Please select diagnosis!',
    },
];
const operationStationRule = [
    {
        required: true,
        message: 'Please select operation station!',
    },
];
const operationRoomRule = [
    {
        required: true,
        message: 'Please select operation room!',
    },
];
const insuranceImageRule = [
    {
        required: true,
        message: 'Please upload insurance image!',
    },
];
const iqamaImageRule = [
    {
        required: true,
        message: 'Please upload iqama image!',
    },
];
const typeRule = [
    {
        required: true,
        message: 'Please select a type',
    },
];

export {
    emailRule,
    numberRule,
    nameRule,
    passwordRule,
    mrnRule,
    idRule,
    timeRule,
    dateRule,
    proceduresRule,
    diagnosisRule,
    operationRoomRule,
    operationStationRule,
    insuranceImageRule,
    iqamaImageRule,
    typeRule
}
