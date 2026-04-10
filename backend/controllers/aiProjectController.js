const aiService = require('../services/aiService');

/**
 * Handle AI project brief generation
 */
const generateBrief = async (req, res) => {
  try {
    const { skills, missingSkills, goal } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: "User skills are required" });
    }

    const projectIdea = await aiService.generateProjectIdea(skills, missingSkills || [], goal || "Software Engineer");

    res.json({
      success: true,
      data: projectIdea,
      message: "AI Project brief generated successfully"
    });

  } catch (error) {
    console.error("AI Project Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: "Failed to generate AI project brief" 
    });
  }
};

module.exports = { generateBrief };
