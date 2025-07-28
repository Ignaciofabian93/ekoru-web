"use client";

import Button from "@/ui/buttons/button";
import PageWrapper from "../_ui/pageWrapper";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Error en la página de feed:", error);
  return (
    <PageWrapper>
      <p className="text-gray-600 text-center max-w-md mb-4">
        Lo sentimos, algo salió mal al cargar el feed.
        <br />
        Por favor, intenta recargar la página.
      </p>
      <div className="flex justify-center items-center min-w-[400px] w-full">
        <Button onClick={reset} text="Reintentar" />
      </div>
    </PageWrapper>
  );
}
