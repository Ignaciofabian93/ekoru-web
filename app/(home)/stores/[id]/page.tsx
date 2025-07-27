"use client";
import Banner from "@/components/banner/banner";
import ProfileHeader from "../../_components/header";
import PageWrapper from "../../_components/pageWrapper";
import PersonalInformation from "../../_components/info";
import ProfileProducts from "../../_components/profileProducts";
import useUser from "../../user/_hooks/useUser";

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
