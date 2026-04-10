import React from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LogOut, 
  Bell,
  Search as SearchIcon,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const CompanyDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Candidate Discovery', path: '/company-dashboard', icon: Users },
    { name: 'Company Profile', path: '#', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#ECFDF5] to-[#FFF1F2] overflow-hidden font-sans">
      {/* Recruiter Sidebar - Minimal */}
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-gray-100 hidden lg:flex flex-col shadow-sm relative z-30">
        <div className="h-20 flex items-center px-8 border-b border-gray-50/50">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Recruit<span className="text-mint">Hub</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-mint/10 text-mint shadow-sm' 
                    : 'text-gray-400 hover:bg-white hover:text-gray-900 shadow-none'
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-mint' : 'text-gray-300'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-50/50 space-y-1">
          <button className="w-full flex items-center px-4 py-3 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
            <HelpCircle className="w-4 h-4 mr-3" />
            Support
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-bold text-coral/60 hover:text-coral hover:bg-coral/5 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Professional Header */}
        <header className="h-20 bg-white/40 backdrop-blur-md border-b border-gray-100/50 flex items-center justify-between px-10">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Talent Pipeline</h2>

          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                type="text" 
                placeholder="Quick search..."
                className="pl-10 pr-4 py-2.5 bg-white/50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-mint/20 focus:border-mint outline-none transition-all w-64 shadow-sm"
              />
            </div>
            
            <button className="p-2.5 text-gray-300 hover:text-gray-900 transition-colors relative bg-white/50 border border-gray-100 rounded-xl shadow-sm">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-coral rounded-full border border-white"></span>
            </button>

            <div className="h-6 w-px bg-gray-200/50 mx-2"></div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 leading-none">Recruiter Hub</p>
                <p className="text-[10px] text-mint font-bold mt-1.5 uppercase tracking-widest">Enterprise Mode</p>
              </div>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md shadow-coral/10">
                RH
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto relative z-10 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboardLayout;
