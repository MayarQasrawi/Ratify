import TrackInfo from "../../components/user/trackDetailsPage/details/TrackInfo";
import Header from "../../components/user/trackDetailsPage/details/Header";
import Register from "../../components/user/trackDetailsPage/details/Register";
import Outcome from "../../components/user/trackDetailsPage/details/Outcome";
import AdditionalInformation from "../../components/user/trackDetailsPage/details/AdditionalInformation";

export default function TrackDetailsPage() {
  return (
    <>
      <Header />
      <TrackInfo />
      <Outcome />
      <AdditionalInformation />
      <Register />
    </>
  );
}
