import { CatBreedCardProps } from "@/util/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const PetCard: React.FC<CatBreedCardProps> = ({
  name,
  imageUrl,
  id,
  type,
}) => {
  return (
    <Link
   
      href={{
        pathname: `${id}`,
        query: { type },
      }}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="relative w-full h-0 pb-[75%]">
        <Image
          src={imageUrl}
          alt={name}
          fill          
          className="rounded-lg object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
      </div>     
      <div className="p-4">
        <h3 className="text-lg font-bold text-center">{name}</h3>
      </div>
    </Link>
  );
};

export default PetCard;
