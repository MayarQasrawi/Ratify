import TrackInfo from "../../components/user/trackDetailsPage/details/TrackInfo";
import Header from "../../components/user/trackDetailsPage/details/Header";
import Register from "../../components/user/trackDetailsPage/details/Register";
import Outcome from "../../components/user/trackDetailsPage/details/Outcome";
import AdditionalInformation from "../../components/user/trackDetailsPage/details/AdditionalInformation";
import TrackMap from "../../components/user/trackDetailsPage/details/TrackMap";
import { useParams } from "react-router-dom";
import useFetchTrackById from "../../hooks/admin/tracks/useFetchTrackById";
import TopLoader from "../../components/shared/TopLoader";
const skill = [
  { skill: "HTML", description: "jgggggggggggggg" },
  { skill: "Css", description: "jgggggggggggggg" },
  { skill: "HTML", description: "jgggggggggggggg" },
  { skill: "CSS", description: "jgggggggggggggg" },
];
const initialPlan = [
  {
    id: "level1",
    name: "Getting Started",
    description: "Basic foundations",
    order: 1,
    stages: [
      {
        id: "stage1",
        type: "Quiz",
        description: "Introduction assessment",
        order: 1,
        PassingScore: 70,
      },
      {
        id: "stage2",
        type: "Quiz",
        description: "Introduction assessment",
        order: 2,
        PassingScore: 70,
      },
      {
        id: "stage3",
        type: "Quiz",
        description: "Introduction assessment",
        order: 3,
        PassingScore: 70,
      },
    ],
  },
  {
    id: "level2",
    name: "Getting Started",
    description: "Basic foundations",
    order: 1,
    stages: [
      {
        id: "stage1",
        type: "Quiz",
        description: "Introduction assessment",
        order: 1,
        PassingScore: 70,
      },
      {
        id: "stage2",
        type: "Quiz",
        description: "Introduction assessment",
        order: 2,
        PassingScore: 70,
      },
      {
        id: "stage3",
        type: "Quiz",
        description: "Introduction assessment",
        order: 3,
        PassingScore: 70,
      },
    ],
  },
];

export default function TrackDetailsPage() {
  const { id } = useParams();
  console.log(id, "id inside track details");
  const {data, isLoading } = useFetchTrackById(2);
  console.log(data)
  if(isLoading )
   return  <TopLoader isLoading={isLoading} />
  console.log('hi')
  return (
    <>
      <Header name={data?.data?.name} image={data?.data?.image}      />
      <TrackInfo skill={skill} />
      <TrackMap plan={initialPlan} />
      <AdditionalInformation />
      <Outcome />
      <Register />
    </>
  );
}
