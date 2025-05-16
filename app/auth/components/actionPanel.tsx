"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginForm from "./forms/login";
import RegisterForm from "./forms/register";

export default function ActionPanel() {
  const [currentView, setCurrentView] = useState<"login" | "register">("login");

  const handleCurrentView = (view: "login" | "register") => setCurrentView(view);

  const Views = {
    login: <LoginForm handleCurrentView={handleCurrentView} />,
    register: <RegisterForm handleCurrentView={handleCurrentView} />,
  };

  return (
    <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-start md:justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {Views[currentView]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
