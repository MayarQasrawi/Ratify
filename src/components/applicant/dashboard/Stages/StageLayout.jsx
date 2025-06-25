

import Feedback from './Feedback';
import Header from './Header';
function StageLayout({header ,feedbackId,Children,stagePassingScore}) {



      let mockFeedbackData = null;
  // if(feedbackId){
  //      mockFeedbackData = {
  //   score: 18,
  //   total: 20,
  //   feedback:
  //     "Excellent design and responsiveness. Add comments in the code to enhance readability.",
  //   passingScore: 12,
  //   detailedFeedback: {
  //     "UI Design": {
  //       score: 8,
  //       total: 10,
  //       strengths:
  //         "The layout is clean, well-structured, and the color scheme is consistent.",
  //       improvements:
  //         "Enhance text and background contrast for better readability, especially for light colors.",
  //     },
  //     "Styling (CSS)": {
  //       score: 7,
  //       total: 10,
  //       strengths: "Responsive layout and well-organized class structure.",
  //       improvements:
  //         "Use variables for consistent theming and reduce repetition.",
  //     },
  //     "Functionality (JavaScript)": {
  //       score: 6,
  //       total: 10,
  //       strengths: "Good use of state and component structure.",
  //       improvements: "Improve error handling and loading states.",
  //     },
  //     "Code cleanness": {
  //       score: 9,
  //       total: 10,
  //       strengths: "Readable code with meaningful naming conventions.",
  //       improvements: "Add inline comments for complex logic blocks.",
  //     },
  //   },
  // };
  // }
console.log("feedbackId", feedbackId);

  return (
    <main className="flex flex-col items-center justify-center p-2 max-w-5xl mx-auto ">
      <Header header={header} />
      <section className="w-full flex flex-col items-center ">
        {Children}
      </section>


   { feedbackId &&
    <Feedback data={mockFeedbackData}  id={feedbackId} stagePassingScore={stagePassingScore} />}


     </main>

  )
}

export default StageLayout;
