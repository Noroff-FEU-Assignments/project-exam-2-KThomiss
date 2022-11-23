import GetFollowers from "./GetFollowers";
import Heading from "../../layout/Heading";

export default function FollowingPage() {
  return (
    <div className="theme-page-container mx-3">
      <div className="intro-container">
        <Heading title="Following" />
      </div>
      <GetFollowers />
    </div>
  );
}
