import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CITIES, GET_COUNTIES, GET_COUNTRIES, GET_REGIONS } from "@/graphql/geo/query";
import { UPDATE_USER } from "@/graphql/user/mutations";
import { City, Country, Region, County } from "@/types/geo";
import { toast } from "react-toastify";
import { colors } from "@/constants/colors";
import useSessionStore, { UserData } from "@/store/session";

export default function useProfile() {
  const notify = (message: string) =>
    toast.success(message, { style: { backgroundColor: colors.primary, color: "#f7f7f7" } });
  const notifyError = (error: string) =>
    toast.error(error, { style: { backgroundColor: "#D32F2F", color: "#f7f7f7" } });
  const { handleSession, data, toggleEdit } = useSessionStore();
  const [formData, setFormData] = useState<UserData>(data);
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [counties, setCounties] = useState<County[]>([]);

  const [GetCountries] = useLazyQuery(GET_COUNTRIES);
  const [GetRegions] = useLazyQuery(GET_REGIONS);
  const [GetCities] = useLazyQuery(GET_CITIES);
  const [GetCounties] = useLazyQuery(GET_COUNTIES);

  const [UpdateProfile, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onError: () => notifyError("Error al intentar actualizar datos de usuario"),
    onCompleted: (data) => {
      handleSession(data.updateProfile);
      toggleEdit();
      notify("Datos actualizados correctamente");
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await GetCountries();
        setCountries(data.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data } = await GetRegions({ variables: { countryId: formData.country.id } });
        setRegions(data.regions);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, [formData.country.id]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await GetCities({ variables: { regionId: formData.region.id } });
        setCities(data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [formData.region.id]);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const { data } = await GetCounties({ variables: { cityId: formData.city.id } });
        setCounties(data.counties);
      } catch (error) {
        console.error("Error fetching counties:", error);
      }
    };

    fetchCounties();
  }, [formData.city.id]);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDate = (date: string) => setFormData({ ...formData, birthday: date });

  const handleProfileImage = (base64Image: string) => {
    setFormData((prev) => ({ ...prev, profileImage: base64Image }));
  };

  const handleCountry = (value: string | number) => {
    const country = countries.find((country) => country.id === value);
    if (country) {
      setFormData((prev) => ({
        ...prev,
        country: country,
        region: { id: "", region: "" },
        city: { id: "", city: "" },
        county: { id: "", county: "" },
      }));
    }
  };

  const handleRegion = (value: string | number) => {
    const region = regions.find((region) => region.id === value);
    if (region) {
      setFormData((prev) => ({
        ...prev,
        region: region,
        city: { id: "", city: "" },
        county: { id: "", county: "" },
      }));
    }
  };

  const handleCity = (value: string | number) => {
    const city = cities.find((city) => city.id === value);
    if (city) {
      setFormData((prev) => ({
        ...prev,
        city: city,
        county: { id: "", county: "" },
      }));
    }
  };

  const handleCounty = (value: string | number) => {
    const county = counties.find((county) => county.id === value);
    if (county) {
      setFormData((prev) => ({
        ...prev,
        county: county,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      id,
      name,
      surnames,
      email,
      profileImage,
      birthday,
      address,
      city,
      country,
      county,
      region,
      businessName,
      phone,
    } = formData;
    await UpdateProfile({
      variables: {
        id,
        name,
        surnames,
        email,
        profileImage,
        birthday,
        address,
        cityId: Number(city.id),
        countryId: Number(country.id),
        countyId: Number(county.id),
        regionId: Number(region.id),
        businessName,
        phone,
      },
    });
  };

  return {
    handleFormData,
    handleDate,
    formData,
    handleProfileImage,
    handleSubmit,
    countries,
    regions,
    cities,
    counties,
    handleCity,
    handleCountry,
    handleCounty,
    handleRegion,
    updateLoading,
  };
}
