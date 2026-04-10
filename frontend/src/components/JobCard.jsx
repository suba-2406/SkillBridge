import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Building2 } from 'lucide-react';

const JobCard = ({ job, index, hasSkills }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-mint transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-400 text-sm flex items-center font-medium">
            <Building2 className="w-4 h-4 mr-2" />
            {job.company || 'Industry Partner'}
          </p>
        </div>
        
        {hasSkills && job.matchPercentage !== undefined && (
          <div className="bg-gradient-to-r from-mint to-coral p-[2px] rounded-full shadow-lg shadow-coral/10">
            <div className="bg-white rounded-full px-4 py-1.5">
              <span className="text-sm font-black bg-gradient-to-r from-mint to-coral bg-clip-text text-transparent">
                {job.matchPercentage}% Match
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6 mb-8">
        {hasSkills ? (
          <>
            {/* Matched Skills */}
            <div>
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-3 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-2 text-mint" />
                Skills You Have
              </p>
              <div className="flex flex-wrap gap-2">
                {job.matchedSkills?.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-mint/5 text-mint border border-mint/10 rounded-xl text-xs font-bold transition-transform hover:scale-105">
                    {s}
                  </span>
                ))}
                {job.matchedSkills?.length === 0 && <span className="text-xs text-gray-300 italic">No matches yet</span>}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-3 flex items-center">
                <XCircle className="w-3 h-3 mr-2 text-coral" />
                Missing Gaps
              </p>
              <div className="flex flex-wrap gap-2">
                {job.missingSkills?.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-coral/5 text-coral border border-coral/10 rounded-xl text-xs font-bold transition-transform hover:scale-105">
                    {s}
                  </span>
                ))}
                {job.missingSkills?.length === 0 && <span className="text-xs text-mint font-bold italic">Perfect Match!</span>}
              </div>
            </div>
          </>
        ) : (
          /* Required Skills (Fallback for when there are no user skills to match against) */
          <div>
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-3 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-2 text-gray-400" />
              Required Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {job.required_skills?.map(s => (
                <span key={s} className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-xl text-xs font-bold transition-transform hover:scale-105">
                  {s}
                </span>
              ))}
              {!job.required_skills?.length && <span className="text-xs text-gray-300 italic">No specific skills listed</span>}
            </div>
          </div>
        )}
      </div>

      <button className="w-full py-4 bg-gray-50 group-hover:bg-gray-900 group-hover:text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center relative z-10">
        Apply Now 
        <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" />
      </button>

      {/* Background Micro-Decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-mint/5 rounded-full blur-3xl group-hover:bg-coral/5 transition-colors duration-500"></div>
    </motion.div>
  );
};

export default JobCard;
