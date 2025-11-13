import React from "react";
import "../assets/css/Breeds.css";
import BreedsList from "../components/BreedsList";
import Particles from "../components/react-bits/Particles";

export default function Razze() {
  return (
    <div className="py-4">
      <Particles particleCount={1000} particleSpread={10} speed={0.15} particleColors={["#603c3c", "#b2922b", "#7e5b09"]} particleBaseSize={80} />

      <BreedsList />
    </div>
  );
}
