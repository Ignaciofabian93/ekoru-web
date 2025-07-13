import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
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
              county {
                id
                county
              }
              city {
                id
                city
              }
              region {
                id
                region
              }
              country {
                id
                country
              }
              userCategory {
                id
                name
                categoryDiscountAmount
                pointsThreshold
              }
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
  }
`;

export const GET_DEPARTMENT = gql`
  query Department($id: ID!) {
    department(id: $id) {
      id
      departmentName
      departmentCategories {
        id
        departmentCategoryName
        productCategories {
          id
          productCategoryName
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
              county {
                id
                county
              }
              city {
                id
                city
              }
              region {
                id
                region
              }
              country {
                id
                country
              }
              userCategory {
                id
                name
                categoryDiscountAmount
                pointsThreshold
              }
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
  }
`;
