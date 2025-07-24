import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CITIES, GET_COUNTIES, GET_COUNTRIES, GET_REGIONS } from "@/graphql/geo/query";
import { City, Country, Region, County } from "@/types/location";
import { User } from "@/types/user";
import { GET_MY_PRODUCTS } from "@/graphql/myProducts/query";
import { UPDATE_USER } from "../_graphql/mutations";
import useSessionStore from "@/store/session";
import useAlert from "@/hooks/useAlert";
import { Product } from "@/types/product";

export default function useProfile() {
  const { handleSession, data, toggleEdit } = useSessionStore();
  const { notify, notifyError } = useAlert();
  const [formData, setFormData] = useState<User>(data);

  const [GetCountries, { data: countries, loading: countriesLoading, error: countriesError }] =
    useLazyQuery(GET_COUNTRIES);
  const [GetRegions, { data: regions, loading: regionsLoading, error: regionsError }] =
    useLazyQuery(GET_REGIONS);
  const [GetCities, { data: cities, loading: citiesLoading, error: citiesError }] = useLazyQuery(GET_CITIES);
  const [GetCounties, { data: counties, loading: countiesLoading, error: countiesError }] =
    useLazyQuery(GET_COUNTIES);

  const [MyProducts, { data: products, loading: myProductsLoading, refetch: refetchMyProducts }] =
    useLazyQuery(GET_MY_PRODUCTS);

  // Update user data
  const [UpdateProfile, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onError: () => notifyError("Error al intentar actualizar datos de usuario"),
    onCompleted: (data) => {
      handleSession(data.updateProfile);
      toggleEdit();
      notify("Datos actualizados correctamente");
    },
  });

  // /////////////////////////////////////////////////////////////////////////////////////////
  // Get user products
  useEffect(() => {
    MyProducts({ variables: { userId: data.id } });
  }, [data.id, MyProducts]);

  // /////////////////////////////////////////////////////////////////////////////////////////
  // Geological information
  useEffect(() => {
    GetCountries();
  }, []);

  useEffect(() => {
    GetRegions({ variables: { countryId: formData.country.id } });
  }, [formData.country.id]);

  useEffect(() => {
    GetCities({ variables: { regionId: formData.region.id } });
  }, [formData.region.id]);

  useEffect(() => {
    GetCounties({ variables: { cityId: formData.city.id } });
  }, [formData.city.id]);

  useEffect(() => {
    if (countriesError || regionsError || citiesError || countiesError) {
      notifyError("Error al cargar información geográfica");
    }
  }, [countriesError, regionsError, citiesError, countiesError]);

  // //////////////////////////////////////////////////////////////////////////////////////////
  // Handle form data

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDate = (date: string) => setFormData((prev) => ({ ...prev, birthday: date }));

  const handleProfileImage = (base64Image: string) => {
    setFormData((prev) => ({ ...prev, profileImage: base64Image }));
  };

  const handleCoverImage = (base64Image: string) => {
    setFormData((prev) => ({ ...prev, coverImage: base64Image }));
  };

  const handleCountry = (value: string | number) => {
    const country = countries.find((country: Country) => country.id === value);
    if (country) {
      setFormData((prev) => ({
        ...prev,
        country: country,
        region: { id: 0, region: "" },
        city: { id: 0, city: "" },
        county: { id: 0, county: "" },
      }));
    }
  };

  const handleRegion = (value: string | number) => {
    const region = regions.find((region: Region) => region.id === value);
    if (region) {
      setFormData((prev) => ({
        ...prev,
        region: region,
        city: { id: 0, city: "" },
        county: { id: 0, county: "" },
      }));
    }
  };

  const handleCity = (value: string | number) => {
    const city = cities.find((city: City) => city.id === value);
    if (city) {
      setFormData((prev) => ({
        ...prev,
        city: city,
        county: { id: 0, county: "" },
      }));
    }
  };

  const handleCounty = (value: string | number) => {
    const county = counties.find((county: County) => county.id === value);
    if (county) {
      setFormData((prev) => ({
        ...prev,
        county: county,
      }));
    }
  };

  const handleContactMethod = (value: "EMAIL" | "WHATSAPP" | "ALL") => {
    setFormData((prev) => ({
      ...prev,
      preferredContactMethod: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      id,
      name,
      surnames,
      email,
      profileImage,
      coverImage,
      birthday,
      address,
      city,
      country,
      county,
      region,
      businessName,
      phone,
      accountType,
      preferredContactMethod,
    } = formData;
    await UpdateProfile({
      variables: {
        id,
        name,
        surnames,
        email,
        profileImage,
        coverImage,
        birthday,
        address,
        cityId: Number(city.id),
        countryId: Number(country.id),
        countyId: Number(county.id),
        regionId: Number(region.id),
        businessName,
        phone,
        accountType,
        preferredContactMethod,
      },
    });
  };

  return {
    handleFormData,
    handleDate,
    formData,
    handleProfileImage,
    handleCoverImage,
    handleSubmit,
    countries: (countries?.countries as Country[]) || [],
    regions: (regions?.regions as Region[]) || [],
    cities: (cities?.cities as City[]) || [],
    counties: (counties?.counties as County[]) || [],
    handleCity,
    handleCountry,
    handleCounty,
    handleRegion,
    updateLoading,
    myProducts: (products?.myProducts as Product[]) || [],
    data,
    handleContactMethod,
    countriesLoading,
    regionsLoading,
    citiesLoading,
    countiesLoading,
    myProductsLoading,
    refetchMyProducts: () => refetchMyProducts({ userId: data.id }),
  };
}
