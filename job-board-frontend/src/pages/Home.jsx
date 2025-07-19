import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Filters from "../components/Filters";
import CreateJobModal from "../components/CreateJobModal";
import Navbar from "../components/Navbar";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔍 Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(800000);

  const fetchJobs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);

    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔁 Live Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      location === "" || job.location.toLowerCase() === location.toLowerCase();

    const matchesJobType =
      jobType === "" || job.jobType.toLowerCase() === jobType.toLowerCase();

    const jobSalary = Number(job.salaryMin);
    const matchesSalary = jobSalary >= salaryMin && jobSalary <= salaryMax;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <div>
      <div className="flex flex-col pt-5 justify-center w-full bg-white">
        <Navbar onOpenModal={() => setShowModal(true)} />
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
          jobType={jobType}
          setJobType={setJobType}
          salaryMin={salaryMin}
          setSalaryMin={setSalaryMin}
          salaryMax={salaryMax}
          setSalaryMax={setSalaryMax}
        />
      </div>

      <div className="p-6">
        <div className="flex w-full justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>

        {showModal && (
          <CreateJobModal
            onClose={() => setShowModal(false)}
            onRefresh={fetchJobs}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
