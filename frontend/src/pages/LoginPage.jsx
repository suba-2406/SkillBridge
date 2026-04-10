import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, User, Building2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // Explicit choice required
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) return;

    // Simulate authentication
    console.log('Logging in as:', role);
    
    // Extract name from email for dynamic greeting
    const displayName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    loginUser(role, { 
      name: displayName,
      email: email 
    });
    
    if (role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/company-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-mint/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-coral/5 rounded-full blur-[80px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-gray-200/40 p-10 relative z-10 border border-gray-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-coral/20">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Your Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${
                  role === 'student' 
                  ? 'border-mint bg-mint/5 shadow-sm' 
                  : 'border-gray-100 bg-gray-50/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${role === 'student' ? 'bg-mint/20' : 'bg-gray-200'}`}>
                  <User className={`w-5 h-5 ${role === 'student' ? 'text-mint' : 'text-gray-400'}`} />
                </div>
                <span className={`text-xs font-bold ${role === 'student' ? 'text-mint' : 'text-gray-500'}`}>Student</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${
                  role === 'company' 
                  ? 'border-coral bg-coral/5 shadow-sm' 
                  : 'border-gray-100 bg-gray-50/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${role === 'company' ? 'bg-coral/20' : 'bg-gray-200'}`}>
                  <Building2 className={`w-5 h-5 ${role === 'company' ? 'text-coral' : 'text-gray-400'}`} />
                </div>
                <span className={`text-xs font-bold ${role === 'company' ? 'text-coral' : 'text-gray-500'}`}>Company</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-mint transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-mint/20 focus:border-mint outline-none transition-all text-sm"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-coral transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!role}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center group transition-all shadow-lg ${
              !role 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            Login
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-400">
          Don't have an account? {' '}
          <Link to="/register" className="text-gray-900 font-bold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
