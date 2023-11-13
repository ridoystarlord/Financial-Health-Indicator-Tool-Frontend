import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $companyName: String!
  ) {
    RegisterUser(
      name: $name
      email: $email
      password: $password
      companyName: $companyName
    ) {
      success
      message
      error
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    LoginUser(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;
