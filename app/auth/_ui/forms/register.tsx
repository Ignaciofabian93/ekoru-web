"use client";
import { colors } from "@/constants/colors";
import { Eye, EyeOff } from "lucide-react";
import TextInput from "@/ui/textInput/input";
import Button from "@/ui/buttons/button";
import CheckBox from "@/ui/checkbox/checkbox";
import useRegister from "../../_hooks/useRegister";

type RegisterForm = {
  handleCurrentView: (view: "login" | "register") => void;
};

export default function RegisterForm({ handleCurrentView }: RegisterForm) {
  const {
    form,
    errors,
    isPasswordVisible,
    authLoading,
    handleFormChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useRegister({ handleCurrentView });

  return (
    <form onSubmit={handleSubmit} className="w-full h-full pb-8 md:pb-0">
      <div className="w-full flex flex-col md:flex-row md:gap-4 transition-all duration-300 ease-in-out">
        {form.isCompany ? (
          <TextInput
            key={"businessName"}
            name="businessName"
            placeholder="Razón Social"
            type="text"
            value={form.businessName}
            onChange={handleFormChange}
            errorMessage={errors.businessName}
          />
        ) : (
          <>
            <TextInput
              key={"name"}
              name="name"
              placeholder="Nombre"
              type="text"
              value={form.name}
              onChange={handleFormChange}
              errorMessage={errors.name}
            />
            <TextInput
              key={"surnames"}
              name="surnames"
              placeholder="Apellido(s)"
              type="text"
              value={form.surnames}
              onChange={handleFormChange}
              errorMessage={errors.surnames}
            />
          </>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row md:gap-4">
        <TextInput
          key={"email"}
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          errorMessage={errors.email}
        />
        <TextInput
          key={"password"}
          placeholder="Contraseña"
          type={isPasswordVisible ? "text" : "password"}
          name="password"
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
          infoIcon
          infoText="Debe tener al menos 1 mayúscula, 1 número, 4-16 caracteres."
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
      <Button text="Registrarse" type="submit" isLoading={authLoading} className="mt-6" />
      <Button
        text="Volver"
        type="button"
        variant="secondary"
        disabled={authLoading}
        isLoading={false}
        className="mt-4"
        onClick={() => handleCurrentView("login")}
      />
    </form>
  );
}
