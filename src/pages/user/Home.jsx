import Achievements from "../../components/user/achievements/Achievements";
import Tracks from "../../components/user/tracks/Tracks";
import Work from "../../components/user/works/Work";

export default function Home() {
  return (
    <>
      <Tracks/>
      <Work />
      <Achievements />
    </>
  )
}
