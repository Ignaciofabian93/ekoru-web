import PageWrapper from "../components/pageWrapper";
import ProfileHeader from "./_components/header";
import PersonalInformation from "./_components/info";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <ProfileHeader />
      <PersonalInformation />
    </PageWrapper>
  );
}
