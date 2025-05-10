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
  mutation Register($name: String!, $surnames: String!, $email: String!, $password: String!, $isCompany: Boolean!) {
    register(name: $name, surnames: $surnames, email: $email, password: $password, isCompany: $isCompany) {
      id
      name
      surnames
      email
      isCompany
      createdAt
      updatedAt
    }
  }
`;
