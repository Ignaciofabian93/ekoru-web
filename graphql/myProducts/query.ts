import { gql } from "@apollo/client";

export const GET_MY_PRODUCTS = gql`
  query MyProducts($userId: ID!, $take: Int, $skip: Int, $orderBy: OrderByInput) {
    myProducts(userId: $userId, take: $take, skip: $skip, orderBy: $orderBy) {
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
  }
`;
