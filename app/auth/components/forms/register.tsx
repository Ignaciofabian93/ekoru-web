"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/auth/mutations";
import { toast } from "react-toastify";
import { colors } from "@/constants/colors";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail, validateNameLength, validatePassword } from "@/utils/regexValidations";
import TextInput from "@/components/textInput/input";
import Button from "@/components/buttons/button";
import CheckBox from "@/components/checkbox/checkbox";

type Form = {
  name: string;
  surnames: string;
  businessName: string;
  email: string;
  password: string;
  isCompany: boolean;
};

type RegisterForm = {
  handleCurrentView: (view: "login" | "register") => void;
};

export default function RegisterForm({ handleCurrentView }: RegisterForm) {
  const notify = (message: string) =>
    toast.success(message, { style: { backgroundColor: colors.primary, color: "#f7f7f7" } });
  const notifyError = (error: string) =>
    toast.error(error, { style: { backgroundColor: "#D32F2F", color: "#f7f7f7" } });
  const [form, setForm] = useState<Form>({
    name: "",
    surnames: "",
    businessName: "",
    email: "",
    password: "",
    isCompany: false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    surnames?: string;
    businessName?: string;
  }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  // Fields validations
  const validateFields = (email: string, password: string, name: string, surnames: string, businessName: string) => {
    const newErrors: typeof errors = {};

    if (!name) newErrors.name = "El nombre es requerido";
    else if (!validateNameLength(name)) newErrors.name = "Debe tener entre 2 y 50 caracteres";

    if (!surnames) newErrors.surnames = "El/Los apellido(s) son requeridos";
    else if (!validateNameLength(surnames))
      newErrors.surnames = "El/Los apellido(s) deben tener entre 2 y 50 caracteres";

    if (!businessName && form.isCompany) newErrors.businessName = "El nombre de la empresa es requerido";

    if (!email) newErrors.email = "El correo es requerido.";
    else if (!validateEmail(email)) newErrors.email = "Formato de correo inválido.";

    if (!password) newErrors.password = "La contraseña es requerida.";
    else if (!validatePassword(password)) newErrors.password = "Formato de contraseña inválido.";

    return newErrors;
  };

  // Inputs handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") setForm({ ...form, isCompany: e.target.checked });
    else setForm({ ...form, [name]: value });

    let error = "";

    if ((name === "name" && value.length > 0) || (name === "surnames" && value.length > 0))
      if (!validateNameLength(value)) error = "Debe tener entre 2 y 50 caracteres";

    if (name === "businessName" && value.length > 0)
      if (!validateNameLength(value)) error = "Debe tener entre 2 y 50 caracteres";

    if (name === "email" && value.length > 0) {
      if (!validateEmail(value)) error = "Formato de correo inválido";
      else if (value.length > 50) error = "El correo no puede tener más de 50 caracteres";
      else error = "";
    }

    if (name === "password" && value.length > 0) {
      if (!validatePassword(value)) error = "Formato de contraseña inválido";
      else if (value.length > 16) error = "La contraseña no puede tener más de 16 caracteres";
      else error = "";
    }

    setErrors({ ...errors, [name]: error });
  };

  // GraphQL Query & Submit
  const [register, { error: authError, loading: authLoading }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, surnames, email, password, businessName, isCompany } = form;
    if ((!isCompany && !name) || (!isCompany && !surnames) || !email || !password || (isCompany && !businessName)) {
      notifyError("Todos los campos son obligatorios");
    }

    const validationErrors = validateFields(email, password, name, surnames, businessName);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clear previous errors

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
      <Button text="Registrarse" type="submit" disabled={authLoading} className="mt-6" />
      <Button
        text="Volver"
        type="button"
        variant="secondary"
        disabled={authLoading}
        className="mt-4"
        onClick={() => handleCurrentView("login")}
      />
    </form>
  );
}
