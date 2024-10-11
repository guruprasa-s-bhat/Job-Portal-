import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();


  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          aria-label="Bookmark Job"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button
          variant="outline"
          className="p-6"
          size="icon"
          aria-label="Company Logo"
        >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">
            {job?.company?.name || "Company Name"}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <p className="font-bold text-lg my-2">{job?.title || "Job Title"}</p>
        <p className="text-sm text-gray-600">
          {job?.description || "Job Description"}
        </p>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || "N/A"} positions
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType || "N/A"}
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.salary || "N/A"} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
