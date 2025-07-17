"use client";
import { Eye, EyeOff } from "lucide-react";
import { colors } from "@/constants/colors";
import Button from "@/components/buttons/button";
import TextInput from "@/components/textInput/input";
import useLogin from "@/app/auth/_hooks/useLogin";

type LoginForm = {
  handleCurrentView: (view: "login" | "register") => void;
};

export default function LoginForm({ handleCurrentView }: LoginForm) {
  const { form, errors, isPasswordVisible, loading, handleFormChange, togglePasswordVisibility, handleSubmit } =
    useLogin();

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center md:w-[80%]">
      <TextInput
        key={"email"}
        name="email"
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={handleFormChange}
        errorMessage={errors.email}
      />
      <TextInput
        key={"password"}
        name="password"
        placeholder="Contraseña"
        type={isPasswordVisible ? "text" : "password"}
        value={form.password}
        onChange={handleFormChange}
        errorMessage={errors.password}
        icon={
          isPasswordVisible ? (
            <EyeOff onClick={togglePasswordVisibility} color={colors.primary} />
          ) : (
            <Eye onClick={togglePasswordVisibility} color={colors.primary} />
          )
        }
      />
      <Button key={"signin"} text="Ingresar" type="submit" disabled={loading} isLoading={loading} size="full" />
      <span
        className="text-sm text-primary cursor-pointer text-center font-semibold mt-2"
        onClick={() => handleCurrentView("register")}
      >
        ¿No tienes una cuenta?. Regístrate aquí
      </span>
    </form>
  );
}
