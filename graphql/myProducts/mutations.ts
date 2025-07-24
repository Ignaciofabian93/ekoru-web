import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $sku: String
    $barcode: String
    $color: String
    $brand: String
    $name: String!
    $description: String!
    $price: Int!
    $images: [String]
    $hasOffer: Boolean
    $offerPrice: Int
    $stock: Int!
    $isExchangeable: Boolean
    $interests: [String]
    $isActive: Boolean
    $badges: [Badge]
    $productCategoryId: Int!
    $userId: String!
  ) {
    addProduct(
      sku: $sku
      barcode: $barcode
      color: $color
      brand: $brand
      name: $name
      description: $description
      price: $price
      images: $images
      hasOffer: $hasOffer
      offerPrice: $offerPrice
      stock: $stock
      isExchangeable: $isExchangeable
      interests: $interests
      isActive: $isActive
      badges: $badges
      productCategoryId: $productCategoryId
      userId: $userId
    ) {
      id
      name
      brand
      sku
      barcode
      color
      badges
      isExchangeable
      isActive
      description
      price
      images
      hasOffer
      offerPrice
      stock
      productCategoryId
      userId
    }
  }
`;

export const LIKE_PRODUCT = gql`
  mutation LikeProduct($id: ID!, $userId: ID!) {
    likeProduct(id: $id, userId: $userId) {
      id
      likes {
        id
        userId
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $sku: String
    $barcode: String
    $color: String
    $brand: String
    $name: String!
    $description: String!
    $price: Int!
    $images: [String]
    $hasOffer: Boolean
    $offerPrice: Int
    $stock: Int!
    $isExchangeable: Boolean
    $interests: [String]
    $isActive: Boolean
    $badges: [Badge]
    $productCategoryId: Int!
    $userId: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      stock: $stock
      productCategoryId: $productCategoryId
      userId: $userId
      sku: $sku
      barcode: $barcode
      color: $color
      brand: $brand
      images: $images
      hasOffer: $hasOffer
      offerPrice: $offerPrice
      isExchangeable: $isExchangeable
      interests: $interests
      isActive: $isActive
      badges: $badges
    ) {
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
      ratingCount
      ratings
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      price
      stock
      images
      isExchangeable
      interests
      badges
      createdAt
      updatedAt
    }
  }
`;
