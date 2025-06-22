import { gql } from "@apollo/client";

export const GET_MARKET_CATALOG = gql`
  query Departments($take: Int, $skip: Int, $orderBy: OrderByInput) {
    departments(take: $take, skip: $skip, orderBy: $orderBy) {
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
