"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/auth/mutations";
import { toast } from "react-toastify";
import { colors } from "@/constants/colors";
import TextInput from "@/components/textInput/input";
import Button from "@/components/buttons/button";
import Select from "@/components/select/select";
import useRegister from "../../hooks/useRegister";
import { ArrowLeft } from "lucide-react";

type Form = {
  name: string;
  surnames: string;
  email: string;
  password: string;
  isCompany: boolean;
  phone: string;
  countryId: number;
  regionId: number;
  cityId: number;
  countyId: number;
};

type RegisterForm = {
  handleCurrentView: (view: string) => void;
};

const CancelButton = ({ handleCurrentView }: { handleCurrentView: () => void }) => {
  return (
    <div className="w-full flex items-center justify-start gap-2 fixed top-4 left-4" onClick={handleCurrentView}>
      <ArrowLeft color={colors.primary} size={24} />
      <span className="text-lg text-primary cursor-pointer text-center font-semibold">Cancelar</span>
    </div>
  );
};

export default function RegisterForm({ handleCurrentView }: RegisterForm) {
  const {
    countries,
    cities,
    regions,
    counties,
    handleCountrySelected,
    handleCitySelected,
    handleRegionSelected,
    handleCountySelected,
  } = useRegister();
  const notify = (message: string) =>
    toast.success(message, { style: { backgroundColor: colors.primary, color: "#f7f7f7" } });
  const notifyError = (error: string) =>
    toast.error(error, { style: { backgroundColor: "#D32F2F", color: "#f7f7f7" } });
  const [form, setForm] = useState<Form>({
    name: "",
    surnames: "",
    email: "",
    password: "",
    isCompany: false,
    phone: "",
    countryId: 0,
    regionId: 0,
    cityId: 0,
    countyId: 0,
  });

  console.log("CO::", countries);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [register, { error: authError, loading: authLoading }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = form;
    if (!name || !email || !password) {
      notifyError("Todos los campos son obligatorios");
      return;
    }
    const { data } = await register({
      variables: { name: form.name, email: form.email, password: form.password, isCompany: form.isCompany },
    });
    if (authError) {
      console.error(authError);
      notifyError("Error al registrar usuario");
    }
    if (data.register.id) {
      notify("Usuario registrado correctamente. Redirigiendo a inicio de sesión");
      setTimeout(() => {
        handleCurrentView("default");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full overflow-y-scroll md:overflow-hidden">
      <CancelButton handleCurrentView={() => handleCurrentView("login")} />
      <div className="w-full flex flex-col md:flex-row gap-4">
        <Select key={"country"} name="country" options={countries.map((c) => c.country)} />
        <Select key={"region"} name="region" options={regions.map((r) => r.region)} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <Select key={"city"} name="city" options={cities.map((c) => c.city)} />
        <Select key={"county"} name="county" options={counties.map((c) => c.county)} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <TextInput
          key={"name"}
          name="name"
          placeholder="Nombre"
          type="text"
          value={form.name}
          onChange={handleFormChange}
        />
        <TextInput
          key={"surnames"}
          name="surnames"
          placeholder="Apellidos"
          type="text"
          value={form.surnames}
          onChange={handleFormChange}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <TextInput
          key={"phone"}
          placeholder="Celular"
          type="email"
          name="email"
          value={form.email}
          onChange={handleFormChange}
        />
        <TextInput
          key={"email"}
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleFormChange}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <TextInput
          key={"password"}
          placeholder="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleFormChange}
        />
        <TextInput
          key={"address"}
          placeholder="Dirección"
          type="password"
          name="password"
          value={form.password}
          onChange={handleFormChange}
        />
      </div>
      <Button text="Registrarse" type="submit" disabled={authLoading} />
    </form>
  );
}
