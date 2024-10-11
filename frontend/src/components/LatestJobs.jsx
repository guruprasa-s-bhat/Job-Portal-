import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  if (!allJobs) {
    return (
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          <span>No Job Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
