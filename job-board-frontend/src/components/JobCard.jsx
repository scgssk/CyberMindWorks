import { formatDistanceToNowStrict } from "date-fns";
// import { FaUserAlt } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { GiMoneyStack } from "react-icons/gi";

const JobCard = ({ job }) => {
  const timeAgoRaw = formatDistanceToNowStrict(new Date(job.createdAt), {
    addSuffix: false,
  });

  const timeAgo = (() => {
    const [value, unit] = timeAgoRaw.split(" ");
    const shortUnit =
      {
        seconds: "s",
        second: "s",
        minutes: "m",
        minute: "m",
        hours: "h",
        hour: "h",
        days: "d",
        day: "d",
        months: "mo",
        month: "mo",
        years: "y",
        year: "y",
      }[unit] || unit;

    return `${value}${shortUnit} ago`;
  })();

  const salaryLPA = (job.salaryMax / 100000).toFixed(0);

  return (
    <div
      className="bg-white rounded-[12px] p-4 relative"
      style={{
        width: "316px",
        height: "360px",
        boxShadow: "0px 0px 14px 0px #D3D3D326",
      }}
    >
      {/* Time badge */}
      <div className="absolute top-3 right-3 bg-[#B0D9FF] text-black text-xs w-[75px] h-[33px] flex items-center justify-center rounded-[10px] font-semibold">
        {timeAgo}
      </div>

      {/* Company Logo */}
      <div
        className="w-21 h-21 rounded-xl overflow-hidden mb-3 flex items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)",
          border: "1px solid #FFFFFF",
          boxShadow: "0px 0px 10.25px 0px #94949440",
        }}
      >
        <img
          src={`https://i.pravatar.cc/48?u=${job._id}`}
          alt={job.company}
          className="object-cover w-7/8 h-7/8 rounded-[1000px]"
        />
      </div>

      {/* Job Title */}
      <h3 className="text-[20px] font-semibold text-black mb-1">{job.title}</h3>

      {/* Job Info Row */}
      <div className="flex flex-wrap text-xs text-gray-600 font-medium gap-3 mb-3">
        <div className="flex items-center gap-1">
          <img
            src="/user.png"
            alt="experience"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[16px]">1-3 yr Exp</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/location.png"
            alt="location"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[16px]">{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/money.png"
            alt="salary"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[16px]">{salaryLPA}LPA</span>
        </div>
      </div>

      {/* Description */}
      <ul className="text-[14px] text-gray-600 list-disc list-inside mb-4 leading-relaxed">
        {job.description
          .split(".")
          .filter((point) => point.trim() !== "")
          .slice(0, 2)
          .map((point, idx) => (
            <li key={idx}>{point.trim()}.</li>
          ))}
      </ul>

      {/* Apply Button */}
      <button
        className="text-white text-sm font-semibold w-full transition"
        style={{
          width: "284px",
          height: "46px",
          background: "#00AAFF",
          border: "1px solid #00AAFF",
          borderRadius: "10px",
          padding: "12px 10px",
          boxShadow: "0px 0px 14px 0px #5D5D5D26",
        }}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
