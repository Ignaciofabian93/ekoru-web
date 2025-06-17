import { gql } from "@apollo/client";

export const MARKET_BROWSE = gql`
  query ProductCategories {
    productCategories {
      id
      productCategoryName
      departmentCategoryId
      departmentCategory {
        id
        departmentCategoryName
        departmentId
        department {
          id
          departmentName
        }
      }
    }
  }
`;
