import ProfilesList from "./ProfilesList";
import Heading from "../../layout/Heading";
import ScrollToTop from "../../common/ScrollToTopOfPage";

export default function ProfilesPage() {
  document.title = "Profiles | ToAd";
  return (
    <div className="theme-page-container px-3">
      <div className="intro-container">
        <Heading title="User Profiles" />
        <div className="d-flex justify-content-between">
          <Heading size={2} title="View profile to see their posts and activites." />
          <ScrollToTop />
        </div>
      </div>
      <ProfilesList />
    </div>
  );
}
