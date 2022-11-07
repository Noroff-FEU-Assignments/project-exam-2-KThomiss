import ProfilesList from "./ProfilesList";
import Heading from "../../layout/Heading";

export default function ProfilesPage() {
  document.title = "Profiles | ToAd";
  return (
    <>
      <Heading title="User profiles" />
      <ProfilesList />
    </>
  );
}
