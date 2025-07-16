import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($search: String!) {
    search(query: $search) {
      ... on Product {
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
        userId
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
        }
        user {
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
      ... on ProductCategory {
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
        products {
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
          userId
          user {
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
    }
  }
`;
