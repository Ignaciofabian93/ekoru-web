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
    $badges: [String]
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
