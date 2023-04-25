import React from 'react';
import { Button, Form, Input } from '@arco-design/web-react';
import VerifyCode from '@arco-materials/verification-code';

export default () => {
  const [formRef] = Form.useForm();

  const validate = (code, index) => {
    let reg = /[0-9]/;
    if (index % 2 === 0) {
      reg = /[A-Za-z]/;
    }
    return new RegExp(reg).test(code);
  };

  const onSubmit = () => {
    formRef.validate((errors, value) => {
      console.log(errors, value);
    });
  };

  return (
    <Form style={{ width: '500px' }} form={formRef}>
      <Form.Item label="手机号" field="phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="验证码"
        field="verifyCode"
        validateTrigger="onComplete"
        required
        rules={[
          {
            validator: (value, cb) => {
              if ((value || []).join('').split('').length < 6) {
                cb('验证码错误！');
              }
            },
          },
        ]}
      >
        <VerifyCode allowClear validate={validate} />
      </Form.Item>
      <Form.Item label=" ">
        <Button onClick={onSubmit} type="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
