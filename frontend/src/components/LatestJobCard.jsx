import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div className="grid grid-cols-2">
        <img
          src={job?.company?.logo}
          alt="logo"
          className="w-14 h-14 rounded-full"
        />
        <p className="text-xl text-gray-500 font-bold mt-2 ml-[-23px] ">
          {job.company.name}
        </p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
