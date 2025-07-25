import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/session/mutations";
import { validateEmail, validateNameLength, validatePassword } from "@/utils/regexValidations";
import useAlert from "@/hooks/useAlert";

type Form = {
  name: string;
  surnames: string;
  businessName: string;
  email: string;
  password: string;
  isCompany: boolean;
};

type Props = {
  handleCurrentView: (view: "login" | "register") => void;
};

export default function useRegister({ handleCurrentView }: Props) {
  const { notify, notifyError } = useAlert();
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

  // GraphQL Query & Submit
  const [register, { loading: authLoading }] = useMutation(REGISTER, {
    onError: (error) => {
      console.error("Error during registration:", error);
      notifyError("Error al registrar usuario");
    },
    onCompleted: (data) => {
      if (data.register.id) {
        notify("Usuario registrado correctamente. Redirigiendo a inicio de sesión");
        setTimeout(() => {
          handleCurrentView("login");
        }, 3000);
      }
    },
  });

  // Fields validations
  const validateFields = (
    email: string,
    password: string,
    name: string,
    surnames: string,
    businessName: string
  ) => {
    const newErrors: typeof errors = {};

    if (!form.isCompany && !name) newErrors.name = "El nombre es requerido";
    else if (!form.isCompany && !validateNameLength(name))
      newErrors.name = "Debe tener entre 2 y 50 caracteres";

    if (!form.isCompany && !surnames) newErrors.surnames = "El/Los apellido(s) son requeridos";
    else if (!form.isCompany && !validateNameLength(surnames))
      newErrors.surnames = "El/Los apellido(s) deben tener entre 2 y 50 caracteres";

    if (!businessName && form.isCompany) newErrors.businessName = "El nombre de la empresa es requerido";

    if (!email) newErrors.email = "El correo es requerido.";
    else if (!validateEmail(email)) newErrors.email = "Formato de correo inválido.";

    if (!password) newErrors.password = "La contraseña es requerida.";
    else if (!validatePassword(password)) newErrors.password = "Formato de contraseña inválido.";

    return newErrors;
  };

  // Inputs handler
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, surnames, email, password, businessName, isCompany } = form;

    if (
      (!isCompany && !name) ||
      (!isCompany && !surnames) ||
      !email ||
      !password ||
      (isCompany && !businessName)
    ) {
      notifyError("Todos los campos son obligatorios");
      return;
    }

    const validationErrors = validateFields(email, password, name, surnames, businessName);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clear previous errors

    await register({
      variables: {
        name: form.name,
        surnames: form.surnames,
        email: form.email,
        password: form.password,
        isCompany: form.isCompany,
        businessName: form.isCompany ? form.businessName : "",
      },
    });
  };

  return {
    form,
    errors,
    isPasswordVisible,
    authLoading,
    handleFormChange,
    togglePasswordVisibility,
    handleSubmit,
  };
}
