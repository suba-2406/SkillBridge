import React from 'react';
import { Rocket, Clock, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'bg-mint/10 text-mint border-mint/20';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard': return 'bg-coral/10 text-coral border-coral/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:border-mint/30 hover:shadow-xl hover:shadow-mint/5 transition-all group relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint/5 to-coral/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative flex-1">
        <div className="flex items-center justify-between mb-6">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
          <div className="flex items-center text-gray-400 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-full">
             <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-300" />
             {project.duration || 'Flexible'}
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-mint transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.skills?.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-lg border border-gray-100">
              #{skill.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center text-xs font-bold text-gray-400">
          <BarChart3 className="w-4 h-4 mr-2 text-mint" />
          <span>+150 Skill XP</span>
        </div>
        
        <button className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-2xl group-hover:bg-mint transition-all shadow-lg shadow-gray-200 group-hover:shadow-mint/30">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
