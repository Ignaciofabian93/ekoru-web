import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS = gql`
  query Search($query: String!) {
    search(query: $query) {
      ... on ProductCategory {
        id
        productCategory
      }
      ... on Product {
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
      ... on Department {
        id
        department
      }
      ... on DepartmentCategory {
        id
        departmentCategory
      }
    }
  }
`;
