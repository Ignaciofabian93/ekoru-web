import { gql } from "@apollo/client";

export const GET_MARKET_MENU = gql`
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

export const GET_STORE_MENU = gql`
  query StoreCatalog {
    storeCatalog {
      id
      businessName
    }
  }
`;
