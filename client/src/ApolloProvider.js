import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  //split,
} from "@apollo/client";
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
// import { WebSocketLink } from '@apollo/client/link/ws'
// import { getMainDefinition } from '@apollo/client/utilities'

let httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

// const authLink = setContext(() => {
//     const token = localStorage.getItem('chatToken')
//     return{
//         headers: {
//             Authorization: token ?  `Bearer ${token}`: ''
//         }
//     }
// })

const authLink = setContext((_, {headers}) => {
  // // get the authentication token from local storage if it exists
  const token = localStorage.getItem("instagramToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:4000/graphql',
//     options: {
//       reconnect: true,
//       connectionParams: {
//         Authorization: `Bearer ${localStorage.getItem('chatToken')}`,
//       },
//     },
//   })

//   const splitLink = split(
//     ({ query }) => {
//       const definition = getMainDefinition(query)
//       return (
//         definition.kind === 'OperationDefinition' &&
//         definition.operation === 'subscription'
//       )
//     },
//     wsLink,
//     httpLink
//   )

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       getPosts: {
    //         // Don't cache separate results based on
    //         // any of this field's arguments.
    //         keyArgs: false,
    //         // Concatenate the incoming list items with
    //         // the existing list items.
    //         merge(existing = [], incoming) {
    //           return [...existing, ...incoming];
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />;
}
