import ProfilesList from "./ProfilesList";
import Heading from "../../layout/Heading";

export default function ProfilesPage() {
  document.title = "Profiles | ToAd";
  return (
    <div className="theme-page-container px-3">
      <div className="profiles-intro-container">
        <Heading title="User profiles" />
      </div>
      <ProfilesList />
    </div>
  );
}
