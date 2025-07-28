"use client";
import Banner from "@/ui/banner/banner";
import PageWrapper from "../_ui/pageWrapper";
import PersonalInformation from "../_ui/info";
import ProfileHeader from "../_ui/product/header";
import useSessionStore from "@/store/session";
import MyProducts from "./_ui/myproducts";

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
