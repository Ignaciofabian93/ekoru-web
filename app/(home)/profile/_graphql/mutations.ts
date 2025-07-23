import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateProfile(
    $id: ID!
    $name: String
    $surnames: String
    $email: String
    $profileImage: String
    $birthday: String
    $businessName: String
    $address: String
    $countyId: Int
    $cityId: Int
    $regionId: Int
    $countryId: Int
    $phone: String
    $accountType: AccountType
    $preferredContactMethod: PreferredContactMethod
    $points: Int
  ) {
    updateProfile(
      id: $id
      name: $name
      surnames: $surnames
      email: $email
      profileImage: $profileImage
      birthday: $birthday
      businessName: $businessName
      address: $address
      countyId: $countyId
      cityId: $cityId
      regionId: $regionId
      countryId: $countryId
      phone: $phone
      accountType: $accountType
      preferredContactMethod: $preferredContactMethod
      points: $points
    ) {
      id
      name
      surnames
      email
      profileImage
      birthday
      businessName
      address
      accountType
      preferredContactMethod
      points
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
      phone
      isCompany
      createdAt
      updatedAt
      userCategory {
        id
        name
        categoryDiscountAmount
        pointsThreshold
      }
    }
  }
`;
