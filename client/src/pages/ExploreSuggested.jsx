import React from "react";
import SuggestedFCard from "../components/card/SuggestedFCard";
import NavHeader from "../components/navbar/NavHeader";

const ExploreSuggested = () => {
  return (
    <div>
      <div>
        <NavHeader />
        <div className="mx-auto  md:px-64 md:mt-20 mt-16">
          <div className="w-full lg:mt-30">
            <h1 className="text-center mb-6">Suggested</h1>
            <div className="bg-white shadow-lg min-h-screen md:w-3/5 m-auto w-full px-4 py-4">
              <SuggestedFCard />
              <SuggestedFCard />
              <SuggestedFCard />
              <SuggestedFCard />
              <SuggestedFCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSuggested;
