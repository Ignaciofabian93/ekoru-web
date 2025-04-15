"use client";
import { useState } from "react";
import Button from "@/components/buttons/Button";
import LoginForm from "../_forms/login";
import RegisterForm from "../_forms/register";

const MainAction = ({ handleCurrentView }: { handleCurrentView: (view: string) => void }) => {
  return (
    <>
      <Button text="Registrarse" variant="primary" onClick={() => handleCurrentView("register")} />
      <Button text="Ingresar" variant="secondary" onClick={() => handleCurrentView("login")} />
    </>
  );
};

export default function ActionPanel() {
  const [currentView, setCurrentView] = useState<"default" | "login" | "register">("default");

  const handleCurrentView = (view: string) => {
    if (view === "default") {
      setCurrentView("default");
    } else if (view === "login") {
      setCurrentView("login");
    } else if (view === "register") {
      setCurrentView("register");
    }
  };

  const Views = {
    default: <MainAction handleCurrentView={handleCurrentView} />,
    login: <LoginForm handleCurrentView={handleCurrentView} />,
    register: <RegisterForm handleCurrentView={handleCurrentView} />,
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">{Views[currentView]}</div>
    </div>
  );
}
