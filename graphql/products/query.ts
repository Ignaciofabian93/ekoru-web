import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      department
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query Department($id: ID!) {
    department(id: $id) {
      id
      department
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// DEPARTMENT CATEGORIES
export const GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT = gql`
  query DepartmentCategoriesByDepartment($id: ID!) {
    departmentCategoriesByDepartment(id: $id) {
      id
      departmentCategory
    }
  }
`;

export const GET_DEPARTMENT_CATEGORIES = gql`
  query DepartmentCategories {
    departmentCategories {
      id
      departmentCategory
    }
  }
`;

export const GET_DEPARTMENT_CATEGORY = gql`
  query DepartmentCategory($id: ID!) {
    departmentCategory(id: $id) {
      id
      departmentCategory
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// PRODUCT CATEGORIES
export const GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY = gql`
  query ProductCategoriesByDepartmentCategory($id: ID!) {
    productCategoriesByDepartmentCategory(id: $id) {
      id
      productCategory
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      productCategory
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query ProductCategory($id: ID!) {
    productCategory(id: $id) {
      id
      productCategory
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// PRODUCTS
export const GET_PRODUCTS = gql`
  query Products {
    products {
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

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
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

export const GET_PRODUCTS_BY_OWNER = gql`
  query ProductsByOwner($id: ID!) {
    productsByOwner(id: $id) {
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
