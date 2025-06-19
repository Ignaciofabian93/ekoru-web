import { gql } from "@apollo/client";

export const MARKET_BROWSE_MENU = gql`
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

export const MARKET_BROWSE_DEPARTMENTS = gql`
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

export const MARKET_BROWSE_DEPARTMENT_CATEGORIES_BY_ID = gql`
  query DepartmentCategoriesByDepartment($id: ID!) {
    departmentCategoriesByDepartment(id: $id) {
      id
      departmentCategoryName
      departmentId
      productCategories {
        id
        productCategoryName
        products {
          id
          sku
          barcode
          color
          brand
          name
          description
          price
          images
          hasOffer
          offerPrice
          stock
          isExchangeable
          interests
          isActive
          ratings
          ratingCount
          reviewsNumber
          badges
          createdAt
          updatedAt
          userId
          user {
            id
            name
            surnames
            email
            businessName
            profileImage
            birthday
            phone
            address
            isCompany
            accountType
            preferredContactMethod
            points
            createdAt
            updatedAt
          }
          comments {
            id
            comment
            userId
          }
          likes {
            id
            userId
          }
        }
      }
    }
  }
`;
