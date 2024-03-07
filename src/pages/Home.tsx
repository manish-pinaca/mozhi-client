import React from "react";

import Features from "@/components/Features";
import Navbar from "@/components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="lg:w-[90%] lg:h-[90vh] m-auto bg-[#F5F4F8] lg:rounded-[100px] py-[20px]">
      <Navbar />
      <Features />
    </div>
  );
};

export default Home;
