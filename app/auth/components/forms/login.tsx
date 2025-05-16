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
import { validateEmail, validatePassword } from "@/utils/regexValidations";
import { Eye, EyeOff } from "lucide-react";
import { colors } from "@/constants/colors";

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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const validateFields = (email: string, password: string) => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "El correo es requerido.";
    else if (!validateEmail(email)) newErrors.email = "Formato de correo inválido.";

    if (!password) newErrors.password = "La contraseña es requerida.";
    else if (!validatePassword(password))
      newErrors.password = "Debe tener al menos 1 mayúscula, 1 número, 4-16 caracteres.";

    return newErrors;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";

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

  const [GetMe, { error: authError, loading }] = useLazyQuery(GET_PROFILE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    const validationErrors = validateFields(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clear previous errors

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
        errorMessage={errors.email}
      />
      <TextInput
        key={"password"}
        name="password"
        placeholder="Contraseña"
        type="password"
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
