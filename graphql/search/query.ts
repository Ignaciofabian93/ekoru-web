import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
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
        productCategoryId
        userId
        productCategory {
          id
          productCategoryName
          departmentCategoryId
          departmentCategory {
            id
            departmentCategoryName
            departmentId
            department {
              id
              departmentName
            }
          }
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
        likes {
          id
          userId
        }
        comments {
          id
          comment
          userId
        }
      }
      ... on ProductCategory {
        id
        productCategoryName
        departmentCategoryId
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
          productCategoryId
          userId
        }
        departmentCategory {
          id
          departmentCategoryName
          departmentId
          department {
            id
            departmentName
          }
        }
      }
      ... on Department {
        id
        departmentName
      }
      ... on DepartmentCategory {
        id
        departmentCategoryName
        departmentId
        department {
          id
          departmentName
        }
      }
    }
  }
`;
