const supabase = require('../config/supabaseClient');

const analyzeSkills = async (userSkills) => {
  try {
    if (!userSkills || userSkills.length === 0) {
      return {
        bestMatchJob: "None",
        readinessScore: 0,
        matchedSkills: [],
        missingSkills: [],
        message: "Enter skills to analyze"
      };
    }

    // Normalize skills: trim and lowercase
    const normalizedUserSkills = userSkills
      .map(s => s.trim().toLowerCase())
      .filter(s => s !== "");

    // Fetch jobs from Supabase
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*');

    if (error) throw error;
    
    if (!jobs || jobs.length === 0) {
      return { error: "No jobs available for analysis" };
    }

    let bestMatchJob = null;
    let highestPercentage = -1;
    let finalMatchedSkills = [];
    let finalMissingSkills = [];

    // Find BEST MATCH
    for (const job of jobs) {
      const requiredSkills = job.required_skills || [];
      
      const matched = requiredSkills.filter(s => 
        normalizedUserSkills.includes(s.trim().toLowerCase())
      );
      
      const missing = requiredSkills.filter(s => 
        !normalizedUserSkills.includes(s.trim().toLowerCase())
      );
      
      const percentage = requiredSkills.length > 0 
        ? Math.round((matched.length / requiredSkills.length) * 100) 
        : 0;

      if (percentage > highestPercentage) {
        highestPercentage = percentage;
        bestMatchJob = job.title;
        finalMatchedSkills = matched;
        finalMissingSkills = missing;
      }
    }

    return {
      bestMatchJob: bestMatchJob || "Unknown",
      readinessScore: highestPercentage === -1 ? 0 : highestPercentage,
      matchedSkills: finalMatchedSkills,
      missingSkills: finalMissingSkills
    };
  } catch (error) {
    console.error("Analysis Service Error:", error);
    throw error;
  }
};

const matchJobs = async (userSkills) => {
  try {
    const normalizedUserSkills = userSkills
      .map(s => s.trim().toLowerCase())
      .filter(s => s !== "");

    // Fetch jobs from Supabase
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*');

    if (error) throw error;

    const matchedJobs = jobs.map(job => {
      const requiredSkills = job.required_skills || [];
      
      const matching = requiredSkills.filter(s => 
        normalizedUserSkills.includes(s.toLowerCase())
      );
      
      const missing = requiredSkills.filter(s => 
        !normalizedUserSkills.includes(s.toLowerCase())
      );
      
      const percentage = requiredSkills.length > 0 
        ? Math.round((matching.length / requiredSkills.length) * 100) 
        : 0;

      return {
        ...job,
        matchPercentage: percentage,
        matchingSkills: matching,
        missingSkills: missing,
        readinessScore: percentage
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    return matchedJobs;
  } catch (error) {
    console.error("Match Jobs Service Error:", error);
    throw error;
  }
};

module.exports = { analyzeSkills, matchJobs };
