import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query Stores {
    stores {
      id
      email
      businessName
      profileImage
      coverImage
      birthday
      phone
      address
      isCompany
      accountType
      preferredContactMethod
      points
      createdAt
      updatedAt
      country {
        id
        country
      }
      region {
        id
        region
      }
      city {
        id
        city
      }
      county {
        id
        county
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
