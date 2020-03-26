import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Button, Upload, Form, Input} from 'antd';
import {emailRule, idRule, insuranceImageRule, iqamaImageRule, mrnRule, nameRule, numberRule} from "../../common/rules";
import {ArrowLeftOutlined, UploadOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import { addPatient } from "../../store/actions/Common";
import {connect} from "react-redux";

const normFile = e => {
    return e && e.file;
};

class AddForm extends React.Component {
    formRef = React.createRef();
    state = {
        iqama_image: [],
        insurance_image: []
    };

    onReset = () => {
        this.formRef.current.resetFields();
        this.setState({
            iqama_image: [],
            insurance_image: []
        })
    };

    onFinish = values => {
        let formdata = new FormData();
        formdata.append("name", values.name);
        formdata.append("mobile_number", values.mobile_number);
        formdata.append("email", values.email);
        formdata.append("iqama_image", values.iqama_image);
        formdata.append("insurance_image", values.insurance_image);
        formdata.append("notes", values.notes);
        this.props.addPatient(formdata, this.onReset)
    };

    render() {
        const { TextArea } = Input;
        const iqama = {
            onRemove: file => {
                this.setState(state => { return { iqama_image: [] }} );
            },
            beforeUpload: file => {
                this.setState(state => ({ iqama_image: [file] }));
                return false;
            },
            fileList: this.state.iqama_image
        };
        const insurance = {
            onRemove: file => {
                this.setState(state => { return { insurance_image: [] }});
            },
            beforeUpload: file => {
                this.setState(state => ({ insurance_image: [file] }));
                return false;
            },
            fileList: this.state.insurance_image
        };
        const { loading } = this.props;
        return (
            <Form name="add-patient-form"
                  ref={this.formRef}
                  className="add-patient-form"
                  initialValues={{}}
                  onFinish={this.onFinish}>

                <Form.Item name="name" label="Name" rules={nameRule}>
                    <Input className='c-input c-input-primary' type="text"/>
                </Form.Item>

                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="mobile_number" label="Mobile No." rules={numberRule}>
                            <Input className='c-input c-input-primary' type="number"/>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Form.Item name="email" label="Email" rules={emailRule}>
                            <Input className='c-input c-input-primary' type="email"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="idNo" label="Id No." rules={idRule}>
                    <Input className='c-input c-input-primary' type="number"/>
                </Form.Item>

                <Row>
                    <Col>
                        <Form.Item
                            name="iqama_image"
                            label="Iqama Attach file PDF or JPG"
                            getValueFromEvent={normFile}
                            rules={iqamaImageRule}>
                            <Upload {...iqama}>
                                <Button>
                                    <UploadOutlined/> Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            name="insurance_image"
                            label="Insurance Attach file PDF or JPG"
                            getValueFromEvent={normFile}
                            rules={insuranceImageRule} >
                            <Upload {...insurance}>
                                <Button>
                                    <UploadOutlined/> Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="notes" label="Notes">
                    <TextArea
                        className='c-input c-input-primary'
                        autoSize={{minRows: 5, maxRows: 5}}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary" htmlType="submit"
                        className="c-button c-button-primary login-form-button"
                        loading={loading}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

function AddPatient(props) {
    const history = useHistory();
    const { addPatient, loading } = props;
    return (
        <div className="patients">
            <Container>
                <div className="c-sub-header">
                    <div className="back-button" onClick={() => history.goBack()}>
                        <ArrowLeftOutlined/>
                    </div>
                    <h1 className="page-heading">Add patient</h1>
                </div>
            </Container>
            <section className="c-section">
                <Container>
                    <div className="card-form">
                        <AddForm
                            addPatient={addPatient}
                            loading={loading}
                        />
                    </div>
                </Container>
            </section>
        </div>
    );
}

const mapDispatchToState = ({common}) => {
    return {
        loading: common.addPatientLoading
    }
};
const mapDispatchToProps = {
    addPatient
};
export default connect(mapDispatchToState, mapDispatchToProps)(AddPatient);
// export default AddPatient;
