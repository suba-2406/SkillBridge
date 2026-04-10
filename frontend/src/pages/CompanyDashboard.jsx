import React, { useEffect, useState } from 'react';
import { Users, Search, Filter, CheckCircle, ArrowUpRight } from 'lucide-react';
import { fetchStudents } from '../services/api';

const CompanyDashboard = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.skills?.some(skill => skill.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Talent Explorer
          </h1>
          <p className="mt-3 text-gray-500 font-medium">
            Direct access to industry-ready students based on real-time readiness scores.
          </p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-4 text-mint group-focus-within:scale-110 transition-transform" />
          <input 
            type="text"
            placeholder="Filter by skill or name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white/60 backdrop-blur-sm border border-white rounded-[24px] text-sm focus:ring-4 focus:ring-mint/10 focus:border-mint outline-none transition-all w-80 shadow-sm hover:shadow-md"
          />
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white/40 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-md rounded-[40px] shadow-xl shadow-gray-200/30 border border-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-100/50">
                <th className="px-10 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Student</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] hidden md:table-cell">Top Skills</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Readiness</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/80 transition-all duration-300 group">
                  <td className="px-10 py-7">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-mint/10 rounded-2xl flex items-center justify-center text-mint font-bold mr-5 group-hover:scale-110 transition-transform shadow-sm">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-mint transition-colors">{student.name}</p>
                        <p className="text-[11px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">Aspiring {student.goal || 'Engineer'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7 hidden md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {student.skills?.slice(0, 3).map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white border border-gray-100 text-gray-600 text-[10px] font-bold rounded-lg shadow-sm">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 h-2 w-28 bg-gray-100/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-mint to-teal-400 rounded-full"
                          style={{ width: `${student.readiness_score || 85}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">{student.readiness_score || 85}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <button className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-xs font-bold flex items-center shadow-lg shadow-coral/10 hover:scale-105 active:scale-95 transition-all">
                      View Profile
                      <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-600 font-bold">No students found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
