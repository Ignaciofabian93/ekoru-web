import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
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
        departmentCategory {
          id
          departmentCategoryName
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
