import { gql } from '@apollo/client';

const CREATE_CONTACT = gql`
  mutation($firstName: String, $lastName: String, $phoneNumbers: String, $emails: String) {
    insert_contact(
      objects: {
        first_name: $firstName
        last_name: $lastName
        contact_phone_numbers: { data: { phone_number: $phoneNumbers } }
        contact_emails: { data: { email: $emails } }
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

export default {
  CREATE_CONTACT,
};
