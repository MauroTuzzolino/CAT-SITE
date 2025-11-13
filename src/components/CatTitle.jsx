import Shuffle from "./react-bits/ShuffleTitle";

const CatTitle = ({ title }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4" style={{ height: 70 }}>
      <Shuffle
        text={title}
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.1}
        triggerOnce={true}
        triggerOnHover={true}
        respectReducedMotion={true}
      />
    </div>
  );
};
export default CatTitle;
