import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query ProductCategories($take: Int, $skip: Int, $orderBy: OrderByInput) {
    productCategories(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      productCategoryName
      keywords
      materialImpactEstimateId
      size
      minWeight
      maxWeight
      weightUnit
      departmentCategoryId
      materialImpactEstimate {
        id
        materialType
        minWeight
        maxWeight
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
        estimatedWasteSavingsKG
        notes
      }
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
      departmentCategory {
        id
        departmentCategoryName
        department {
          id
          departmentName
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query ProductCategory($id: ID!) {
    productCategory(id: $id) {
      id
      productCategoryName
      keywords
      materialImpactEstimateId
      size
      minWeight
      maxWeight
      weightUnit
      departmentCategoryId
      materialImpactEstimate {
        id
        materialType
        minWeight
        maxWeight
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
        estimatedWasteSavingsKG
        notes
      }
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
      departmentCategory {
        id
        departmentCategoryName
        department {
          id
          departmentName
        }
      }
    }
  }
`;
