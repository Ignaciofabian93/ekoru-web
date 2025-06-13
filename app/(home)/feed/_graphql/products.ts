import { gql } from "@apollo/client";

export const GET_FEED_PRODUCTS = gql`
  query Products($limit: Int!, $scope: Scope!, $exchange: Boolean) {
    feedProducts(limit: $limit, scope: $scope, exchange: $exchange) {
      id
      sku
      barcode
      color
      brand
      name
      description
      price
      images
      hasOffer
      offerPrice
      stock
      isExchangeable
      interests
      isActive
      ratings
      ratingCount
      reviewsNumber
      badges
      createdAt
      updatedAt
      productCategoryId
      userId
      user {
        id
        name
        surnames
        email
        businessName
        profileImage
        phone
        address
        isCompany
        accountType
        createdAt
        updatedAt
        preferredContactMethod
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
      }
      comments {
        id
        comment
        userId
      }
      likes {
        id
        userId
      }
    }
  }
`;
