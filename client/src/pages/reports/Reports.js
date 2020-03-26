import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Button, Modal, Table} from 'antd';
import {EyeOutlined, EditOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import { saveAs } from 'file-saver';
import moment from "moment";
import {uuid} from "../../store/helper";
import { fields } from "../../common/josn2csv";
import {getAllOperations} from "../../store/actions/Common";
const {Parser} = require('json2csv');

function Reports(props) {

    const {operations, operationsLoading} = props;
    const [selectedPatient, setSelectedPatient] = useState({});
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => props.getAllOperations(), []);

    //table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'patient',
            render: patient => `${patient.name}`,
            ellipsis: true
        },
        {
            title: 'Doctor',
            dataIndex: 'created_by',
            render: created_by => created_by ? created_by.full_name : '',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => b.created_by.full_name.length - a.created_by.full_name.length,
            ellipsis: true
        },
        {
            title: 'Operation Theater',
            dataIndex: 'operation_theater',
            render: operation_theater => `${operation_theater.name}`,
            ellipsis: true
        },
        {
            title: 'Operation Room',
            dataIndex: 'operation_room',
            render: operation_room => `${operation_room.name}`,
            ellipsis: true
        },
        {
            title: 'Procedure',
            dataIndex: 'procedure',
            render: procedure => `${procedure.name}`,
            ellipsis: true
        },
        {
            title: 'Diagnosis',
            dataIndex: 'diagnosis',
            render: diagnosis => `${diagnosis.name}`,
            ellipsis: true
        },
        {
            title: 'Date',
            dataIndex: 'date',
            defaultSortOrder: 'ascend',
            render: text => <span>{moment(text).format('DD/MM/YYYY')}</span>,
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
            width: 110
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: text => <span>{moment(text).format('HH:mm:ss a')}</span>,
            width: 110
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return (
                    <div className="table-button-group">
                        <Button onClick={() => viewPatient(record)}
                                className="c-icon-button"
                                icon={<EyeOutlined/>}
                                size="large"/>
                        {/*<Button className="c-icon-button" icon={<EditOutlined/>} size="large"/>*/}
                    </div>
                )
            },
            width: 80
        }
    ];

    //show modal
    function viewPatient(patient) {
        if (patient && Object.keys(patient).length) {
            setSelectedPatient(patient);
            setModalVisibility(true)
        }
    }

    //hide modal
    function hideModal() {
        setTimeout(() => setSelectedPatient({}), 200);
        setModalVisibility(false);
    }

    //export reports data
    function exportOperations() {
        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(operations);
        let filename = `report-${uuid()}.csv`;
        let blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, filename);
    }

    return (
        <div className="reports">
            <Container>
                <div className="c-sub-header">
                    <h1 className="page-heading">Reports</h1>
                    <Button
                        disabled={!(operations && operations.length)}
                        onClick={() => exportOperations()}
                            className='c-button c-button-primary'>
                        Export
                    </Button>
                </div>
            </Container>
            <section className="c-section">
                <Container>
                    <Table
                        loading={operationsLoading}
                        columns={columns}
                        dataSource={operations}
                    />
                </Container>
            </section>

            <Modal
                title="Patient"
                visible={modalVisibility}
                footer={null}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Done"
                className="c-modal">

                <ul className="list">
                    <li className="list-item">
                        <span className="label">Name :</span>
                        <span className="value">{selectedPatient.patient ? selectedPatient.patient.name : ''}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Operation Theater :</span>
                        <span className="value">{selectedPatient.operation_theater ? selectedPatient.operation_theater.name : ''}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Operation Room :</span>
                        <span className="value">{selectedPatient.operation_room ? selectedPatient.operation_room.name : ''}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Procedure :</span>
                        <span className="value">{selectedPatient.procedure ? selectedPatient.procedure.name : ''}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Diagnosis :</span>
                        <span className="value">{selectedPatient.diagnosis ? selectedPatient.diagnosis.name : ''}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Comment :</span>
                        <span className="value">{selectedPatient.comment}</span>
                    </li>
                    <li className="list-item">
                        <span className="label">Date :</span>
                        <span className="value">
                            {moment(selectedPatient.date).format('DD/MM/YYYY')}
                        </span>
                    </li>
                    <li className="list-item">
                        <span className="label">Time :</span>
                        <span className="value">
                            {moment(selectedPatient.time).format('HH:mm:ss a')}
                        </span>
                    </li>
                </ul>

            </Modal>
        </div>
    );
}

const mapDispatchToState = ({common}) => {
    return {
        operations: common.operations,
        operationsLoading: common.operationsLoading
    }
};
const mapDispatchToProps = {
    getAllOperations
};
export default connect(mapDispatchToState, mapDispatchToProps)(Reports);
