import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query Stores {
    stores {
      id
      email
      businessName
      profileImage
      phone
      address
      isCompany
      accountType
      preferredContactMethod
      points
      createdAt
      updatedAt
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
      userCategory {
        id
        name
        categoryDiscountAmount
        pointsThreshold
      }
    }
  }
`;
