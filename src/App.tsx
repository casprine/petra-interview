import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Row } from 'antd';

// components
import { ContactList, CreateContactForm } from './components';

// graphql
import { queries } from './graphql';

function App() {
  const { loading, data, error } = useQuery(queries.GET_CONTACTS, {
    onError: (error) => {
      console.error('Error whiles fetching contacts', error);
    },
  });

  const [formData, setFormData] = useState({
    // first_,
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

      <CreateContactForm visible={showForm} handleCancel={() => setShowForm(!showForm)} handleOk={() => {}} />
    </main>
  );
}

export default App;
