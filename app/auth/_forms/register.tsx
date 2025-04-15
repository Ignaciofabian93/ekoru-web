"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/auth/mutations";
import { toast } from "react-toastify";
import TextInput from "@/components/textInput/Input";
import Button from "@/components/buttons/Button";

type Form = {
  name: string;
  email: string;
  password: string;
  isCompany: boolean;
};

type RegisterForm = {
  handleCurrentView: (view: string) => void;
};

export default function RegisterForm({ handleCurrentView }: RegisterForm) {
  const notify = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    isCompany: false,
  });

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
      console.log(data);
      notify("Usuario registrado correctamente. Redirigiendo a inicio de sesión");
      setTimeout(() => {
        handleCurrentView("default");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        key={"name"}
        name="name"
        placeholder="Nombre"
        type="text"
        value={form.name}
        onChange={handleFormChange}
      />
      <TextInput
        key={"email"}
        placeholder="correo"
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
      <Button text="Registrarse" type="submit" disabled={authLoading} />
      <Button text="Cancelar" variant="secondary" onClick={() => handleCurrentView("default")} disabled={authLoading} />
    </form>
  );
}
