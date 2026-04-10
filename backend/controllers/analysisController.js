const analysisService = require('../services/analysisService');
const recommendationService = require('../services/recommendationService');
const supabase = require('../config/supabaseClient');

const sendSuccess = (res, data, message = "") => {
  res.json({ success: true, data, message });
};

const sendError = (res, error, code = 500) => {
  res.status(code).json({ success: false, error: error.message || error, message: "Internal Server Error" });
};

const analyze = async (req, res) => {
  try {
    const { skills, goal } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: "Skills must be an array" });
    }

    const result = await analysisService.analyzeSkills(skills, goal);
    sendSuccess(res, result);
  } catch (error) {
    console.error("Analysis Controller Error:", error);
    sendError(res, error);
  }
};

const getJobs = async (req, res) => {
  try {
    const matchedJobs = await analysisService.matchJobs([]);
    sendSuccess(res, matchedJobs);
  } catch (error) {
    console.error("Get Jobs Controller Error:", error);
    sendError(res, error);
  }
};

const match = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: "Skills must be an array" });
    }
    const matchedJobs = await analysisService.matchJobs(skills);
    sendSuccess(res, matchedJobs);
  } catch (error) {
    console.error("Matching Controller Error:", error);
    sendError(res, error);
  }
};

const getCourses = async (req, res) => {
  try {
    const skills = req.query.skills ? req.query.skills.split(',') : [];
    const level = req.query.level || null;
    const courses = await recommendationService.getRecommendations(skills, 'courses', level);
    sendSuccess(res, courses);
  } catch (error) {
    sendError(res, error);
  }
};

const getProjects = async (req, res) => {
  try {
    const skills = req.query.skills ? req.query.skills.split(',') : [];
    const level = req.query.level || null;
    const projects = await recommendationService.getRecommendations(skills, 'projects', level);
    sendSuccess(res, projects);
  } catch (error) {
    sendError(res, error);
  }
};

const getStudents = async (req, res) => {
  try {
    const { data: students, error } = await supabase
      .from('students')
      .select('*');
    
    if (error) throw error;
    sendSuccess(res, students || []);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = { analyze, getJobs, match, getCourses, getProjects, getStudents };
