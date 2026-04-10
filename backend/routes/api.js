const express = require('express');
const router = express.Router();
const multer = require('multer');

// Controllers
const analysisController = require('../controllers/analysisController');
const aiController = require('../controllers/aiController');
const aiProjectController = require('../controllers/aiProjectController');
const jobController = require('../controllers/jobController');

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// --- AI Endpoints ---
// Full Resume Detail Extraction
router.post('/extract-resume-details', upload.single('resume'), aiController.extractResumeDetails);

// AI Skill Extraction (Old)
router.post('/extract-skills', upload.single('resume'), aiController.extractSkillsFromResume);

// AI Project Generation
router.post('/ai-project-brief', aiProjectController.generateBrief);

// --- Core Endpoints ---
router.post('/analyze', analysisController.analyze);
router.post('/match', analysisController.match);
router.get('/jobs', analysisController.getJobs);
router.get('/courses', analysisController.getCourses);
router.get('/projects', analysisController.getProjects);
router.get('/students', analysisController.getStudents);
router.get('/jobs/match', jobController.getMatchedJobs);

module.exports = router;
