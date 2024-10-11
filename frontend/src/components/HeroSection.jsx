import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <span className="px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
        No.1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold mt-4">
        Search, Apply & <br />
        Find <span className="text-[#6a38c2]">Your Dream Job</span>
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Find your next career opportunity with ease—our platform connects you
        with top employers and job listings tailored to your skills and
        aspirations
      </p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto  mt-5">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your dream job!!"
          className="outline-none border-none w-full"
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-r-full bg-[#6a38c2] "
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
