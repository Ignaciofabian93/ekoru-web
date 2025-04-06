"use client";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "@/graphql/auth/querys";
import { GET_USER } from "@/graphql/user/querys";
import TextInput from "@/components/textInput/input";
import Button from "@/components/buttons/button";

type Form = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [login, { error: authError, loading: authLoading }] = useLazyQuery(LOGIN);

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
      <TextInput name="email" value={form.email} onChange={handleFormChange} />
      <TextInput name="password" value={form.password} onChange={handleFormChange} />
      <Button text="Submit" type="submit" disabled={authLoading || userLoading} />
    </form>
  );
}
