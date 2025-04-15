"use client";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TextInput from "@/components/textInput/Input";
import Button from "@/components/buttons/Button";
import Login from "@/services/rest-auth";

type Form = {
  email: string;
  password: string;
};

type LoginForm = {
  handleCurrentView: (view: string) => void;
};

export default function LoginForm({ handleCurrentView }: LoginForm) {
  const router = useRouter();
  const notify = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [GetMe, { error: authError, loading: authLoading }] = useLazyQuery(GET_PROFILE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      notifyError("Debe ingresar un correo y una contraseña.");
      return;
    }
    const response = await Login({ email, password });
    if (response.token) {
      const { data } = await GetMe({ variables: { token: response.token } });
      if (authError) {
        console.log(authError);
        notifyError("Error al intentar iniciar sesión.");
        return;
      }
      if (data.me) {
        notify("Inicio de sesión exitoso. Redirigiendo a inicio.");
        setTimeout(() => {
          router.replace("/(home)/feed");
        }, 3000);
      }
    } else {
      notifyError("Error al intentar iniciar sesión.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        key={"email"}
        name="email"
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={handleFormChange}
      />
      <TextInput
        key={"password"}
        name="password"
        placeholder="Contraseña"
        type="password"
        value={form.password}
        onChange={handleFormChange}
      />
      <Button key={"signin"} text="Ingresar" type="submit" disabled={authLoading} />
      <Button
        key={"cancel"}
        text="Cancelar"
        variant="secondary"
        onClick={() => handleCurrentView("default")}
        disabled={authLoading}
      />
    </form>
  );
}
