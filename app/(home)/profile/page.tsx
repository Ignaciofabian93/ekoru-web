import Banner from "@/components/banner/banner";
import PageWrapper from "../_components/pageWrapper";
import ProfileHeader from "./_components/header";
import PersonalInformation from "./_components/info";
import MyProducts from "./_components/myproducts";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <ProfileHeader />
      <Banner
        title="Información Personal"
        description="Aquí puedes ver y editar los detalles de tu perfil."
        variant="bordered"
      />
      <PersonalInformation />
      <Banner title="Mis Productos" description="Aquí puedes ver y gestionar tus productos." />
      <MyProducts />
    </PageWrapper>
  );
}
