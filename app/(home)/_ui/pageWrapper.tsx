"use client";
import { useState } from "react";
import Button from "@/ui/buttons/button";
import Footer from "@/ui/footer/footer";
import Modal from "@/ui/modal/modal";
import Navbar from "@/ui/navigation/navbar";
import SubNavigation from "@/ui/navigation/subNavigation";
import ProductForm from "../product/_ui/form";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showForm, setShowForm] = useState(false);

  const closeForm = () => setShowForm(false);
  const openForm = () => setShowForm(true);

  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-full h-full mt-[80px]">
        <SubNavigation />
        <div className="w-full h-fit mx-auto relative">
          {children}
          <div className="fixed bottom-8 right-4 z-[9999] w-[120px] shadow-lg shadow-slate-800/50 rounded-full border-2 border-white">
            <Button text="Subir Producto" variant="primary" onClick={openForm} />
          </div>
          <Modal title={"Añadir producto"} isOpen={showForm} close={closeForm} size="lg">
            <ProductForm />
          </Modal>
        </div>
        <Footer />
      </div>
    </main>
  );
}
