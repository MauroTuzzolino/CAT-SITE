import Lottie from "lottie-react";
import catLoading from "../assets/svg/CatLoading.json";

const CatSpinner = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Lottie animationData={catLoading} loop={true} style={{ width: 180, height: 180 }} />
      <p className="mt-3 text-secondary">Caricamento in corso...</p>
    </div>
  );
};
export default CatSpinner;
