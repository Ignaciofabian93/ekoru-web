import { gql } from "@apollo/client";

export const GET_MARKET_CATALOG = gql`
  query MarketCatalog {
    marketCatalog {
      id
      departmentName
      departmentCategories {
        id
        departmentCategoryName
        productCategories {
          id
          productCategoryName
        }
      }
    }
  }
`;
