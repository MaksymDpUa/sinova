import React from "react";
import { BreedDetails } from "@/util/types";

interface CatDetailsCardProps {
  details: BreedDetails;
}

const CatDetailsCard: React.FC<CatDetailsCardProps> = ({ details }) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{details.breeds[0].name}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Life span:</strong> {details.breeds[0].life_span}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Temperament:</strong> {details.breeds[0].temperament}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {details.breeds[0].description}
      </p>
    </div>
  );
};

export default CatDetailsCard;
