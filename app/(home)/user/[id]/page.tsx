"use client";
import Banner from "@/ui/banner/banner";
import ProfileHeader from "../../_ui/header";
import PageWrapper from "../../_ui/pageWrapper";
import PersonalInformation from "../../_ui/info";
import useUser from "../_hooks/useUser";
import ProfileProducts from "../../_ui/profileProducts";

export default function UserPage() {
  const { user, userLoading } = useUser();

  if (userLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center min-h-[300px]">Cargando perfil...</div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center min-h-[300px]">Usuario no encontrado.</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ProfileHeader user={user} />
      <Banner
        title="Información Personal"
        description="Aquí puedes ver los detalles del perfil."
        variant="bordered"
      />
      <PersonalInformation user={user} />
      <Banner
        title={`Productos de ${user?.name || user?.businessName}`}
        description="Aquí puedes ver sus productos y encontrar lo que buscas."
      />
      <ProfileProducts />
    </PageWrapper>
  );
}
