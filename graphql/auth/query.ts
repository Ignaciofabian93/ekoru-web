import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe($token: String!) {
    me(token: $token) {
      id
      name
      email
      isCompany
      createdAt
      updatedAt
    }
  }
`;
