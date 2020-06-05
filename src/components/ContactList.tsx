import * as React from 'react';
import { Table, Space, Button } from 'antd';

export type Contact = {
  id?: string;
  first_name: string;
  last_name: string;
  contact_emails: string[];
  contact_phone_numbers: string[];
};

type ContactListProp = {
  loading: boolean;
  deletingContact: boolean;
  handleDeleteContact: (record: Contact) => void;
  contacts: Array<Contact>;
  onEditClick: (record: Contact) => void;
};

const ContactList: React.FC<ContactListProp> = ({ loading, contacts, handleDeleteContact, onEditClick }) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },

    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'first_name',
    },

    {
      title: 'Number of Email Address',
      dataIndex: 'contact_emails',
      key: 'contact_emails',
      render: (contact_emails: string[]) => <span>{contact_emails.length}</span>,
    },

    {
      title: 'Number of Phone Number',
      dataIndex: 'contact_phone_numbers',
      key: 'contact_phone_numbers',
      render: (contact_phone_numbers: string[]) => <span>{contact_phone_numbers.length}</span>,
    },

    {
      title: 'Actions',
      render: (record: Contact) => {
        return (
          <Space size="middle">
            <Button onClick={() => onEditClick(record)} type="primary">
              Edit
            </Button>
            <Button danger onClick={() => handleDeleteContact(record)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        rowKey={() => {
          return Math.floor(Math.random() * 100);
        }}
        columns={columns}
        dataSource={contacts}
        loading={loading}
      />
    </>
  );
};

export type ContactType = Contact;

export default ContactList;
