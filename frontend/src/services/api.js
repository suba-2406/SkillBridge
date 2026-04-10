import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

// Helper to handle standardized response { success, data, message }
const handleResponse = (response) => {
  if (response.data && response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'API Error');
};

export const analyzeSkills = async (skills, goal) => {
  const response = await api.post('/analyze', {
    skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
    goal: goal || ''
  });
  return handleResponse(response);
};

export const fetchJobs = async () => {
  const response = await api.get('/jobs');
  return handleResponse(response);
};

export const matchJobs = async (skills) => {
  const response = await api.post('/match', {
    skills: Array.isArray(skills) ? skills : [skills]
  });
  return handleResponse(response);
};

export const fetchCourses = async (skills = []) => {
  const response = await api.get('/courses', {
    params: { skills: Array.isArray(skills) ? skills.join(',') : skills }
  });
  return handleResponse(response);
};

export const fetchProjects = async (skills = [], level = null) => {
  const params = {};
  if (skills && (Array.isArray(skills) ? skills.length > 0 : skills)) {
    params.skills = Array.isArray(skills) ? skills.join(',') : skills;
  }
  if (level) params.level = level;

  const response = await api.get('/projects', { params });
  return handleResponse(response);
};

export const fetchStudents = async () => {
  const response = await api.get('/students');
  return handleResponse(response);
};

export const extractSkills = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await api.post('/extract-skills', formData);
  return handleResponse(response);
};

export const extractResumeDetails = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await api.post('/extract-resume-details', formData);
  return handleResponse(response);
};

export const generateAIProject = async (skills, missingSkills, goal) => {
  const response = await api.post('/ai-project-brief', {
    skills,
    missingSkills,
    goal
  });
  return handleResponse(response);
};

export const getMatchedJobs = async (skills) => {
  const response = await api.get(`/jobs/match?skills=${skills}`);
  return handleResponse(response);
};

export default api;
