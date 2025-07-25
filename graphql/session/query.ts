import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe($id: ID!) {
    me(id: $id) {
      id
      name
      surnames
      email
      profileImage
      coverImage
      birthday
      businessName
      address
      accountType
      preferredContactMethod
      points
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
