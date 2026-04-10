import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const getScoreLabel = (score) => {
    if (score < 40) return { label: 'Beginner', color: 'text-red-500', bg: 'bg-red-100' };
    if (score <= 75) return { label: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Ready', color: 'text-mint', bg: 'bg-mint-light/20' };
  };

  const scoreInfo = getScoreLabel(result.readinessScore);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-mint" />
          Overall Readiness
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreInfo.bg} ${scoreInfo.color}`}>
          {scoreInfo.label}
        </span>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mint to-coral">
            {result.readinessScore}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-mint to-coral h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${result.readinessScore}%` }}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1 text-coral" />
            Top Missing Skills
          </h3>
          {result.missingSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-coral/10 text-coral-dark rounded-lg text-sm font-medium border border-coral/20">
                  {skill}
                </span>
              ))}
              {result.missingSkills.length > 3 && (
                <span className="text-xs text-gray-400 self-center">+{result.missingSkills.length - 3} more</span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">None! You're fully equipped.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1 text-mint" />
            Matching Skills
          </h3>
          {result.matchedSkills?.length > 0 ? (
             <div className="flex flex-wrap gap-2">
              {result.matchedSkills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-mint/10 text-mint-dark rounded-lg text-sm font-medium border border-mint/20">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
             <p className="text-sm text-gray-500">Add more relevant skills to match.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
