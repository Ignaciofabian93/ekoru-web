"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./forms/login"), {
  ssr: false,
});

const RegisterForm = dynamic(() => import("./forms/register"), {
  ssr: false,
});

export default function ActionPanel() {
  const client = useApolloClient();
  const [currentView, setCurrentView] = useState<"login" | "register">("login");

  // Memoize the handler to avoid unnecessary re-renders
  const handleCurrentView = useCallback((view: "login" | "register") => setCurrentView(view), []);

  // Memoize the Views object
  const Views = useMemo(
    () => ({
      login: <LoginForm handleCurrentView={handleCurrentView} />,
      register: <RegisterForm handleCurrentView={handleCurrentView} />,
    }),
    [handleCurrentView]
  );

  useEffect(() => {
    if (currentView === "login") {
      client.clearStore();
    }
  }, [currentView, client]);

  return (
    <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-start md:justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {Views[currentView]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
