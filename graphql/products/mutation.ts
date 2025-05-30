import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: Int!
    $hasOffer: Boolean
    $offerPrice: Int
    $stock: Int!
    $productCategoryId: Int!
    $userId: String!
    $images: [String]
  ) {
    addProduct(
      name: $name
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
      description
      price
      images
      hasOffer
      offerPrice
      stock
      size
      productCategoryId
      userId
    }
  }
`;
