import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/26394/gobrr-staking-goerli/version/latest',  
  cache: new InMemoryCache()
});
// import { GraphQLClient, gql } from "graphql-request";

// const client = new GraphQLClient("https://api.studio.thegraph.com/query/26394/gobrr-staking-goerli/version/latest");

export default client;