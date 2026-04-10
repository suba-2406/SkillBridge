import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillInput = ({ onAnalyze, isLoading }) => {
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skills.trim()) {
      setError('Please enter at least one skill.');
      return;
    }
    setError('');
    onAnalyze(skills);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Skills Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your skills (comma separated)
          </label>
          <div className="relative">
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => {
                setSkills(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              disabled={isLoading}
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all disabled:opacity-50"
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-gradient-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint disabled:opacity-70 font-medium"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Analyze My Skills
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default SkillInput;
