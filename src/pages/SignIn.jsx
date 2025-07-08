import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

const SignIn = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Sign In Data:', values);
        // Here you'd normally call the API with fetch or axios
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Sign In</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Email" name="email" rules={[{ required: true }]}> 
            <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}> 
            <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">Sign In</Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default SignIn;