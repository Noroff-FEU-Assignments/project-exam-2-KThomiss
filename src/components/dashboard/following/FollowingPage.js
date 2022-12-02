import GetFollowers from "./GetFollowers";
import Heading from "../../layout/Heading";
import ScrollToTop from "../../common/ScrollToTopOfPage";

export default function FollowingPage() {
  return (
    <div className="theme-page-container mx-3">
      <div className="intro-container">
        <Heading title="User Profiles" />
        <div className="d-flex justify-content-between">
          <Heading size={2} title="See what your followers are up to." />
          <ScrollToTop />
        </div>
      </div>
      <GetFollowers />
    </div>
  );
}
