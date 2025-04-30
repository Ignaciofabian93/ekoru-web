"use client";
import { useState } from "react";
import LoginForm from "./forms/login";
import RegisterForm from "./forms/register";

export default function ActionPanel() {
  const [currentView, setCurrentView] = useState<"login" | "register">("login");

  const handleCurrentView = (view: string) => {
    if (view === "login") {
      setCurrentView("login");
    } else if (view === "register") {
      setCurrentView("register");
    }
  };

  const Views = {
    login: <LoginForm handleCurrentView={handleCurrentView} />,
    register: <RegisterForm handleCurrentView={handleCurrentView} />,
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">{Views[currentView]}</div>
    </div>
  );
}
