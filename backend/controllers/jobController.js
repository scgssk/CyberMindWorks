const Job = require('../models/Job');

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job', error: err.message });
  }
};

// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const filters = {};
    if (req.query.location) filters.location = req.query.location;
    if (req.query.jobType) filters.jobType = req.query.jobType;
    if (req.query.minSalary && req.query.maxSalary) {
      filters.salaryMin = { $gte: Number(req.query.minSalary) };
      filters.salaryMax = { $lte: Number(req.query.maxSalary) };
    }

    const jobs = await Job.find(filters).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

module.exports = { createJob, getJobs };
