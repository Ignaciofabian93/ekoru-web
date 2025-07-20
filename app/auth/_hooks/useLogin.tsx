import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/regexValidations";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/app/auth/_graphql/query";
import useAlert from "@/hooks/useAlert";
import useSessionStore from "@/store/session";
import Login from "@/services/auth/rest-auth";

type Form = {
  email: string;
  password: string;
};

export default function useLogin() {
  const router = useRouter();
  const { notify, notifyError } = useAlert();
  const { handleSession } = useSessionStore();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  // GraphQL Query and Submit
  const [GetMe, { error: authError, loading }] = useLazyQuery(GET_PROFILE);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  // Fields validation
  const validateFields = (email: string, password: string) => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "El correo es requerido.";
    else if (!validateEmail(email)) newErrors.email = "Formato de correo inválido.";

    if (!password) newErrors.password = "La contraseña es requerida.";

    return newErrors;
  };

  // Inputs handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";

    if (name === "email" && value.length > 0) {
      if (!validateEmail(value)) error = "Formato de correo inválido";
      else if (value.length > 50) error = "El correo no puede tener más de 50 caracteres";
      else error = "";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      notifyError("Todos los campos son obligatorios");
    }

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
        setTimeout(() => {
          router.replace("/feed");
        }, 2500);
      }
    } else {
      notifyError("Error al intentar iniciar sesión.");
    }
  };

  return {
    form,
    errors,
    isPasswordVisible,
    loading,
    handleFormChange,
    togglePasswordVisibility,
    handleSubmit,
  };
}
