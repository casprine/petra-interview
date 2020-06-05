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

  // create a new contact
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

  // delete contact
  const [deleteContact, { loading: deletingContact }] = useMutation(mutations.DELETE_CONTACT, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: queries.GET_CONTACTS }],
    onCompleted: () => {
      alert('Contact deleted!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [formData, setFormData] = useState<ContactType>({
    first_name: '',
    last_name: '',
    contact_emails: [''],
    contact_phone_numbers: [],
  });

  const [showForm, setShowForm] = useState(false);

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
      <ContactList
        handleDeleteContact={handleDeleteContact}
        deletingContact={deletingContact}
        contacts={contacts}
        loading={loading}
      />

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

  function handleDeleteContact(id: string) {
    deleteContact({
      variables: {
        id,
      },
    });
  }

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
