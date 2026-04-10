import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Sparkles, GraduationCap, ArrowRight, Loader2, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const LearningPage = () => {
  const { userData } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const missingSkills = userData.missingSkills || [];

  useEffect(() => {
    const loadLearningPath = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (missingSkills.length > 0) {
          data = await fetchCourses(missingSkills);
        } else {
          data = await fetchCourses([], 'Advanced');
        }
        setCourses(data || []);
      } catch (err) {
        console.error("Learning Path Error:", err);
        setError("Unable to sync with learning providers.");
      } finally {
        setLoading(false);
      }
    };

    loadLearningPath();
  }, [missingSkills.join(',')]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-mint/5 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center text-mint">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-mint font-black text-xs uppercase tracking-[0.2em]">Edge Curriculum</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6"
          >
            Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-coral">Learning Path</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed"
          >
            {missingSkills.length > 0 
              ? `Bridging your skill gap in ${missingSkills.slice(0, 2).join(' and ')} with industry-aligned certification paths.`
              : "You've mastered the essentials. Dive into high-stakes enterprise architecture and advanced research."}
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 h-80 rounded-[32px] animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-12 rounded-[40px] text-center border-2 border-red-100 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <SearchX className="w-8 h-8 text-red-300" />
            </div>
            <h3 className="text-xl font-black text-red-900 mb-2">{error}</h3>
            <p className="text-red-600 font-bold text-sm mb-8">The learning engine is temporarily disconnected.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-red-900 text-white rounded-2xl font-black hover:bg-red-800 transition-colors"
            >
              Retry Sync
            </button>
          </div>
        ) : courses.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-200/50">
              <Sparkles className="w-10 h-10 text-mint" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Analyzing Opportunities</h3>
            <p className="text-gray-400 font-medium">No learning recommendations found for your current profile.</p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <footer className="mt-20 p-10 bg-gradient-to-br from-gray-900 to-black rounded-[40px] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-mint/20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-2xl font-black mb-2 flex items-center">
              Elevate Your Portfolio
              <Sparkles className="w-5 h-5 ml-3 text-mint" />
            </h4>
            <p className="text-gray-400 font-medium max-w-md">
              Complete any of these courses to automatically update your Readiness Score and unlock high-tier job matches.
            </p>
          </div>
          <button className="px-8 py-5 bg-white text-gray-900 rounded-3xl font-black flex items-center hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Explore All Content
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LearningPage;
