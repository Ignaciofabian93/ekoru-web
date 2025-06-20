import { gql } from "@apollo/client";

export const GET_MARKET_CATALOG = gql`
  query Departments {
    departments {
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
