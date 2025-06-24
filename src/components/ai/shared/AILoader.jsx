import Lottie from 'lottie-react';
import aiLoader from '../../../assets/img/animation/AILoader.json';
export default function AILoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Lottie animationData={aiLoader} loop autoplay style={{ height: 320, width: 320 }} />
    </div>
  );
}
