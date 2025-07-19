import { useState } from "react";
import searchIcon from "../assets/icons/search.png";
import locationIcon from "../assets/icons/location.png";
import jobIcon from "../assets/icons/job.png";

const Filters = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
  salaryMin,
  setSalaryMin,
  salaryMax,
  setSalaryMax,
}) => {
  return (
    <div className="bg-white py-5 border-none flex flex-wrap md:flex-nowrap justify-center gap-6 w-full font-[400]">
      {/* Search Input */}
      <div className="flex items-center justify-center gap-5 flex-grow md:flex-grow-0">
        <img src={searchIcon} alt="Search" className="w-5 h-5 object-contain" />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm text-gray-700 bg-transparent outline-none w-50 lg:w-60 placeholder-gray-500"
        />
      </div>

      <div className="hidden md:block h-10 w-px bg-gray-300"></div>

      {/* Location Dropdown */}
      <div className="relative flex items-center gap-5">
        <img src={locationIcon} alt="Location" className="w-5 h-5 object-contain" />
        <select
          className="w-50 text-sm text-gray-500 bg-transparent outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Preferred Location</option>
          <option>Remote</option>
          <option>Chennai</option>
        </select>
      </div>

      <div className="hidden md:block h-10 w-px bg-gray-300"></div>

      {/* Job Type Dropdown */}
      <div className="flex items-center gap-5">
        <img src={jobIcon} alt="Job Type" className="w-5 h-5 object-contain" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-50 text-sm bg-transparent outline-none text-gray-500"
        >
          <option value="">Job type</option>
          <option value="Internship">Internship</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="hidden md:block h-10 w-px bg-gray-300"></div>

      {/* Salary Filter */}
      <div className="flex flex-col gap-2 min-w-[250px]">
        <div className="flex justify-between text-sm text-gray-700 font-bold">
          <span className="pr-10">Salary Per Month</span>
          <span>
            ₹{(salaryMin / 1000).toFixed(0)}k - ₹{(salaryMax / 1000).toFixed(0)}k
          </span>
        </div>

        <div className="relative h-5">
          {/* Track */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 rounded transform -translate-y-1/2 z-0" />

          {/* Filled Range */}
          <div
            className="absolute top-1/2 h-0.5 bg-black rounded z-10"
            style={{
              left: `${((salaryMin - 10000) / (1000000 - 10000)) * 100}%`,
              right: `${100 - ((salaryMax - 10000) / (1000000 - 10000)) * 100}%`,
              transform: "translateY(-50%)",
            }}
          />

          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={salaryMin}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < salaryMax) setSalaryMin(val);
            }}
            className="absolute w-full pointer-events-none appearance-none z-20 h-5 bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />

          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={salaryMax}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > salaryMin) setSalaryMax(val);
            }}
            className="absolute w-full pointer-events-none appearance-none z-20 h-5 bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;

