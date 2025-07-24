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

export const GET_MY_PRODUCTS = gql`
  query MyProducts($userId: ID!, $take: Int, $skip: Int, $orderBy: OrderByInput) {
    myProducts(userId: $userId, take: $take, skip: $skip, orderBy: $orderBy) {
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
      productCategory {
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
        departmentCategory {
          id
          departmentCategoryName
          department {
            id
            departmentName
          }
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
        firstMaterialType {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
      }
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
        country {
          id
          country
        }
        region {
          id
          region
        }
        city {
          id
          city
        }
        county {
          id
          county
        }
        userCategory {
          id
          name
          categoryDiscountAmount
          pointsThreshold
        }
      }
      likes {
        id
        userId
      }
      comments {
        id
        comment
        userId
      }
    }
  }
`;
