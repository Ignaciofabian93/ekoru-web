import { gql } from "@apollo/client";

export const GET_FEED_PRODUCTS = gql`
  query Products($limit: Int!, $scope: Scope!, $exchange: Boolean) {
    feedProducts(limit: $limit, scope: $scope, exchange: $exchange) {
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
