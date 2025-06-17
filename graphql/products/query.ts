import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      departmentName
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query Department($id: ID!) {
    department(id: $id) {
      id
      departmentName
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// DEPARTMENT CATEGORIES
export const GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT = gql`
  query DepartmentCategoriesByDepartment($id: ID!) {
    departmentCategoriesByDepartment(id: $id) {
      id
      departmentCategoryName
    }
  }
`;

export const GET_DEPARTMENT_CATEGORIES = gql`
  query DepartmentCategories {
    departmentCategories {
      id
      departmentCategoryName
    }
  }
`;

export const GET_DEPARTMENT_CATEGORY = gql`
  query DepartmentCategory($id: ID!) {
    departmentCategory(id: $id) {
      id
      departmentCategoryName
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// PRODUCT CATEGORIES
export const GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY = gql`
  query ProductCategoriesByDepartmentCategory($id: ID!) {
    productCategoriesByDepartmentCategory(id: $id) {
      id
      productCategoryName
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      productCategoryName
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query ProductCategory($id: ID!) {
    productCategory(id: $id) {
      id
      productCategoryName
    }
  }
`;

// //////////////////////////////////////////////////////////////////////////////////
// PRODUCTS
export const GET_PRODUCTS = gql`
  query Products {
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
      productCategoryId
      userId
      user {
        id
        name
        surnames
        email
        businessName
        profileImage
        phone
        address
        isCompany
        accountType
        createdAt
        updatedAt
        preferredContactMethod
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
`;

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
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
      productCategoryId
      userId
      user {
        id
        name
        surnames
        email
        businessName
        profileImage
        phone
        address
        isCompany
        accountType
        createdAt
        updatedAt
        preferredContactMethod
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
`;

export const GET_PRODUCTS_BY_OWNER = gql`
  query ProductsByOwner($id: ID!) {
    productsByOwner(id: $id) {
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
      productCategoryId
      userId
      user {
        id
        name
        surnames
        email
        businessName
        profileImage
        phone
        address
        isCompany
        accountType
        createdAt
        updatedAt
        preferredContactMethod
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
`;
