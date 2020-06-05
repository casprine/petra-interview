import * as React from 'react';
import { Modal } from 'antd';
import { Form, Input } from 'antd';

type CreateContactFormProps = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const CreateContactForm: React.FC<CreateContactFormProps> = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal title="Create Contact" okText="Create" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please input your  First Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input your  First Name!' }]}
      >
        <Input />
      </Form.Item>
    </Modal>
  );
};

export default CreateContactForm;
