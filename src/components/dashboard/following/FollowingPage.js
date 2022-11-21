import Heading from "../../layout/Heading";
import GetFollowers from "./GetFollowers";

export default function FollowingPage() {
  return (
    <div className="theme-page-container mx-3">
      <Heading title="Following" />
      <GetFollowers />
    </div>
  );
}
