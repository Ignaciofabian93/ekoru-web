import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query ProductCategoriesByDepartmentCategory($id: ID!, $take: Int, $skip: Int, $orderBy: OrderByInput) {
    productCategoriesByDepartmentCategory(id: $id, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      productCategoryName
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
      fifthMaterialType {
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
      thirdMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
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
      fifthMaterialType {
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
      thirdMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
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
