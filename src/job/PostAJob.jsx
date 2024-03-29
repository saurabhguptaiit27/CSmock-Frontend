import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../components/Context/CurrentUserProvider";
import toast from "react-hot-toast";

const PostAJob = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    createrId: "",
    createrType: "",
    jobOrganisation: "",
    jobSalary: "",
    jobTitle: "",
    jobCategory: "",
    requiredQualification: "",
    requiredExperience: "",
    requiredSkills: "",
    jobLocation: "",
    jobType: "",
    validTill: "",
    jobDescription: "",
    postedOn: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        createrId: currentUser._id,
        createrType: currentUser.userType,
      });
    }, 10);
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextSelection = (text) => {
    setFormData({
      ...formData,
      jobDescription: text,
      postedOn: new Date(Date.now()).toString(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/v1/creaters/createjob", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job post");
      }
      const responseData = await response.json();
      toast.success("Job Posted Successfully");
      // Clear form after successful post
      setFormData({
        ...formData,
        jobOrganisation: "",
        jobSalary: "",
        jobTitle: "",
        jobCategory: "",
        requiredQualification: "",
        requiredExperience: "",
        requiredSkills: "",
        jobLocation: "",
        jobType: "",
        validTill: "",
        jobDescription: "",
        postedOn: "",
      });
    } catch (error) {
      console.error("error occured while posting job----- : ", error.message);
    }
  };

  return (
    <section className="bg-gray-950/80 min-h-screen pb-24">
      <h1 className="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl mt-16 pt-16">
        You can <span className="text-green-600">Post Job</span> from here
      </h1>

      <p className="max-w-2xl mx-auto text-center text-gray-200 mb-10 mt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        ex placeat modi magni quia error alias, adipisci rem similique, at omnis
        eligendi optio eos harum.
      </p>
      <div class="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-800 ">
        <h2 class="text-lg font-semibold capitalize text-yellow-400">
          Post Job Here ...
        </h2>

        <form onSubmit={handleSubmit}>
          <div class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div>
              <label class="text-gray-200" for="jobOrganisation">
                Job Organisation
              </label>
              <input
                id="jobOrganisation"
                name="jobOrganisation"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- Google.com"
                value={formData.jobOrganisation}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="jobSalary">
                Salary
              </label>
              <input
                id="jobSalary"
                name="jobSalary"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- 12 lpa"
                value={formData.jobSalary}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200 " for="jobTitle">
                Job Title <span className="text-red-600">*</span>
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- Need a Javascript Developer"
                value={formData.jobTitle}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="jobCategory">
                Job Category
              </label>
              <input
                id="jobCategory"
                name="jobCategory"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- Software/Doctors/Managers/Journalist"
                value={formData.jobCategory}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="requiredQualification">
                Required Qualification
              </label>
              <input
                id="requiredQualification"
                name="requiredQualification"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- BTech./MTech./MBBS/MBA"
                value={formData.requiredQualification}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="requiredExperience">
                Required Experience (in years)
              </label>
              <input
                id="requiredExperience"
                name="requiredExperience"
                onChange={handleInputChange}
                type="Number"
                placeholder="eg.- 5 years"
                value={formData.requiredExperience}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="requiredSkills">
                Required Skills
              </label>
              <input
                id="requiredSkills"
                name="requiredSkills"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- javascript, expresjs, react etc."
                value={formData.requiredSkills}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="jobLocation">
                Job Location
              </label>
              <input
                id="jobLocation"
                name="jobLocation"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- Bengaluru/Pune/Mumbai"
                value={formData.jobLocation}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="jobType">
                Job Type
              </label>
              <input
                id="jobType"
                name="jobType"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- Onsite/Remote/Hybrid or Fulltime/Parttime"
                value={formData.jobType}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label class="text-gray-200" for="validTill">
                Valid Till
              </label>
              <input
                id="validTill"
                name="validTill"
                onChange={handleInputChange}
                type="text"
                placeholder="eg.- 1 January 2048"
                value={formData.validTill}
                class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="mt-4">
            <label class="text-gray-200" for="jobDescription">
              Job Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              onChange={(event) => handleTextSelection(event.target.value)}
              type="text"
              placeholder="any other details like salary, perks, holidays etc"
              rows="3"
              maxLength={256}
              value={formData.jobDescription}
              class="block w-full px-4 py-2 mt-2 text-gray-300 border border-gray-600 rounded-md bg-gray-800 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring "
            />
          </div>

          <div class="flex justify-end mt-6">
            <button
              type="submit"
              class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostAJob;
