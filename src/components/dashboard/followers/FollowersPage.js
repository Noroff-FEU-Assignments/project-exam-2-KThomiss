import Heading from "../../layout/Heading";
import GetFollowers from "./GetFollowers";

export default function FollowersPage() {
  return (
    <div className="theme-page-container mx-3">
      <Heading title="Follower feed"></Heading>
      <GetFollowers />
    </div>
  );
}
