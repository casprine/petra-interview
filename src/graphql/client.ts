import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://pt-contactapp-graphql-backend.herokuapp.com/v1/graphql',
  }),
});

export default client;
