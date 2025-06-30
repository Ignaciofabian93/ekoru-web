import { gql } from "@apollo/client";

export const GET_DEPARTMENT_CATEGORIES = gql`
  query departmentCategoriesByDepartment($id: ID!, $take: Int, $skip: Int, $orderBy: OrderByInput) {
    departmentCategoriesByDepartment(id: $id, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      departmentCategoryName
      productCategories {
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
      }
    }
  }
`;

export const GET_DEPARTMENT_CATEGORY = gql`
  query DepartmentCategory($id: ID!) {
    departmentCategory(id: $id) {
      id
      departmentCategoryName
      productCategories {
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
      }
    }
  }
`;
