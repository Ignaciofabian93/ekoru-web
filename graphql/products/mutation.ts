import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $brand: String
    $sku: String
    $barcode: String
    $color: String
    $badges: [String]
    $description: String!
    $price: Int!
    $hasOffer: Boolean
    $offerPrice: Int
    $isExchangeable: Boolean
    $isActive: Boolean
    $stock: Int!
    $productCategoryId: Int!
    $userId: String!
    $images: [String]
  ) {
    addProduct(
      name: $name
      brand: $brand
      sku: $sku
      barcode: $barcode
      color: $color
      badges: $badges
      isExchangeable: $isExchangeable
      isActive: $isActive
      description: $description
      price: $price
      hasOffer: $hasOffer
      offerPrice: $offerPrice
      stock: $stock
      productCategoryId: $productCategoryId
      userId: $userId
      images: $images
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
