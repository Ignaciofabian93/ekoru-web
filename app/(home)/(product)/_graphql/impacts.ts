import { gql } from "@apollo/client";

export const GET_CO2_IMPACT_MESSAGES = gql`
  query Co2ImpactMessages($value: Float!) {
    co2ImpactMessages(value: $value) {
      id
      message1
      message2
      message3
    }
  }
`;

export const GET_WATER_IMPACT_MESSAGES = gql`
  query WaterImpactMessages($value: Float!) {
    waterImpactMessages(value: $value) {
      id
      message1
      message2
      message3
    }
  }
`;
