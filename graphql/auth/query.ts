import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe {
    me {
      id
      name
      email
      address
      county
      city
      region
      phone
      isCompany
      createdAt
      updatedAt
      userCategory {
        id
        name
        categoryDiscountAmount
        pointsThreshold
      }
    }
  }
`;
