"use client";
import { useRouter } from "next/navigation";
import PageWrapper from "../_ui/pageWrapper";
import Button from "@/ui/buttons/button";

export default function CartPage() {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Próximamente!</h1>
        <p className="text-gray-600 text-center max-w-md">
          La página de carrito no está disponible en la versión MVP.
          <br />
          Estará habilitada cuando se despliegue la versión final de EKORU.
        </p>
        <div className="flex flex-col items-center mt-6 max-w-[400px] w-full">
          <Button text="Volver al inicio" variant="primary" onClick={() => router.push("/")} />
        </div>
      </div>
    </PageWrapper>
  );
}
