import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe {
    me {
      id
      name
      surnames
      email
      address
      county {
        id
        county
      }
      city {
        id
        city
      }
      region {
        id
        region
      }
      country {
        id
        country
      }
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
