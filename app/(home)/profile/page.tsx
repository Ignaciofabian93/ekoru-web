"use client";
import Banner from "@/components/banner/banner";
import PageWrapper from "../_components/pageWrapper";
import PersonalInformation from "../_components/info";
import ProfileHeader from "../_components/header";
import useSessionStore from "@/store/session";
import MyProducts from "./_components/myproducts";

export default function ProfilePage() {
  const { data, edit, toggleEdit } = useSessionStore();

  return (
    <PageWrapper>
      <ProfileHeader user={data} edit={edit} toggleEdit={toggleEdit} />
      <Banner
        title="Información Personal"
        description="Aquí puedes ver y editar los detalles de tu perfil."
        variant="bordered"
      />
      <PersonalInformation user={data} />
      <Banner title="Mis Productos" description="Aquí puedes ver y gestionar tus productos." />
      <MyProducts />
    </PageWrapper>
  );
}
