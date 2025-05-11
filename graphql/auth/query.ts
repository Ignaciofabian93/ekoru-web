import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetMe {
    me {
      id
      name
      surnames
      email
      address
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

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      country
    }
  }
`;

export const GET_REGIONS = gql`
  query GetRegions($countryId: ID!) {
    regions(id: $countryId) {
      id
      region
    }
  }
`;

export const GET_CITIES = gql`
  query GetCities($regionId: ID!) {
    cities(id: $regionId) {
      id
      city
    }
  }
`;

export const GET_COUNTIES = gql`
  query GetCounties($cityId: ID!) {
    counties(id: $cityId) {
      id
      county
    }
  }
`;
