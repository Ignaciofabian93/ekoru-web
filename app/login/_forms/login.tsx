"use client";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/auth/query";
import { GET_USER } from "@/graphql/user/query";
import TextInput from "@/components/textInput/input";
import Button from "@/components/buttons/button";

type Form = {
  email: string;
  password: string;
};

type LoginForm = {
  handleCurrentView: (view: string) => void;
};

export default function LoginForm({ handleCurrentView }: LoginForm) {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [login, { error: authError, loading: authLoading }] = useMutation(LOGIN);

  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(GET_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    const { data: authData } = await login({
      variables: { email: form.email, password: form.password },
    });
    if (authError) {
      console.log(authError);
    }
    if (authData) {
      const userId = authData?.login.id;
      const { data } = await getUser({ variables: { userId } });
      if (userError) {
        console.log(userError);
      }
      console.log(data);
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
      <Button key={"signin"} text="Ingresar" type="submit" disabled={authLoading || userLoading} />
      <Button
        key={"cancel"}
        text="Cancelar"
        variant="secondary"
        onClick={() => handleCurrentView("default")}
        disabled={authLoading || userLoading}
      />
    </form>
  );
}
