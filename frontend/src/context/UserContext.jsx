import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('user_skills_data');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      college: '',
      location: '',
      skills: [],
      missingSkills: [],
      matchedSkills: [],
      readinessScore: 0,
      bestMatchJob: '',
      jobTitle: '',
      goal: '',
      role: localStorage.getItem('user_role') || null,
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
  });

  // Persist to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('user_skills_data', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', userData.isLoggedIn);
    if (userData.role) {
      localStorage.setItem('user_role', userData.role);
    } else {
      localStorage.removeItem('user_role');
    }
  }, [userData]);

  const loginUser = (role, data = {}) => {
    setUserData(prev => ({
      ...prev,
      ...data,
      role,
      isLoggedIn: true
    }));
  };

  const updateAnalysis = (analysisData) => {
    setUserData(prev => ({
      ...prev,
      ...analysisData,
    }));
  };

  const logout = () => {
    setUserData({
      name: '',
      email: '',
      skills: [],
      missingSkills: [],
      matchedSkills: [],
      readinessScore: 0,
      bestMatchJob: '',
      jobTitle: '',
      goal: '',
      role: null,
      isLoggedIn: false
    });
    localStorage.removeItem('user_skills_data');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_role');
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateAnalysis, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
