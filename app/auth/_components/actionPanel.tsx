"use client";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./forms/login";
import RegisterForm from "./forms/register";

export default function ActionPanel() {
  const client = useApolloClient();
  const [currentView, setCurrentView] = useState<"login" | "register">("login");

  const handleCurrentView = (view: "login" | "register") => setCurrentView(view);

  const Views = {
    login: <LoginForm handleCurrentView={handleCurrentView} />,
    register: <RegisterForm handleCurrentView={handleCurrentView} />,
  };

  useEffect(() => {
    if (currentView === "login") {
      client.clearStore();
    }
  }, [currentView]);

  return (
    <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-start md:justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {Views[currentView]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
