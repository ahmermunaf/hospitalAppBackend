import React from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {login} from "../../../store/actions/Users";
import {emailRule, passwordRule} from "../../../common/rules";
import { auth } from '../../../routing/index';


const NormalLoginForm = (props) => {

    const { loading, login } = props;

    const callback = () => {
        // auth.authenticate();
    };

    const onFinish = values => {
        login(values, callback)
    };

    return (
        <Form name="normal_login" className="login-form" initialValues={{
            email_address: 'admin@admin.com',
            password: 'admin12'
        }} onFinish={onFinish}>

            <Form.Item name="email_address" rules={emailRule}>
                <Input className='c-input c-input-primary'
                       prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item name="password" rules={passwordRule}>
                <Input className='c-input c-input-primary' prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="Password"/>
            </Form.Item>

            <div className="links">
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit"
                        loading={loading}
                        className="c-button c-button-primary login-form-button">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

function Login(props) {
    return (
        <div className="auth">
            <div className="overlay">
                <div className="auth-card">
                    <h1 className="heading"> Login </h1>
                    <NormalLoginForm {...props}/>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToState = ({users}) => {
    return {
        loading: users.loginLoading
    }
};
const mapDispatchToProps = {
    login
};
export default connect(mapDispatchToState, mapDispatchToProps)(Login);
