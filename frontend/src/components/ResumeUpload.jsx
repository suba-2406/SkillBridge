import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Loader2, Sparkles, AlertCircle, CheckCircle2, User, Mail, Phone, School, MapPin, Tag } from 'lucide-react';
import { extractResumeDetails } from '../services/api';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeUpload = () => {
  const { userData, setUserData } = useUser();
  const [file, setFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
        setFile(selectedFile);
        setError(null);
        setExtractedData(null);
      } else {
        setError("Please upload a PDF or TXT resume.");
        setFile(null);
      }
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    setIsExtracting(true);
    setError(null);

    try {
      const result = await extractResumeDetails(file);
      setExtractedData(result);
    } catch (err) {
      console.error(err);
      setError("AI Extraction failed. Please try again or check your API key.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveToProfile = () => {
    setUserData(prev => ({
      ...prev,
      ...extractedData,
      skills: extractedData.skills || prev.skills
    }));
    setExtractedData(null);
    setFile(null);
  };

  const updateField = (field, value) => {
    setExtractedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/60 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 rounded-full -mr-16 -mt-16"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center">
            <Sparkles className="w-6 h-6 text-mint mr-3" />
            AI Profile Auto-Fill
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Upload resume to sync your identity</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!extractedData ? (
          <motion.div 
            key="upload-zone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {!file ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-4 border-dashed border-gray-100 rounded-[32px] p-12 flex flex-col items-center justify-center cursor-pointer hover:border-mint/30 hover:bg-mint/5 transition-all group"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <FileText className="w-10 h-10 text-gray-300 group-hover:text-mint" />
                </div>
                <p className="text-lg font-black text-gray-600 mb-1 tracking-tight">Drop your resume here</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">PDF or TXT • Max 5MB</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.txt"
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-mint/10 rounded-2xl flex items-center justify-center text-mint">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => setFile(null)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-coral transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleExtract}
                    disabled={isExtracting}
                    className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-black flex items-center shadow-lg shadow-coral/20 disabled:opacity-50"
                  >
                    {isExtracting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                    {isExtracting ? "Parsing..." : "Extract Data"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="review-zone"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <input 
                    type="text" 
                    value={extractedData.name} 
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <input 
                    type="email" 
                    value={extractedData.email} 
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <input 
                    type="text" 
                    value={extractedData.phone} 
                    onChange={e => updateField('phone', e.target.value)}
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative group">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <input 
                    type="text" 
                    value={extractedData.college} 
                    onChange={e => updateField('college', e.target.value)}
                    placeholder="College/University"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <input 
                    type="text" 
                    value={extractedData.location} 
                    onChange={e => updateField('location', e.target.value)}
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Tag className="absolute left-4 top-4 w-4 h-4 text-gray-300 group-focus-within:text-mint transition-colors" />
                  <textarea 
                    value={extractedData.skills?.join(', ')} 
                    onChange={e => updateField('skills', e.target.value.split(',').map(s => s.trim()))}
                    placeholder="Found Skills"
                    rows="1"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mint/20 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                onClick={() => setExtractedData(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveToProfile}
                className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center hover:bg-mint transition-all shadow-xl shadow-gray-200"
              >
                <CheckCircle2 className="w-5 h-5 mr-3 text-mint" />
                Auto-Fill My Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mt-8 p-6 bg-red-50 border-2 border-red-100 rounded-[32px] flex items-center space-x-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <p className="text-sm text-red-700 font-bold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
