import { gql } from "@apollo/client";

export const GET_DEPARTMENT_CATEGORIES = gql`
  query departmentCategoriesByDepartment($id: ID!) {
    departmentCategoriesByDepartment(id: $id) {
      id
      departmentCategoryName
      department {
        id
        departmentName
      }
      productCategories {
        id
        productCategoryName
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
        keywords
        materialImpactEstimateId
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
        size
        minWeight
        maxWeight
        weightUnit
      }
    }
  }
`;

export const GET_DEPARTMENT_CATEGORY = gql`
  query DepartmentCategory($id: ID!) {
    departmentCategory(id: $id) {
      id
      departmentCategoryName
      department {
        id
        departmentName
      }
      productCategories {
        id
        productCategoryName
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
        keywords
        materialImpactEstimateId
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
        size
        minWeight
        maxWeight
        weightUnit
      }
    }
  }
`;
