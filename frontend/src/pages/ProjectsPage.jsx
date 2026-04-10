import React, { useEffect, useState } from 'react';
import { Rocket, Trophy, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { fetchProjects, generateAIProject } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const { userData } = useUser();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiProject, setAiProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let data;
        const missing = userData.missingSkills || [];
        
        if (missing.length > 0) {
          data = await fetchProjects(missing);
        } else {
          data = await fetchProjects([], 'Hard');
        }
        
        setProjects(data || []);
      } catch (err) {
        console.error("Project Fetch Error:", err);
        setError("Failed to load project recommendations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [userData.missingSkills]);

  const handleGenerateAIProject = async () => {
    setIsGenerating(true);
    try {
      const idea = await generateAIProject(userData.skills, userData.missingSkills, userData.goal || 'Software Engineer');
      setAiProject(idea);
    } catch (err) {
      console.error(err);
      setError("AI Generation failed. Check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const headerTitle = userData.missingSkills?.length > 0 ? "Recommended Projects" : "Advanced Industry Projects";
  const headerSub = userData.missingSkills?.length > 0 
    ? `Curated briefs to fill your gaps in ${userData.missingSkills[0]}.`
    : "Your profile is optimized. Time for high-stakes enterprise challenges.";

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {aiProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary"></div>
              <button 
                onClick={() => setAiProject(null)}
                className="absolute top-6 right-6 p-2 h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors font-bold"
              >
                ✕
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-mint/10 rounded-2xl text-mint">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Custom AI Brief</h2>
              </div>

              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{aiProject.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed font-medium">{aiProject.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-wider">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {aiProject.techStack?.map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold border border-gray-100 uppercase">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-wider">Estimated Time</p>
                  <p className="text-sm font-bold text-gray-900">{aiProject.estimatedTime}</p>
                </div>
              </div>

              <div className="mb-8 overflow-y-auto max-h-40 pr-2 custom-scrollbar">
                 <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-wider">Key Features</p>
                 <ul className="space-y-2">
                   {aiProject.features?.map((f, i) => (
                     <li key={i} className="flex items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-mint mt-1.5 mr-3 shrink-0"></div>
                       <span className="text-sm text-gray-600 font-medium">{f}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              <button 
                onClick={() => setAiProject(null)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-mint transition-all shadow-xl shadow-gray-200"
              >
                Add to Portfolio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="mb-16 text-center md:text-left relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-mint/5 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
          {headerTitle.split(' ')[0]} <span className="text-gradient">{headerTitle.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 font-medium max-w-2xl">
          {headerSub}
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[32px] mb-12 flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <p className="text-red-700 font-bold">{error}</p>
        </div>
      )}

      <div className="relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="w-12 h-12 text-mint animate-spin mb-4" />
             <p className="text-gray-400 font-bold animate-pulse">Curating your project backlog...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-xl p-20 rounded-[50px] border-4 border-dashed border-gray-100 text-center flex flex-col items-center max-w-4xl mx-auto">
            <Trophy className="w-12 h-12 text-gray-200 mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Ready for a challenge?</h2>
            <p className="text-gray-500 font-medium font-bold">Use the AI Brief generator below to start a unique project.</p>
          </div>
        )}
      </div>

      <div className="mt-24 p-12 bg-gradient-to-br from-gray-900 to-black rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mint/10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
           <h3 className="text-2xl font-black mb-2">Want a custom challenge?</h3>
           <p className="text-gray-400 font-medium font-bold">Our AI can generate a project brief specifically for your portfolio.</p>
        </div>
        <button 
          onClick={handleGenerateAIProject}
          disabled={isGenerating}
          className="relative z-10 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black flex items-center hover:bg-mint hover:text-white transition-all group disabled:opacity-50"
        >
           {isGenerating ? (
             <Loader2 className="w-5 h-5 mr-3 animate-spin text-mint" />
           ) : (
             <Sparkles className="w-5 h-5 mr-3 text-mint group-hover:text-white transition-colors" />
           )}
           {isGenerating ? "Generating..." : "Generate AI Brief"}
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
