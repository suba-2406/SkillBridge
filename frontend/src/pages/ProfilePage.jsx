import React from 'react';
import { Mail, Target, Award, Shield, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ResumeUpload from '../components/ResumeUpload';

const ProfilePage = () => {
  const { userData, updateAnalysis } = useUser();
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const handleSkillsExtracted = (newSkills) => {
    // Unique skills merge or replace - here we merge for better UX
    const combinedSkills = Array.from(new Set([...userData.skills, ...newSkills]));
    
    // Update global context
    updateAnalysis({ 
      skills: combinedSkills,
      // We clear old analysis data to force a fresh analysis on overview
      missingSkills: [],
      readinessScore: 0
    });

    // Navigate to overview to trigger the new analysis flow
    navigate('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header Profile */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 rounded-full -mr-32 -mt-32"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
          <div className="w-32 h-32 bg-gradient-primary rounded-[32px] flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-coral/20">
            {getInitials(userData.name || 'User')}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name || 'User'}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                {userData.email || 'user@example.com'}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Target className="w-4 h-4 mr-2" />
                Aspiring {userData.jobTitle || 'Developer'}
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-gray-50 text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center mx-auto md:mx-0">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Upload - NEW */}
        <div className="lg:col-span-1">
          <ResumeUpload onSkillsExtracted={handleSkillsExtracted} />
        </div>

        {/* Skills Card */}
        <div className="lg:col-span-1 bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 h-full">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-5 h-5 text-mint mr-2" />
            Verified Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {userData.skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-mint/5 text-mint text-[13px] rounded-xl font-bold border border-mint/10">
                {skill}
              </span>
            ))}
            {userData.skills.length === 0 && <p className="text-gray-400 text-sm">No skills added yet. Upload your resume to start!</p>}
          </div>
        </div>

        {/* Career Goal Card */}
        <div className="lg:col-span-1 bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 h-full">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-5 h-5 text-coral mr-2" />
            Account Status
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Type</p>
              <p className="text-sm font-bold text-gray-900">Student Explorer (Free)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-sm font-bold text-gray-900">April 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
