import PageWrapper from "../_components/pageWrapper";
import ProfileHeader from "./_components/header";
import PersonalInformation from "./_components/info";
import MyProducts from "./_components/myproducts";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <ProfileHeader />
      <PersonalInformation />
      <MyProducts />
    </PageWrapper>
  );
}
