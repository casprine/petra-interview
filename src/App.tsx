import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Row } from 'antd';

// components
import { ContactList, CreateContactForm } from './components';

// graphql
import { queries, mutations } from './graphql';

// types
import { ContactType } from './components/ContactList';

function App() {
  const { loading, data, error } = useQuery(queries.GET_CONTACTS, {
    onError: (error) => {
      console.error('Error whiles fetching contacts', error);
    },
  });

  const [createContact, { loading: creatingContact }] = useMutation(mutations.CREATE_CONTACT, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: queries.GET_CONTACTS }],
    onCompleted: () => {
      alert('Contact created!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [formData, setFormData] = useState<ContactType>({
    first_name: 'Casprine',
    last_name: 'Assempah',
    contact_emails: ['casprine.001@gmail.com , cas@gmail.com'],
    contact_phone_numbers: ['0545179957', '0241556521'],
  });

  const [showForm, setShowForm] = useState(true);

  if (error) {
    return <h1>An error occurred while fetching contacts</h1>;
  }

  const contacts = data && data.contact;

  return (
    <main className="container">
      <h2 className="header">Contact List</h2>
      <Row className="row">
        <Button onClick={() => setShowForm(!showForm)} type="primary">
          Add New Contact
        </Button>
      </Row>
      <ContactList contacts={contacts} loading={loading} />

      <CreateContactForm
        formData={formData}
        visible={showForm}
        handleCancel={() => setShowForm(!showForm)}
        handleInputChange={handleInputChange}
        handleOk={handleSubmit}
        creatingContact={creatingContact}
      />
    </main>
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit() {
    const parsedPhoneNumbers: Array<{
      phone_number: string;
    }> = [];

    const parsedEmailAddress: Array<{
      email: string;
    }> = [];

    formData.contact_phone_numbers
      .toString()
      .split(',')
      .map((phoneNumber) => {
        return parsedPhoneNumbers.push({
          phone_number: phoneNumber,
        });
      });

    formData.contact_emails
      .toString()
      .split(',')
      .map((email) => {
        return parsedEmailAddress.push({
          email,
        });
      });

    createContact({
      variables: {
        firstName: formData.first_name,
        lastName: formData.last_name,
        phoneNumbers: parsedPhoneNumbers,
        emails: parsedEmailAddress,
      },
    });

    setShowForm(false);
  }
}

export default App;
