import { gql } from '@apollo/client';

const GET_CONTACTS = gql`
  query {
    contact {
      first_name
      last_name
      contact_emails {
        email
      }
      contact_phone_numbers {
        phone_number
      }
    }
  }
`;

export default {
  GET_CONTACTS,
};
