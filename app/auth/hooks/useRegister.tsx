import { GET_CITIES, GET_COUNTIES, GET_COUNTRIES, GET_REGIONS } from "@/graphql/auth/query";
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

  const [GetCountries, { data: Countries }] = useLazyQuery(GET_COUNTRIES);

  const [GetRegions, { data: Regions }] = useLazyQuery(GET_REGIONS);

  const [GetCities, { data: Cities }] = useLazyQuery(GET_CITIES);

  const [GetCounties, { data: Counties }] = useLazyQuery(GET_COUNTIES);

  useEffect(() => {
    GetCountries();
  }, []);

  useEffect(() => {
    if (Countries) {
      setCountries(Countries.countries);
    }
  }, [Countries]);

  useEffect(() => {
    if (Regions) {
      setRegions(Regions.regions);
    }
  }, [Regions]);

  useEffect(() => {
    if (Cities) {
      setCities(Cities.cities);
    }
  }, [Cities]);

  useEffect(() => {
    if (Counties) {
      setCounties(Counties.counties);
    }
  }, [Counties]);

  const handleCountrySelected = (countryId: number) => {
    GetRegions({ variables: { countryId } });
  };

  const handleRegionSelected = (regionId: number) => {
    GetCities({ variables: { regionId } });
  };

  const handleCitySelected = (cityId: number) => {
    GetCounties({ variables: { cityId } });
  };

  return {
    countries,
    regions,
    cities,
    counties,
    handleCountrySelected,
    handleRegionSelected,
    handleCitySelected,
  };
}
