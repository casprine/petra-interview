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
  const [formData, setFormData] = useState<ContactType>({
    first_name: '',
    last_name: '',
    contact_emails: [''],
    contact_phone_numbers: [''],
  });

  const [showForm, setShowForm] = useState(false);
  const [updateInstead, setUpdateInstead] = useState(false);

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
      setFormData({
        first_name: '',
        last_name: '',
        contact_emails: [''],
        contact_phone_numbers: [''],
      });
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

  const [updateContact] = useMutation(mutations.UPDATE_CONTACT, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: queries.GET_CONTACTS }],
    onCompleted: () => {
      alert('Contact deleted!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (error) {
    return <h1>An error occurred while fetching contacts</h1>;
  }

  const contacts = data && data.contact;

  return (
    <main className="container">
      <h2 className="header">Contact List</h2>
      <Row className="row">
        <Button onClick={openModalForCreate} type="primary">
          Add New Contact
        </Button>
      </Row>
      <ContactList
        handleDeleteContact={handleDeleteContact}
        deletingContact={deletingContact}
        contacts={contacts}
        loading={loading}
        onEditClick={onEditClick}
      />

      <CreateContactForm
        formData={formData}
        visible={showForm}
        handleCancel={onModalClose}
        handleInputChange={handleInputChange}
        handleOk={handleSubmit}
        creatingContact={creatingContact}
        updateContact={updateContact}
        updateInstead={updateInstead}
      />
    </main>
  );

  function handleDeleteContact(record: ContactType) {
    deleteContact({
      variables: {
        id: record.id,
      },
    });
  }

  function openModalForCreate() {
    console.log({ formData });

    setFormData({
      first_name: '',
      last_name: '',
      contact_emails: [''],
      contact_phone_numbers: [''],
    });

    setShowForm(!showForm);
  }

  function onModalClose() {
    setFormData({
      first_name: '',
      last_name: '',
      contact_emails: [''],
      contact_phone_numbers: [''],
    });

    setShowForm(!showForm);
  }

  function onEditClick(record: ContactType) {
    const phoneNumbers: Array<string> = [];
    const emails: Array<string> = [];

    // @ts-ignore
    record.contact_phone_numbers.map((phoneNumber) => phoneNumbers.push(phoneNumber.phone_number));
    // @ts-ignore
    record.contact_emails.map(({ email }) => emails.push(email));

    console.log({ record });

    setFormData({
      ...record,
      contact_emails: emails,
      contact_phone_numbers: phoneNumbers,
    });

    // wait for 2 seconds before opening modal
    setUpdateInstead(!updateInstead);
    setShowForm(!showForm);
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
