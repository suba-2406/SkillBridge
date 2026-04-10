const supabase = require('../config/supabaseClient');

/**
 * Get jobs from database and calculate skill match percentage for the user
 * GET /api/jobs/match?skills=React,Node.js
 */
const getMatchedJobs = async (req, res) => {
  try {
    const userSkills = req.query.skills ? req.query.skills.split(',') : [];
    
    // Fetch all jobs from Supabase
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*');

    if (error) throw error;

    const matchedJobs = jobs.map(job => {
      const required = job.required_skills || [];
      
      // Calculate intersection (case-insensitive)
      const matched = required.filter(skill => 
        userSkills.some(us => us.toLowerCase().trim() === skill.toLowerCase().trim())
      );
      
      // Calculate difference
      const missing = required.filter(skill => 
        !userSkills.some(us => us.toLowerCase().trim() === skill.toLowerCase().trim())
      );
      
      // Calculate percentage
      const percentage = required.length > 0 
        ? Math.round((matched.length / required.length) * 100) 
        : 0;

      return {
        ...job,
        matchPercentage: percentage,
        matchedSkills: matched,
        missingSkills: missing
      };
    });

    // Sort by highest matchPercentage first
    matchedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      data: matchedJobs
    });

  } catch (error) {
    console.error("Job Match Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while matching jobs",
      error: error.message 
    });
  }
};

module.exports = { getMatchedJobs };
