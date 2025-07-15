import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      departmentName
    }
  }
`;

export const GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT = gql`
  query DepartmentCategoriesByDepartment($id: ID!) {
    departmentCategoriesByDepartment(id: $id) {
      id
      departmentCategoryName
    }
  }
`;

export const GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY = gql`
  query ProductCategoriesByDepartmentCategory($id: ID!) {
    productCategoriesByDepartmentCategory(id: $id) {
      id
      productCategoryName
      departmentCategoryId
      keywords
      averageWeight
      firstMaterialTypeId
      firstMaterialTypeQuantity
      secondMaterialTypeId
      secondMaterialTypeQuantity
      thirdMaterialTypeId
      thirdMaterialTypeQuantity
      fourthMaterialTypeId
      fourthMaterialTypeQuantity
      fifthMaterialTypeId
      fifthMaterialTypeQuantity
      size
      weightUnit
      firstMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
      }
      fifthMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
      }
      fourthMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
      }
      thirdMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
      }
      secondMaterialType {
        id
        materialType
        estimatedCo2SavingsKG
        estimatedWaterSavingsLT
      }
    }
  }
`;
