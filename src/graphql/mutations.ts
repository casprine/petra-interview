import { gql } from '@apollo/client';

const CREATE_CONTACT = gql`
  mutation(
    $firstName: String
    $lastName: String
    $phoneNumbers: [contact_phone_number_insert_input!]!
    $emails: [contact_email_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $firstName
        last_name: $lastName
        contact_phone_numbers: { data: $phoneNumbers }
        contact_emails: { data: $emails }
      }
    ) {
      returning {
        first_name
        last_name
        contact_phone_numbers {
          phone_number
        }
        contact_emails {
          email
        }
      }
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation($id: uuid!) {
    delete_contact_email(where: { contact_id: { _eq: $id } }) {
      returning {
        id
      }
    }

    delete_contact_phone_number(where: { contact_id: { _eq: $id } }) {
      returning {
        id
      }
    }

    delete_contact(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation($id: uuid, $firstName: String, $lastName: String) {
    update_contact(where: { id: { _eq: $id } }, _set: { first_name: $firstName, last_name: $lastName }) {
      returning {
        id
      }
    }
  }
`;

export default {
  CREATE_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
};
