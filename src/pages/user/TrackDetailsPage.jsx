import TrackInfo from "../../components/user/trackDetailsPage/details/TrackInfo";
import Header from "../../components/user/trackDetailsPage/details/Header";
import Register from "../../components/user/trackDetailsPage/details/Register";
import Outcome from "../../components/user/trackDetailsPage/details/Outcome";
import AdditionalInformation from "../../components/user/trackDetailsPage/details/AdditionalInformation";
const skill=[
  {skill:'HTML',description:'jgggggggggggggg'},
  {skill:'Css',description:'jgggggggggggggg'},
  {skill:'HTML',description:'jgggggggggggggg'},
  {skill:'CSS',description:'jgggggggggggggg'},
]
export default function TrackDetailsPage() {
  return (
    <>
      <Header />
      <TrackInfo skill={skill} />
      <Outcome />
      <AdditionalInformation />
      <Register />
   
    </>
  );
}
