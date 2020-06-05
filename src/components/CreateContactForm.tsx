import * as React from 'react';
import { Modal } from 'antd';
import { Form, Input } from 'antd';

import { ContactType } from './ContactList';

type CreateContactFormProps = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  formData: ContactType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  creatingContact: boolean;
  updateContact: () => void;
  updateInstead?: boolean;
};

const CreateContactForm: React.FC<CreateContactFormProps> = ({
  visible,
  handleOk,
  handleCancel,
  handleInputChange,
  formData,
  updateContact,
  updateInstead,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={updateInstead ? 'Update Contact' : 'Create Contact'}
      okText={updateInstead ? 'Update' : 'Create'}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.resetFields();

            if (updateInstead) {
              updateContact();
            }

            handleOk();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ ...formData }}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please input your  First Name!' }]}
        >
          <Input value={formData.first_name} name="first_name" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please input your  First Name!' }]}
        >
          <Input value={formData.last_name} name="last_name" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Phone Numbers"
          name="contact_phone_numbers"
          rules={[{ required: true, message: 'Please enter at least one phone number!' }]}
        >
          <Input value={formData.contact_phone_numbers} name="contact_phone_numbers" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="contact_emails"
          rules={[{ required: true, message: 'Please enter at least one email address!' }]}
        >
          <Input value={formData.contact_emails} name="contact_emails" onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateContactForm;
