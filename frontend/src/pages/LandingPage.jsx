import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  BookOpen, 
  CheckCircle, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Rocket,
  Zap,
  Globe,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans selection:bg-mint/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mint/5 rounded-full blur-[120px] animate-float opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-coral/5 rounded-full blur-[120px] animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Bridge<span className="text-mint">AI</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-mint transition-colors">How it works</a>
          <a href="#features" className="hover:text-mint transition-colors">Features</a>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
          >
            Launch Dashboard
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-mint/10 text-mint text-sm font-semibold mb-6 border border-mint/20">
            <Rocket className="w-4 h-4 mr-2" />
            Empowering the next generation of talent
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Bridge Your Skills <br />
            <span className="text-gradient">to Industry</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop guessing your readiness. Analyze your gaps, improve with curated paths, and match with real-world opportunities 
            using our industry-leading assessment engine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="group relative px-8 py-4 bg-gradient-primary text-white rounded-2xl font-bold flex items-center justify-center transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
            <button className="px-8 py-4 bg-white text-gray-600 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
              View Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Problem -> Solution Section */}
      <section id="about" className="relative z-10 py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">The Problem</h2>
            <div className="space-y-4">
              {[
                { title: "Students lack clarity", desc: "Most graduates are unsure if their skills meet current market demands." },
                { title: "Industry mismatch", desc: "Curriculums often lag behind rapid technological advancements." },
                { title: "Fragmented platforms", desc: "Learning, assessment, and job searching are often disconnected." }
              ].map((item, i) => (
                <div key={i} className="flex items-start p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="mt-1 w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-coral"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">The Bridge <span className="text-mint">Solution</span></h2>
            <div className="space-y-4">
               {[
                { title: "AI Skill Analysis", desc: "Instantly identify gaps between your skills and your target role.", icon: Search },
                { title: "Personalized Paths", desc: "Focused learning content to bridge your specific identified gaps.", icon: BookOpen },
                { title: "Direct Matching", desc: "Get matched with jobs based on verified real-world readiness scores.", icon: Briefcase }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start p-4 bg-white rounded-2xl border border-mint/20 shadow-lg shadow-mint/5 group hover:border-mint transition-all">
                    <div className="mt-1 w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-mint transition-colors">
                      <Icon className="w-5 h-5 text-mint group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-500">Your transition from classroom to career in 4 simple steps.</p>
        </div>
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { title: "Analyze Skills", icon: Search, color: "bg-mint" },
              { title: "Learn & Practice", icon: BookOpen, color: "bg-coral" },
              { title: "Validate Skills", icon: ShieldCheck, color: "bg-blue-500" },
              { title: "Get Opportunities", icon: Briefcase, color: "bg-purple-500" }
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <div className="w-8 h-1 bg-gray-100 rounded-full group-hover:w-16 group-hover:bg-mint transition-all"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Everything You Need <br /> To Succeed.</h2>
              <p className="text-gray-500 leading-relaxed">We provide a unified ecosystem designed to accelerate your growth and bridge the gap between education and your dream industry.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Skill Gap Analysis", desc: "Proprietary AI engine that analyzes your resume and skills against real-time job posters.", icon: Zap },
              { title: "Personalized Content", desc: "Get curated course recommendation and open-source projects for your specific gap.", icon: BookOpen },
              { title: "Industry Matching", desc: "Algorithm that matches your verified skills with recruiters actively hiring for those stacks.", icon: Users },
              { title: "Progress Dashboard", desc: "Visualize your growth journey with detailed metrics on skill improvements and industry readiness.", icon: Globe },
              { title: "Verified Credentials", desc: "Gain blockchain-backed certifications and verification tags for recruiters to see.", icon: CheckCircle },
              { title: "Community Hub", desc: "Connect with mentors and peers in your specific field to share resources and network.", icon: Star }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-mint/20 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-mint/20 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-coral/20 blur-[100px] pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Start Building Your <br /> Career Today
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
              Join thousands of students who have already bridged their skills to their dream roles. 
              Assess your gaps for free today.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="px-10 py-5 bg-gradient-primary text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-mint/10"
            >
              Get Started for Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900">Bridge<span className="text-mint">AI</span></span>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 BridgeAI Education Systems. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
