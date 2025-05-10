"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/auth/mutations";
import { toast } from "react-toastify";
import { colors } from "@/constants/colors";
import { ArrowLeft } from "lucide-react";
import TextInput from "@/components/textInput/input";
import Button from "@/components/buttons/button";
import CheckBox from "@/components/checkbox/checkbox";

type Form = {
  name: string;
  surnames: string;
  email: string;
  password: string;
  isCompany: boolean;
};

type RegisterForm = {
  handleCurrentView: (view: string) => void;
};

const CancelButton = ({ handleCurrentView }: { handleCurrentView: () => void }) => {
  return (
    <div className="w-fit flex items-center justify-start gap-2 fixed top-4 left-4" onClick={handleCurrentView}>
      <ArrowLeft color={colors.primary} size={20} />
      <span className="text-md text-primary cursor-pointer text-center font-semibold">Volver</span>
    </div>
  );
};

export default function RegisterForm({ handleCurrentView }: RegisterForm) {
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
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    console.log("NAME & VALUE:: ", name, value);
    setForm({ ...form, [name]: value });
  };

  const [register, { error: authError, loading: authLoading }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, surnames, email, password } = form;
    if (!name || !surnames || !email || !password) {
      notifyError("Todos los campos son obligatorios");
      return;
    }
    const { data } = await register({
      variables: {
        name: form.name,
        surnames: form.surnames,
        email: form.email,
        password: form.password,
        isCompany: form.isCompany,
      },
    });
    if (authError) {
      console.error(authError);
      notifyError("Error al registrar usuario");
    }
    if (data.register.id) {
      notify("Usuario registrado correctamente. Redirigiendo a inicio de sesión");
      setTimeout(() => {
        handleCurrentView("login");
      }, 3000);
    }
  };

  console.log("FORM:: ", form);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <CancelButton handleCurrentView={() => handleCurrentView("login")} />
      <div className="w-full flex flex-col md:flex-row md:gap-4">
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
      <div className="w-full flex flex-col md:flex-row md:gap-4">
        <TextInput
          key={"email"}
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleFormChange}
        />
        <TextInput
          key={"password"}
          placeholder="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleFormChange}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row md:gap-4">
        <CheckBox
          id="isCompany"
          name="isCompany"
          label="Empresa"
          checked={form.isCompany}
          onChange={handleFormChange}
        />
      </div>
      <Button text="Registrarse" type="submit" disabled={authLoading} className="mt-6" />
    </form>
  );
}
