import { gql } from 'apollo-boost';

export const REQUEST_TOKEN = gql`
  mutation createToken($email: String!, $password: String!) {
    createToken(email: $email, password: $password)
  }
`;

export const LOGIN_QUERY = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;

export const SIGN_IN_QUERY = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name)
  }
`;
