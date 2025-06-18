import Container from "../../general/Container";
import img from "@/assets/img/animation/Animation - 1749732404506.json"
import Lottie from "lottie-react";
export const StatusDisplay = ({ status, color, message }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 w-sm border border-gray-100">
      {/* Status Badge */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Status</div>
        <div className={`px-8 py-3 rounded-lg text-base font-bold ${color.bg} ${color.text} shadow-sm`}>{status}</div>
     

        {/* Message */}
        <p className="text-center text-gray-600 text-sm mt-4 leading-relaxed">{message}</p>
      </div>
    </div>

     </div>
)
const StatusContainer = ({ stage, color, message }) => (
  <Container header="Status">
    <StatusDisplay status={stage} color={color} message={message} />
  </Container>
);

export default StatusContainer;