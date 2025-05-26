import TrackInfo from "../../components/user/trackDetailsPage/details/TrackInfo";
import Header from "../../components/user/trackDetailsPage/details/Header";
import Register from "../../components/user/trackDetailsPage/details/Register";
import Outcome from "../../components/user/trackDetailsPage/details/Outcome";
import AdditionalInformation from "../../components/user/trackDetailsPage/details/AdditionalInformation";
import TrackMap from "../../components/user/trackDetailsPage/details/TrackMap";
import { useParams } from "react-router-dom";
import useFetchTrackById from "../../hooks/admin/tracks/useFetchTrackById";
import TopLoader from "../../components/shared/TopLoader";

function getThreeTypes(plan) {
  const found = new Set();
  for (let i = 0; i < plan.levels.length; i++) {
    const stages = plan.levels[i].stages;;
    for (let j = 0; j < stages.length; j++) {
      const type = stages[j].type;
      found.add(type);
      if (found.size === 3) {
        return Array.from(found);
      }
    }
  }
  return Array.from(found);
}
function countStageTypes(plan) {
  const counts = {};
  for (const lvl of plan.levels) {
    for (const stg of lvl.stages) {
      const type = stg.type;
      counts[type] = (counts[type] || 0) + 1;
    }
  }
  return counts;
}

const associatedSkills = [
  { name: "HTML", description: "jgggggggggggggg" },
  { name: "Css", description: "jgggggggggggggg" },
  { name: "HTML", description: "jgggggggggggggg" },
  { name: "CSS", description: "jgggggggggggggg" },
];
const initialPlan = {
  levels:[{
    id: "level1",
    name: "Getting Started",
    description: "Basic foundations",
    order: 1,
    stages: [
      {
        id: "stage1",
        type: "Exam",
        description: "Introduction assessment",
        order: 1,
        passingScore: 70,
      },
      {
        id: "stage2",
        type: "Interview",
        description: "Introduction assessment",
        order: 2,
        passingScore: 70,
      },
      {
        id: "stage3",
        type: "Task",
        description: "Introduction assessment",
        order: 3,
        passingScore: 70,
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
        type: "Interview",
        description: "Introduction assessment",
        order: 1,
        passingScore: 70,
      },
      {
        id: "stage2",
        type: "Interview",
        description: "Introduction assessment",
        order: 2,
        passingScore: 70,
      },
      {
        id: "stage3",
        type: "Interview",
        description: "Introduction assessment",
        order: 3,
        passingScore: 70,
      },
    ],
  },]
};
const description = `This path is designed to help you acquire essential and advanced
skills in front-end web development, starting from the basics to
building complete, real-world projects. It is suitable for both
beginners and professionals looking to enhance their knowledge.`
export default function TrackDetailsPage() {
  const { id } = useParams();
  console.log(id, "id inside track details");
  const {data, isLoading } = useFetchTrackById(id);
  console.log(data,isLoading,'inside track details')
 const stageType= getThreeTypes(data?.data || initialPlan);
 const countTypes = countStageTypes(initialPlan);
 console.log( stageType,'stage type')
 console.log( countTypes,'stage count')
  // if(isLoading )
  //  return  <TopLoader isLoading={isLoading} />
  console.log('hi')
  return (
    <>
      {isLoading && <TopLoader isLoading={isLoading} />}
      {!isLoading &&<> <Header name={data?.data?.name} image={data?.data?.image}      />
      <TrackInfo stageType={stageType} skill={data?.data?.associatedSkills || associatedSkills} description={data?.data?.description|| description} />
      <TrackMap plan={data?.data?.levels || initialPlan.levels} />
      <AdditionalInformation  countTypes={countTypes} />
      <Outcome />
      <Register /> </>}
     
    </>
  );
}
