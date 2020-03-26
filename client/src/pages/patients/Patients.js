import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Button, Form, Input, DatePicker, TimePicker, Select, AutoComplete} from 'antd';
import {useHistory} from "react-router-dom";
import { createOperation, getAll } from "../../store/actions/Common";
import {connect} from "react-redux";
import {
    dateRule, timeRule, proceduresRule, diagnosisRule, operationRoomRule, operationStationRule
} from "../../common/rules";

const {TextArea} = Input;
const {Option} = AutoComplete;

const AddForm = (props) => {

    let {operationRooms, procedures, diagnosis, operationTheaters, patients, createOperation, createOperationLoading} = props;

    const [form] = Form.useForm();

    const [selectPatient, setSelectPatient] = useState('');
    const [mrn, setMrn] = useState('');
    const [name, setName] = useState('');
    const [mobile_number, setMobileNumber] = useState('');

    const onReset = () => {
        form.resetFields();
        setSelectPatient({});
        setMrn('');
        setName('');
        setMobileNumber('');
    };

    const onFinish = fieldsValue => {
        // Should format date value before submit.
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].toISOString(),
            'time': fieldsValue['time'].toISOString(),
        };
        let payload = values;
        payload.patient = selectPatient._id;
        let procedureId = procedures.find(x => x.name === payload.procedure);
        let diagnoseId = diagnosis.find(x => x.name === payload.diagnosis);
        payload.procedure = procedureId._id;
        payload.diagnosis = diagnoseId._id;
        createOperation(payload, onReset);
    };

    function handleChange(value) {
        // console.log(`selected ${value}`);
    }

    function renderOptions(options) {
        if (options) {
            return options.map((option, index) => (
                <Select.Option key={index} value={option._id}>{option.name}</Select.Option>
            ))
        }
        return null;
    }

    function getPatient(key, value) {
        let patient = patients.find(obj => obj[key] === value);
        if (patient) {
            setSelectPatient(patient);
            setMrn(patient.mrn ? patient.mrn : '');
            setName(patient.name ? patient.name : '');
            setMobileNumber(patient.mobile_number ? patient.mobile_number : '');
        }
    }

    function autoCompleteChildren(array, key, key2, key3) {
        if (array) {
            return array.map((object, index) => <Option key={index} value2={object[key2]}
                                                        value={object[key3 ? key3 : key]}> {object[key]} </Option>)
        }
        return null
    }
    function autoCompleteChildren2(array, key, key2) {
        if (array) {
            return array.map((object, index) => <Option key={index} value2={object[key2]}
                                                        value={object[key]}> {object[key]} </Option>)
        }
        return null
    }

    const onSelect = (value, type) => {
        getPatient(type, value);
    };

    const onChange = (text, type) => {
        console.log('text', text)
        if (type === 'mrn') {
            setMrn(text);
        } else if (type === 'name') {
            setName(text);
        } else if (type === 'mobile_number') {
            setMobileNumber(text);
        }
    };

    const onNameFieldChanged = (key, array) => {
        let value = form.getFieldValue(key);
        let selectObj = array ? array.find(item => item.code === value || item.name === value) : null;

        form.setFieldsValue({
            [key]: selectObj ? selectObj.name : ''
        });
    };

    return (
        <>

            {patients && patients.length ? <div className="search-header">

                <p>Search : </p>

                <AutoComplete
                    name="mrn"
                    value={mrn}
                    onSelect={selected => onSelect(selected, 'mrn')}
                    onChange={text => onChange(text, 'mrn')}
                    className="c-auto-complete"
                    placeholder="Search with MRN"
                    filterOption={(inputValue, option) => option.value.toString().indexOf(inputValue) !== -1}>
                    {autoCompleteChildren(patients, 'mrn')}
                </AutoComplete>
                <AutoComplete
                    name="name"
                    value={name}
                    onSelect={selected => onSelect(selected, 'name')}
                    onChange={text => onChange(text, 'name')}
                    className="c-auto-complete"
                    placeholder="Patient Name"
                    filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
                    {autoCompleteChildren( patients, 'name')}
                </AutoComplete>
                <AutoComplete
                    name="mobile_number"
                    value={mobile_number}
                    onSelect={selected => onSelect(selected, 'mobile_number')}
                    onChange={text => onChange(text, 'mobile_number')}
                    className="c-auto-complete"
                    placeholder="Phone Number"
                    filterOption={(inputValue, option) => option.value.indexOf(inputValue) !== -1}>
                    {autoCompleteChildren(patients, 'mobile_number')}
                </AutoComplete>

            </div> : null}

            <Form
                name="add-patient-form"
                className="add-patient-form"
                form={form}
                initialValues={{
                    operation_theater: '',
                    operation_room: '',
                    date: '',
                    time: '',
                    procedure: '',
                    diagnosis: '',
                    comment: ''
                }}
                onFinish={onFinish}>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="operation_theater" label="Operation Station" rules={operationStationRule}>
                            <Select defaultValue="" className="c-select" onChange={handleChange}>
                                <Select.Option value="">Select Operation Station</Select.Option>
                                {renderOptions(operationTheaters)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="operation_room" label="Operation Room" rules={operationRoomRule}>
                            <Select defaultValue="" className="c-select" onChange={handleChange}>
                                <Select.Option value="">Select Operation Room</Select.Option>
                                {renderOptions(operationRooms)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <Form.Item name="date" label="Date" rules={dateRule}>
                            <DatePicker className="c-picker"/>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Item name="time" label="Time" rules={timeRule}>
                            <TimePicker className="c-picker"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="procedure" label="Procedures" rules={proceduresRule}>
                            <AutoComplete
                                className="c-auto-complete"
                                placeholder="Search with code"
                                allowClear={true}
                                onBlur={() => onNameFieldChanged('procedure', procedures)}
                                filterOption={(inputValue, option) => option.value2.indexOf(inputValue) !== -1 }>
                                {autoCompleteChildren2(procedures, 'name', 'code')}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="diagnosis" label="Diagnosis" rules={diagnosisRule}>
                            <AutoComplete
                                className="c-auto-complete"
                                placeholder="Search with code"
                                allowClear={true}
                                onBlur={() => onNameFieldChanged('diagnosis', diagnosis)}
                                filterOption={(inputValue, option) => option.value2.indexOf(inputValue) !== -1 }>
                                {autoCompleteChildren2(diagnosis, 'name', 'code')}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="comment" label="Comment">
                    <TextArea
                        className='c-input c-input-primary'
                        autoSize={{minRows: 5, maxRows: 5}}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            disabled={!selectPatient}
                            loading={createOperationLoading}
                            className="c-button c-button-primary login-form-button">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

function Patients(props) {

    const history = useHistory();

    useEffect(()=> {
        props.getAll()
    }, [])

    return (
        <div className="patients">
            <Container>
                <div className="c-sub-header">
                    <h1 className="page-heading">Patients</h1>
                    <Button onClick={() => history.push('/patients/add')} className='c-button c-button-primary'>
                        New Patient
                    </Button>
                </div>
            </Container>
            <section className="c-section">
                <Container>
                    <div className="patient-form">
                        <AddForm {...props} />
                    </div>
                </Container>
            </section>
        </div>
    );
}

const mapDispatchToState = ({common}) => {
    return {
        operationRooms: common.operationRooms,
        operationRoomsLoading: common.operationRoomsLoading,
        procedures: common.procedures,
        proceduresLoading: common.proceduresLoading,
        diagnosis: common.diagnosis,
        diagnosisLoading: common.diagnosisLoading,
        operationTheaters: common.operationTheaters,
        operationTheatersLoading: common.operationTheatersLoading,
        patients: common.patients,
        patientsLoading: common.patientsLoading,
        createOperationLoading: common.createOperationLoading
    }
};
const mapDispatchToProps = {
    createOperation,
    getAll
};
export default connect(mapDispatchToState, mapDispatchToProps)(Patients);
