import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      token
      isCompany
    }
  }
`;

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $isCompany: Boolean!) {
    register(name: $name, email: $email, password: $password, isCompany: $isCompany) {
      id
      name
      email
      isCompany
      createdAt
      updatedAt
    }
  }
`;
