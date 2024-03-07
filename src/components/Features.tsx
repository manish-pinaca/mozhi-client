import React from "react";

import Card from "./Card";
import { Button } from "./ui/button";

export interface Feature {
  id: number;
  label: string;
}

const features: Feature[] = [
  {
    id: 1,
    label: "Scrapping, Processing and Translation",
  },
  {
    id: 2,
    label: "Processing and Translation",
  },
  {
    id: 3,
    label: "Translation",
  },
];

const Features: React.FC = () => {
  return (
    <div className="overflow-auto flex flex-col">
      <div className="flex flex-wrap gap-6 justify-center mt-[5%]">
        {features.map((feature) => (
          <Card key={feature.id} feature={feature} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-[5%]">
        <Button className="px-20 py-6 bg-[#D0D0FF] text-[#575757] text-2xl hover:bg-[#8F6EFE] hover:text-white font-bold">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Features;
