import { useLazyQuery } from "@apollo/client";
import { GET_CO2_IMPACT_MESSAGES, GET_WATER_IMPACT_MESSAGES } from "../_graphql/impacts";

export default function useImpactDetails() {
  const [getCo2ImpactMessages] = useLazyQuery(GET_CO2_IMPACT_MESSAGES);
  const [getWaterImpactMessages] = useLazyQuery(GET_WATER_IMPACT_MESSAGES);

  const fetchCo2ImpactMessages = async (value: number) => {
    try {
      const { data } = await getCo2ImpactMessages({ variables: { value } });
      return data.co2ImpactMessages;
    } catch (error) {
      console.error("Error fetching CO2 impact messages:", error);
      return null;
    }
  };

  const fetchWaterImpactMessages = async (value: number) => {
    try {
      const { data } = await getWaterImpactMessages({ variables: { value } });
      return data.waterImpactMessages;
    } catch (error) {
      console.error("Error fetching water impact messages:", error);
      return null;
    }
  };

  return {
    fetchCo2ImpactMessages,
    fetchWaterImpactMessages,
  };
}
