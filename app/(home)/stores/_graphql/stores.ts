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

export const GET_STORE = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      surnames
      email
      businessName
      profileImage
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
