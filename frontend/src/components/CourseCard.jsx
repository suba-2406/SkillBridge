import React from 'react';
import { BookOpen, Clock, Award, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/40 backdrop-blur-xl rounded-[32px] p-6 border border-white/60 shadow-xl shadow-gray-200/50 flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-mint/10">
          <BookOpen className="w-6 h-6 text-mint" />
        </div>
        <span className="px-3 py-1 bg-white/80 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
          {course.provider}
        </span>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-mint transition-colors">
          {course.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-mint/10 text-mint font-bold text-[10px] rounded-full uppercase tracking-wider">
            {course.skill}
          </span>
          <span className="px-3 py-1 bg-coral/10 text-coral font-bold text-[10px] rounded-full uppercase tracking-wider">
            {course.level}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-gray-400 text-xs font-bold mb-8 relative z-10 px-1">
        <div className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          {course.duration}
        </div>
        <div className="flex items-center">
          <Award className="w-3.5 h-3.5 mr-1.5" />
          Certified
        </div>
      </div>

      <button className="w-full py-4 bg-gray-900 group-hover:bg-gradient-primary text-white rounded-2xl font-black flex items-center justify-center transition-all duration-300 shadow-xl shadow-gray-200 group-hover:shadow-coral/20">
        Start Learning
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default CourseCard;
