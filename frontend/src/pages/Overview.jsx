import React, { useState, useEffect } from 'react';
import { Briefcase, Zap, Globe, Star } from 'lucide-react';
import SkillInput from '../components/SkillInput';
import AnalysisResult from '../components/AnalysisResult';
import JobCard from '../components/JobCard';
import { analyzeSkills, matchJobs } from '../services/api';
import { useUser } from '../context/UserContext';
import ResumeUpload from '../components/ResumeUpload';

const Overview = () => {
  const { userData, setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [localJobs, setLocalJobs] = useState([]);

  const handleAnalyze = async (skillsInput) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Use provided input or fall back to context skills (for auto-run)
      let skillsArray;
      if (typeof skillsInput === 'string') {
        skillsArray = skillsInput.split(',').map(s => s.trim()).filter(s => s);
      } else if (Array.isArray(skillsInput)) {
        skillsArray = skillsInput;
      } else {
        skillsArray = userData.skills || [];
      }

      if (!skillsArray || skillsArray.length === 0) {
        setIsLoading(false);
        return;
      }
      
      // Call backend analysis
      const analysisData = await analyzeSkills(skillsArray);
      
      // Update global context with real values from backend
      setUserData(prev => ({
        ...prev,
        skills: skillsArray,
        readinessScore: analysisData.readinessScore || 0,
        missingSkills: analysisData.missingSkills || [],
        matchedSkills: analysisData.matchedSkills || [],
        bestMatchJob: analysisData.bestMatchJob || ''
      }));

      // Also grab relevant job matches for the bottom of the page
      const jobsRes = await matchJobs(skillsArray);
      setLocalJobs(jobsRes || []);

    } catch (err) {
      console.error("Overview Analysis Error:", err);
      setError('An error occurred while analyzing your skills. Please ensure the backend server is active.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-analyze on mount if we have skills but no score yet (typical after resume extraction)
  useEffect(() => {
    if (userData.skills && userData.skills.length > 0 && userData.readinessScore === 0) {
      handleAnalyze(userData.skills);
    }
  }, []); // Only on mount

  // Also reload jobs on mount if we have skills and a score
  useEffect(() => {
    if (userData.skills && userData.skills.length > 0 && userData.readinessScore > 0) {
       matchJobs(userData.skills).then(setLocalJobs).catch(console.error);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Welcome back, <span className="bg-gradient-to-r from-mint to-coral bg-clip-text text-transparent">{userData.name || 'Explorer'}</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 font-medium max-w-2xl">
          We've updated our analysis engine to sync with the latest industry roles. Input your skills below to see where you stand.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[24px] mb-10 flex items-center space-x-3">
          <Zap className="w-5 h-5 text-red-400" />
          <p className="text-red-700 text-sm font-bold">{error}</p>
        </div>
      )}

      <div className="mb-16">
        <ResumeUpload />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-2 border border-white/60 shadow-2xl shadow-gray-200/50">
          <SkillInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>
        
        <div className="space-y-8">
          {userData.skills.length > 0 ? (
            <>
              {/* Dynamic Analysis View */}
              <AnalysisResult result={userData} />
              
              {/* Dynamic Growth Recommendation */}
              {userData.missingSkills?.length > 0 && (
                <div className="bg-white p-8 rounded-[38px] shadow-sm border border-coral/10 bg-gradient-to-br from-white to-coral/5 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-coral/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center">
                    <Zap className="w-6 h-6 text-coral mr-3 animate-pulse" />
                    Strategic Growth Path
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">
                    Your optimal target is <span className="text-gray-900 font-black underline decoration-coral/30 decoration-4">{userData.bestMatchJob}</span>. 
                    Adding <span className="text-coral font-black">{userData.missingSkills[0]}</span> to your profile is currently the highest-ROI move for your readiness score.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white/20 backdrop-blur-md border-4 border-dashed border-gray-100 rounded-[48px] p-16 flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center mb-8 shadow-inner">
                <Globe className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Identity Your Skillset</h3>
              <p className="text-gray-400 font-medium max-w-xs text-sm">
                Our AI-driven engine maps your current abilities to the real-time requirements of 500+ tech roles.
              </p>
            </div>
          )}
        </div>
      </div>

      {(localJobs.length > 0) && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center">
                 <Star className="w-8 h-8 text-mint mr-4 fill-mint" />
                 Top Matches Found
               </h2>
               <p className="text-gray-400 font-medium mt-1">Based on your highest compatibility scores</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {localJobs.map((job, idx) => (
              <JobCard key={job.id} job={job} index={idx} hasSkills={userData.skills.length > 0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
