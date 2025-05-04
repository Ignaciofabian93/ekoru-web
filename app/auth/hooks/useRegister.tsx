import { GET_COUNTRIES } from "@/graphql/auth/query";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export type Country = {
  id: number;
  country: string;
};

export type Region = {
  id: number;
  region: string;
};

export type City = {
  id: number;
  city: string;
};

export type County = {
  id: number;
  county: string;
};

export default function useRegister() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [counties, setCounties] = useState<County[]>([]);

  const [GetCountries, { data, error, loading }] = useLazyQuery(GET_COUNTRIES);

  useEffect(() => {
    GetCountries();
  }, []);

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  const handleCountrySelected = () => {};

  const handleRegionSelected = () => {};

  const handleCitySelected = () => {};

  const handleCountySelected = () => {};

  return {
    countries,
    regions,
    cities,
    counties,
    handleCountrySelected,
    handleRegionSelected,
    handleCitySelected,
    handleCountySelected,
  };
}
