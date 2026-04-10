import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { getMatchedJobs, fetchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import { Briefcase, Search, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const JobsPage = () => {
  const { userData } = useUser();
  const { skills = [] } = userData || {};
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasSkills = skills && skills.length > 0;

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (hasSkills) {
        const skillsQuery = skills.join(',');
        const response = await getMatchedJobs(skillsQuery);
        setJobs(response || []);
      } else {
        const response = await fetchJobs();
        setJobs(response || []);
      }
    } catch (err) {
      console.error("Job Fetch Error:", err);
      setError("Unable to fetch jobs. Please ensure the backend is active.");
    } finally {
      setLoading(false);
    }
  }, [skills, hasSkills]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-mint font-black text-xs uppercase tracking-[0.2em] mb-3">
             <Briefcase className="w-4 h-4" />
             <span>{hasSkills ? "Live Market Sync" : "Job Market"}</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 leading-none mb-4 tracking-tighter">
            {hasSkills ? "Job Matches" : "Available Jobs"}
          </h1>
          <p className="text-gray-500 font-medium max-w-lg">
            {hasSkills 
              ? "We've scanned the database to find roles that perfectly align with your verified skillset."
              : "Explore all available roles. Add skills to your profile to see personalized matches."}
          </p>
        </div>

        <div className="flex items-center gap-3">
           <button className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
           </button>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="text" 
                placeholder="Filter roles..." 
                className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-mint/20 focus:border-mint outline-none transition-all w-64 text-sm"
              />
           </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 4, 4].map(i => (
            <div key={i} className="h-80 bg-white/40 backdrop-blur-sm rounded-[40px] animate-pulse border border-white"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 p-12 rounded-[40px] text-center max-w-2xl mx-auto shadow-xl shadow-red-500/5">
           <h3 className="text-xl font-bold text-red-900 mb-2">Connection Error</h3>
           <p className="text-red-500 mb-8 font-medium">{error}</p>
           <button 
             onClick={loadJobs}
             className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
           >
             Retry Sync
           </button>
        </div>
      ) : jobs.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {jobs.map((job, idx) => (
            <JobCard key={job.id} job={job} index={idx} hasSkills={hasSkills} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-[48px] border-2 border-dashed border-gray-200 border-spacing-8">
           <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-12 h-12 text-gray-200" />
           </div>
           <h2 className="text-2xl font-black text-gray-400 tracking-tight mb-2">No jobs found</h2>
           <p className="text-gray-400 font-medium max-w-sm mx-auto mb-10">
              There are currently no open roles in the database.
           </p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
