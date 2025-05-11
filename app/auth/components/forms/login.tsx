"use client";
import { useState } from "react";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/button";
import Login from "@/services/auth/rest-auth";
import useSessionStore from "@/store/session";
import TextInput from "@/components/textInput/input";
import { useLazyQuery } from "@apollo/client";

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
  const { handleSession } = useSessionStore();
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [GetMe, { error: authError, loading }] = useLazyQuery(GET_PROFILE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      notifyError("Debe ingresar un correo y una contraseña.");
      return;
    }
    const response = await Login({ email, password });
    if (response.token) {
      const { data } = await GetMe();
      if (authError) {
        notifyError("Error al intentar iniciar sesión.");
        return;
      }
      if (data) {
        handleSession(data.me);
        notify(`Bienvenido(a) ${data.me.name}`);
        const redirectTo = data.me.isCompany ? "/dashboard" : "/feed";
        setTimeout(() => {
          router.replace(redirectTo);
        }, 3000);
      }
    } else {
      notifyError("Error al intentar iniciar sesión.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center md:w-[80%]">
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
      <Button key={"signin"} text="Ingresar" type="submit" disabled={loading} />
      <span
        className="text-sm text-primary cursor-pointer text-center font-semibold mt-2"
        onClick={() => handleCurrentView("register")}
      >
        ¿No tienes una cuenta?. Regístrate aquí
      </span>
    </form>
  );
}
