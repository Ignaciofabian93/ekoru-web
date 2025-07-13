import { gql } from "@apollo/client";

export const GET_FEED_PRODUCTS = gql`
  query Products($take: Int!, $scope: Scope!, $exchange: Boolean) {
    feedProducts(take: $take, scope: $scope, exchange: $exchange) {
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
      productCategory {
        id
        productCategoryName
        departmentCategoryId
        keywords
        averageWeight
        firstMaterialTypeId
        firstMaterialTypeQuantity
        secondMaterialTypeId
        secondMaterialTypeQuantity
        thirdMaterialTypeId
        thirdMaterialTypeQuantity
        fourthMaterialTypeId
        fourthMaterialTypeQuantity
        fifthMaterialTypeId
        fifthMaterialTypeQuantity
        size
        weightUnit
        firstMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
        secondMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
        thirdMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
        fourthMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
        fifthMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
      }
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
