import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/Context/AuthProvider";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { CurrentUserContext } from "../components/Context/CurrentUserProvider";
import toast from "react-hot-toast";

const FindJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const { currentUser, fetchCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/creaters/getalljobs");
      if (!response.ok) {
        throw new Error("Failed to fetch all jobs");
      }
      const data = await response.json();
      const jobsWithCreators = await Promise.all(
        data.data.map(async (job) => {
          const creator = await fetchCreator(job.createrId);
          return { ...job, creator };
        })
      );
      setAllJobs(jobsWithCreators);
    } catch (error) {
      console.error("Error fetching all jobs:", error);
    }
  };
  // Function to fetch creator details based on createrId and createrType
  const fetchCreator = async (createrId) => {
    try {
      const response = await fetch(
        `/api/v1/experts/getexpertbyid?string=${encodeURIComponent(createrId)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch creator details while fetching jobs");
      }
      const creator = await response.json();
      return creator["data"];
    } catch (error) {
      console.error("Error fetching job creator details:", error);
      return null;
    }
  };

  const handleJobApplyButtonClick = async (jobId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/applyjob?jobId=${encodeURIComponent(
          jobId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to apply job");
      }
      const creator = await response.json();
      fetchData();
      toast.success("Job Applied Successfully");
    } catch (error) {
      console.error("Error applying job : ", error);
      return null;
    }
  };

  const handleUnsaveJobButton = async (jobId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/unsavejob?jobId=${encodeURIComponent(
          jobId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unsave the job");
      }
      const responseData = await response.json();
      toast.success("Job Unsaved Successfully");
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to Unsave Job", error);
    }
  };

  const handleSaveJobButton = async (jobId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/savejob?jobId=${encodeURIComponent(
          jobId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save job");
      }
      const responseData = await response.json();
      toast.success("Job Saved Successfully");
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to Save Job", error);
    }
  };

  const handleAllJobsClick = () => {
    fetchData();
  };

  const handleJobsAppliedClick = async () => {
    await fetchData();
    setAllJobs((allJobs) =>
      allJobs.filter((job) => job.appliedBy.includes(currentUser._id))
    );
  };

  const handleJobsPostedClick = async () => {
    await fetchData();
    setAllJobs((allJobs) =>
      allJobs.filter((job) => job.createrId === currentUser._id)
    );
  };

  const handleSavedJobsClick = async () => {
    await fetchData();
    setAllJobs((allJobs) =>
      allJobs.filter((job) => job.savedBy.includes(currentUser._id))
    );
  };

  return (
    <section class="flex flex-col bg-gray-950/90 min-h-96 w-full">
      <div class="bg-transparent min-h-32 mt-24 xl:mx-32 mb-10">
        <h1 className="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl">
          Find <span className="text-green-600">Jobs</span> Best Suited For You
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>
      </div>

      <div class="flex lg:flex-row flex-col bg-transparent xl:mx-24 h-screen gap-4">
        <div class="bg-transparent h-48 lg:w-1/4 w-full flex flex-col gap-6 px-16 mt-2">
          <button
            onClick={() => handleAllJobsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-600/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
          >
            All Jobs
          </button>
          {currentUser.userType === "User" ? (
            <button
              onClick={() => handleJobsAppliedClick()}
              className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-600/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
            >
              Jobs Applied
            </button>
          ) : (
            <button
              onClick={() => handleJobsPostedClick()}
              className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-600/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
            >
              Jobs Posted
            </button>
          )}
          <button
            onClick={() => handleSavedJobsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-600/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
          >
            Saved Jobs
          </button>
        </div>

        <div class="bg-transparent lg:w-4/5 w-full flex flex-col overflow-y-auto">
          {allJobs.map((job, index) => (
            <div
              key={index}
              class="bg-gray-200 rounded-2xl md:mx-auto max-w-screen-md border-2 border-gray-800 mb-4 w-full"
            >
              <div class="px-8 py-2 md:p-10">
                <div class="text-md md:text-xl font-medium leading-tight text-gray-800 mb-2 flex flex-row relative">
                  <p className="">
                    {job.jobTitle}{" "}
                    <span className="italic text-2xl">
                      {" "}
                      @ {job.jobOrganisation}
                    </span>
                  </p>
                  {currentUser.jobsSaved.includes(job._id) ? (
                    <button
                      onClick={() => handleUnsaveJobButton(job._id)}
                      className="absolute right-0 text-3xl"
                    >
                      <FaBookmark />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveJobButton(job._id)}
                      className="absolute right-0 text-3xl"
                    >
                      <FaRegBookmark />
                    </button>
                  )}
                </div>
                <p class="text-xs md:text-sm font-normal leading-normal text-gray-800 mb-2 italic">
                  Posted On - {job.postedOn.slice(0, 15)} | {job.jobCategory} |{" "}
                  {job.jobSalary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 bg-transparent font-serif font-extrabold ml-4">
                  <p>Req. Qualification : {job.requiredQualification}</p>
                  <p>Valid Till : {job.validTill}</p>
                  <p>Req. Skills : {job.requiredSkills}</p>
                  <p>Req. Experience : {job.requiredExperience} years</p>
                  <p>Job Location : {job.jobLocation}</p>
                  <p>Job Type : {job.jobType}</p>
                </div>
                <p className="mb-4 ml-4">
                  Job Description : {job.jobDescription}
                </p>
                <p className="italic mb-2">Posted by -</p>
                <div className="flex flex-row bg-transparent">
                  <img
                    src={job.creator.avatar}
                    className="size-14 rounded-full object-cover"
                    alt=""
                  />
                  <div className="flex flex-col ml-4 w-5/6 ">
                    <p className="text-green-600 font-extrabold">
                      {job.creator.fullname}
                    </p>
                    <p>{job.creator.currentPosition}</p>
                  </div>
                  {currentUser._id === job.createrId && (
                    <button className="flex flex-row md:text-lg bg-red-700 hover:bg-red-900/60 shadow-md shadow-gray-600 h-8 px-3 rounded-lg">
                      <MdOutlineDeleteForever className="text-2xl my-1" />
                    </button>
                  )}
                  <div class="flex justify-center">
                    {currentUser.userType === "User" && (
                      <button
                        onClick={() => {
                          !job.appliedBy.includes(currentUser._id) &&
                            handleJobApplyButtonClick(job._id);
                        }}
                        class={
                          job.appliedBy.includes(currentUser._id)
                            ? "bg-yellow-800 rounded-lg text-gray-800 font-medium text-base md:text-lg my-2 pb-1 px-4 md:px-8 hover:bg-yellow-700 transition-all duration-150 ease-in-out cursor-not-allowed"
                            : "bg-yellow-500 rounded-lg text-gray-800 font-medium text-base md:text-lg my-2 pb-1 px-4 md:px-8 hover:bg-yellow-700 transition-all duration-150 ease-in-out"
                        }
                      >
                        {job.appliedBy.includes(currentUser._id)
                          ? "Applied"
                          : "Apply"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindJobs;
