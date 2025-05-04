import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe {
    me {
      id
      name
      email
      address
      county
      city
      region
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

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      country
    }
  }
`;

export const GET_REGIONS = gql`
  query GetRegions($countryId: Int!) {
    regions(countryId: $countryId) {
      id
      region
    }
  }
`;

export const GET_CITIES = gql`
  query GetCities($regionId: Int!) {
    cities(regionId: $regionId) {
      id
      city
    }
  }
`;

export const GET_COUNTIES = gql`
  query GetCounties($cityId: Int!) {
    counties(cityId: $cityId) {
      id
      county
    }
  }
`;
