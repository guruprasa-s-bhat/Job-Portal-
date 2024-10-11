import React from "react";
import Navbar from "../shared/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const shortlist = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 shadow-lg">
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((apply) => (
              <TableRow key={apply._id}>
                <TableCell className="font-medium">
                  {apply?.applicant?.fullname}
                </TableCell>
                <TableCell>{apply?.applicant?.email}</TableCell>
                <TableCell>{apply?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {apply.applicant.profile?.resumeOriginalName ? (
                    <a
                      href={apply?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline cursor-pointer"
                    >
                      {apply.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>

                <TableCell>
                  {apply?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlist.map((status, i) => {
                        return (
                          <div
                            className="flex items-center cursor-pointer my-2"
                            onClick={() => statusHandler(status, apply?._id)}
                            key={i}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
