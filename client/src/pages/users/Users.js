import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import {Button, Table, Modal, Input, Form, Select} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {emailRule, nameRule, passwordRule, typeRule} from "../../common/rules";
import {addUser, deleteUser, getUsers, updateUser} from "../../store/actions/Users";

const {confirm} = Modal;

const UserForm = (props) => {

    const {closeModal, addUser, addUserLoading, updateUser, updateLoading, getUsers, user, type} = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if(type === 'update') {
            form.setFieldsValue({
                full_name: user.full_name ? user.full_name : '',
                email_address: user.email_address ? user.email_address : '',
                type: user.type ? user.type : '',
                password: user.password ? user.password : '',
            });
        }
    }, [user])

    const onReset = () => {
        form.resetFields();
        closeModal();
        getUsers();
    };

   const onClose = () => {
       form.resetFields();
       closeModal();
    };

    // const onFinish = values => addUser(values, onReset);
    const onFinish = values => {
        if (type === 'update') {
            delete values.password;
            let payload = {
                id: user._id,
                ...values
            };
            updateUser(payload, onReset)
        } else {
            addUser(values, onReset)
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="add-user"
            onFinish={onFinish}
            initialValues={{}}
        >
            <Form.Item name="full_name" label="Name" rules={nameRule}>
                <Input className='c-input c-input-primary'/>
            </Form.Item>

            <Form.Item name="email_address" label="Email" rules={emailRule}>
                <Input className='c-input c-input-primary'/>
            </Form.Item>

            <Form.Item name="type" label="Type" rules={typeRule}>
                <Select
                    placeholder="Select a type"
                    className="c-select">
                    <Select.Option value="doctor">Docter</Select.Option>
                    <Select.Option value="hospital">Hospital</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item name="password" label="Password" rules={passwordRule} >
                <Input.Password className='c-input c-input-primary'
                    disabled={type === 'update'}
                />
            </Form.Item>

            <div className="modal-footer">
                <Button onClick={() => onClose()}>
                    Close
                </Button>
                <Button
                    loading={type === 'update' ? updateLoading : addUserLoading}
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

const UpdateForm = ({closeModal, updateUser, updateLoading, getUsers, user}) => {

    const [form] = Form.useForm();

    useEffect(()=> {
        form.setFieldsValue({
            full_name: user.full_name,
            email_address: user.email_address,
            type: user.type,
            password: user.password,
        });
    }, [user])

    const onReset = () => {
        form.resetFields();
        closeModal();
        getUsers();
    };

    const onClose = () => {
        closeModal(form);
    };

    const onFinish = values => {
        delete values.password;
        let payload = {
            id: user._id,
            ...values
        };
        updateUser(payload, onReset)
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="update-user"
            onFinish={onFinish}
            initialValues={user}
        >
            <Form.Item name="full_name" label="Name" rules={nameRule}>
                <Input className='c-input c-input-primary'/>
            </Form.Item>

            <Form.Item name="email_address" label="Email" rules={emailRule}>
                <Input className='c-input c-input-primary'/>
            </Form.Item>

            <Form.Item name="type" label="Type" rules={typeRule}>
                <Select
                    placeholder="Select a type"
                    className="c-select">
                    <Select.Option value="doctor">Docter</Select.Option>
                    <Select.Option value="hospital">Hospital</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item name="password" label="Password" rules={passwordRule} >
                <Input.Password className='c-input c-input-primary' disabled={true} />
            </Form.Item>

            <div className="modal-footer">
                <Button onClick={() => onClose()}>
                    Close
                </Button>
                <Button
                    loading={updateLoading}
                    type="primary"
                    htmlType="submit">
                    Update
                </Button>
            </div>
        </Form>
    );
};

function Users(props) {

    const {users, loading, getUsers, deleteUser} = props;
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => getUsers(), []);

    function showModal(user) {
        setUser(user)
        setVisible(true)
    }
    function hideModal() {
        setVisible(false)
    }


    //delete user function with confirmation
    function showDeleteConfirm(user) {
        confirm({
            title: 'Do you Want to delete these user?',
            icon: <ExclamationCircleOutlined/>,
            content: user ? user.full_name : '',
            onOk() {
                let payload = {
                    id: user._id
                };
                deleteUser(payload, getUsers)
            },
            onCancel() {

            },
        });
    }

    //table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            ellipsis: true
        },
        {
            title: 'Email',
            dataIndex: 'email_address',
            ellipsis: true
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: [
                {text: 'Admin', value: 'admin'},
                {text: 'Doctor', value: 'doctor'},
                {text: 'Hospital', value: 'hospital'},
            ],
            onFilter: (value, users) => users.type.indexOf(value) === 0,
            ellipsis: true,
            width: 120
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                if (record.type !== 'admin') {
                    return (
                        <div className="table-button-group">
                            <Button onClick={() => showDeleteConfirm(record)}
                                    className="c-icon-button"
                                    icon={<DeleteOutlined/>}
                                    size="large"/>
                            <Button
                                onClick={() => showModal(record)}
                                className="c-icon-button"
                                icon={<EditOutlined/>}
                                size="large"/>
                        </div>
                    )
                }
                return null;
            },
            width: 120
        }
    ];

    return (
        <div className="patients">
            <Container>
                <div className="c-sub-header">
                    <h1 className="page-heading">Users</h1>
                    <Button
                        disabled={false}
                        onClick={() => showModal()}
                        className='c-button c-button-primary'>
                        Add
                    </Button>
                </div>
            </Container>
            <section className="c-section">
                <Container>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={users}
                    />
                </Container>
            </section>
            <Modal
                title={user && Object.keys(user).length ? 'Update User' : 'Add User'}
                className="add-user-modal"
                visible={visible}
                centered
                footer={null}
                maskClosable={false}
                onCancel={hideModal}
            >
                <UserForm
                    closeModal={hideModal}
                    type={user && Object.keys(user).length ? 'update' : 'add'}
                    user={user}
                    {...props}
                />
            </Modal>


        </div>
    );
}

const mapDispatchToState = ({users}) => {
    return {
        loading: users.loading,
        addUserLoading: users.addUserLoading,
        users: users.users,
        updateLoading: users.updateLoading
    }
};
const mapDispatchToProps = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
export default connect(mapDispatchToState, mapDispatchToProps)(Users);
