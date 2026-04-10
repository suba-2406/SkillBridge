import React from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { 
  Briefcase, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Bell,
  Search as SearchIcon,
  BookOpen,
  Rocket,
  ShieldCheck
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, logout } = useUser();

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learning', path: '/dashboard/learning', icon: BookOpen },
    { name: 'Projects', path: '/dashboard/projects', icon: Rocket },
    { name: 'Jobs', path: '/dashboard/jobs', icon: Briefcase },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#F8FBFA] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col shadow-sm relative z-30">
        <div className="h-16 flex items-center px-8 border-b border-gray-50">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Bridge<span className="text-mint">AI</span>
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
                className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-mint/10 text-mint shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-mint' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-semibold text-gray-500 hover:text-coral hover:bg-coral/5 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Right Column (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-[#EEF9F5] to-[#FFF5F6] relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/70 backdrop-blur-md border-b border-gray-100/50 flex items-center justify-between px-8">
          <div className="flex items-center text-sm font-medium text-gray-400">
            <span>Pages</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold Capitaize">
              {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-mint/20 focus:border-mint outline-none transition-all w-64"
              />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none">{userData.name || 'User'}</p>
                <p className="text-xs text-gray-500 mt-1">Student Explorer</p>
              </div>
              <Link to="/dashboard/profile" className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-coral/10 hover:scale-110 transition-transform cursor-pointer">
                {getInitials(userData.name || 'User')}
              </Link>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

