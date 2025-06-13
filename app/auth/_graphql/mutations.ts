import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      businessName
      token
      isCompany
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $name: String!
    $surnames: String!
    $email: String!
    $password: String!
    $isCompany: Boolean!
    $businessName: String
  ) {
    register(
      name: $name
      surnames: $surnames
      email: $email
      password: $password
      isCompany: $isCompany
      businessName: $businessName
    ) {
      id
      name
      surnames
      businessName
      email
      isCompany
      createdAt
      updatedAt
    }
  }
`;
