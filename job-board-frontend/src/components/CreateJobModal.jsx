import { useState, useRef, useEffect } from "react";
import { IoIosCalendar } from "react-icons/io";

const CreateJobModal = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    isDraft: false,
  });

  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onRefresh();
    onClose();
  };

  const handleDraft = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.title || "job-draft"}.txt`;

    link.click();

    // Optional: Clean up the blob URL after download
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="fixed inset-0 bg-[#00000020] z-50 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-[20px] w-full max-w-[768px] p-8 shadow-[0_0_30px_rgba(0,0,0,0.1)]"
      >
        <h2 className="text-[20px] font-semibold text-[#222222] mb-6 text-center">
          Create Job Opening
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-[#222222]">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-bold">
                Job Title
              </label>
              <input
                name="title"
                placeholder="Full Stack Developer"
                onChange={handleChange}
                value={formData.title}
                required
                className="w-full border border-[#D0D5DD] rounded-md p-3 text-sm font-bold placeholder:text-[#98A2B3]"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold">
                Company Name
              </label>
              <input
                name="company"
                placeholder="Amazon, Microsoft, Swiggy"
                onChange={handleChange}
                value={formData.company}
                required
                className="w-full border border-[#D0D5DD] rounded-md p-3 text-sm font-bold placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block mb-1 text-sm font-bold">Location</label>
              <select
                name="location"
                onChange={handleChange}
                value={formData.location}
                required
                className="w-full border border-[#D0D5DD] rounded-md p-3 text-sm text-[#222222] font-bold pr-8"
              >
                <option value="">Choose Preferred Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-bold">Job Type</label>
              <select
                name="jobType"
                onChange={handleChange}
                value={formData.jobType}
                required
                className="w-full border border-[#D0D5DD] rounded-md p-3 text-sm text-[#222222] font-bold pr-8"
              >
                <option value="Internship">Internship</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-bold">
                Salary Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="↓↑ ₹0"
                  className="border border-[#D0D5DD] rounded-md p-3 text-sm w-1/2 text-[#222222] font-bold"
                  onChange={handleChange}
                  value={formData.salaryMin}
                  required
                />
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="↓↑ ₹12,00,000"
                  className="border border-[#D0D5DD] rounded-md p-3 text-sm w-1/2 text-[#222222] font-bold"
                  onChange={handleChange}
                  value={formData.salaryMax}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-bold">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                onChange={handleChange}
                value={formData.deadline}
                className="border border-[#D0D5DD] rounded-md p-3 text-sm w-full text-[#222222] font-bold"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-bold">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Please share a description to let the candidate know more about the job role"
              className="border border-[#D0D5DD] rounded-md p-3 text-sm w-full min-h-[100px] placeholder:text-[#98A2B3] resize-none"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={handleDraft}
              className="px-6 py-3 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] hover:bg-gray-50 flex items-center"
            >
              Save Draft
              <img
                src="/dd.png"
                alt="dropdown"
                className="inline ml-2 w-2 h-2 object-contain"
              />
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-[#00AAFF] text-white rounded-lg text-sm font-bold shadow-[0px_0px_14px_0px_#5D5D5D26] hover:bg-[#0099CC]"
            >
              Publish &nbsp;»
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
