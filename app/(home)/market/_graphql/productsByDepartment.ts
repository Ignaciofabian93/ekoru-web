import { gql } from "@apollo/client";

export const PRODUCTS_BY_DEPARTMENT = gql`
  query ProductsByDepartment($departmentId: ID!, $take: Int) {
    productsByDepartment(departmentId: $departmentId, take: $take) {
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
        departmentCategory {
          id
          departmentCategoryName
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
        secondMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
        firstMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
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
      user {
        id
        name
        surnames
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
  }
`;
