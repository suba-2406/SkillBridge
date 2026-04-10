const supabase = require('../config/supabaseClient');

// Deterministic mapping for skills to recommendations
const SkillBank = {
  'node.js': {
    courses: [
      { 
        id: 'n1', 
        title: 'Node.js for Beginners', 
        skill: 'Node.js', 
        level: 'Beginner', 
        duration: '4 weeks', 
        provider: 'EduBridge Academy' 
      },
      { 
        id: 'n2', 
        title: 'Advanced Node.js Architecture', 
        skill: 'Node.js', 
        level: 'Advanced', 
        duration: '6 weeks', 
        provider: 'Scalable Systems' 
      }
    ],
    projects: [
      { id: 'pn1', title: 'Serverless File Storage', difficulty: 'Hard', skills: ['Node.js', 'AWS'], duration: '20 hours' },
      { id: 'pn2', title: 'Real-time Chat Engine', difficulty: 'Medium', skills: ['Node.js', 'Socket.io'], duration: '12 hours' }
    ]
  },
  'mongodb': {
    courses: [
      { 
        id: 'm1', 
        title: 'MongoDB Data Modeling', 
        skill: 'MongoDB', 
        level: 'Intermediate', 
        duration: '3 weeks', 
        provider: 'Database University' 
      }
    ],
    projects: [
      { id: 'pm1', title: 'Analytics Dashboard', difficulty: 'Medium', skills: ['MongoDB', 'Express'], duration: '15 hours' }
    ]
  },
  'react': {
    courses: [
      { 
        id: 'r1', 
        title: 'React Design Patterns', 
        skill: 'React', 
        level: 'Intermediate', 
        duration: '5 weeks', 
        provider: 'Frontend Masters' 
      },
      { 
        id: 'r2', 
        title: 'Next.js 14 Deep Dive', 
        skill: 'React', 
        level: 'Advanced', 
        duration: '4 weeks', 
        provider: 'Vercel Academy' 
      }
    ],
    projects: [
      { id: 'pr1', title: 'SaaS Dashboard UI', difficulty: 'Medium', skills: ['React', 'Tailwind CSS'], duration: '10 hours' }
    ]
  },
  'javascript': {
    courses: [
      { 
        id: 'j1', 
        title: 'Modern JavaScript ES6+', 
        skill: 'JavaScript', 
        level: 'Beginner', 
        duration: '2 weeks', 
        provider: 'Dev Academy' 
      }
    ],
    projects: [
      { id: 'pj1', title: 'Interactive Portfolio', difficulty: 'Easy', skills: ['JavaScript', 'HTML'], duration: '8 hours' }
    ]
  },
  'tailwind css': {
    courses: [
      { 
        id: 'tw1', 
        title: 'Responsive Layouts with Tailwind', 
        skill: 'Tailwind CSS', 
        level: 'Beginner', 
        duration: '1 week', 
        provider: 'Design Systems' 
      }
    ],
    projects: [
      { id: 'ptw1', title: 'Dark Mode Dashboard', difficulty: 'Medium', skills: ['Tailwind CSS', 'React'], duration: '6 hours' }
    ]
  },
  'postgresql': {
    courses: [
      { id: 'pg1', title: 'PostgreSQL Performance Tuning', skill: 'PostgreSQL', level: 'Advanced', duration: '3 weeks', provider: 'DB Experts' }
    ]
  },
  'docker': {
    courses: [
      { id: 'dk1', title: 'Kubernetes for Developers', skill: 'Docker', level: 'Intermediate', duration: '5 weeks', provider: 'Cloud Native' }
    ]
  },
  'ui/ux': {
    courses: [
      { id: 'ux1', title: 'Framer Motion Masterclass', skill: 'UI/UX', level: 'Intermediate', duration: '2 weeks', provider: 'Design Academy' }
    ]
  },
  'security': {
    courses: [
      { id: 'sec1', title: 'Web Security Essentials', skill: 'Security', level: 'Beginner', duration: '4 weeks', provider: 'CyberSafe' }
    ]
  },
  'ai': {
    courses: [
      { id: 'ai1', title: 'Prompt Engineering for Devs', skill: 'AI', level: 'Intermediate', duration: '1 week', provider: 'AI Innovators' }
    ]
  },
  'nestjs': {
    courses: [
      { id: 'ns1', title: 'Microservices with NestJS', skill: 'NestJS', level: 'Advanced', duration: '6 weeks', provider: 'Backend Masters' }
    ]
  },
  'typescript': {
    courses: [
      { id: 'ts1', title: 'TypeScript Masterclass', skill: 'TypeScript', level: 'Intermediate', duration: '4 weeks', provider: 'TS Devs' }
    ]
  },
  'aws': {
    courses: [
      { id: 'aw1', title: 'AWS Cloud Architect Prep', skill: 'AWS', level: 'Advanced', duration: '8 weeks', provider: 'Cloud Pros' }
    ]
  },
  'python': {
    courses: [
      { id: 'py1', title: 'Python for Data Science', skill: 'Python', level: 'Beginner', duration: '5 weeks', provider: 'DataSchool' }
    ]
  },
  'react native': {
    courses: [
      { id: 'rn1', title: 'Fullstack React Native', skill: 'React Native', level: 'Intermediate', duration: '6 weeks', provider: 'Mobile Devs' }
    ]
  },
  'graphql': {
    courses: [
      { id: 'gq1', title: 'Apollo GraphQL with React', skill: 'GraphQL', level: 'Advanced', duration: '3 weeks', provider: 'API Masters' }
    ]
  },
  'testing': {
    courses: [
      { id: 't1', title: 'Test Driven Development (TDD)', skill: 'Testing', level: 'Intermediate', duration: '2 weeks', provider: 'Quality Code' }
    ]
  }
};

const GLOBAL_ADVANCED_COURSES = [
  { id: 'adv1', title: 'System Design Interview Prep', skill: 'Architecture', level: 'Advanced', duration: '5 weeks', provider: 'Tech Prep' },
  { id: 'adv2', title: 'Next.js 14 Enterprise Patterns', skill: 'React', level: 'Advanced', duration: '3 weeks', provider: 'Vercel Academy' },
  { id: 'adv3', title: 'Distributed Systems with Go', skill: 'Backend', level: 'Advanced', duration: '12 weeks', provider: 'Distributed Lab' },
  { id: 'adv4', title: 'Kubernetes in Production', skill: 'DevOps', level: 'Advanced', duration: '4 weeks', provider: 'Cloud Native' },
  { id: 'adv5', title: 'Advanced GraphQL & Federation', skill: 'API', level: 'Advanced', duration: '2 weeks', provider: 'GraphQL Hub' },
  { id: 'adv6', title: 'Performance Engineering for Web', skill: 'Fullstack', level: 'Advanced', duration: '3 weeks', provider: 'Web Speed' }
];

const getRecommendations = async (skills, type, level = null) => {
  try {
    // 1. Try to fetch from Supabase first
    let query = supabase.from(type).select('*');
    if (level) {
      query = query.eq('difficulty', level);
    }
    const { data: dbData, error } = await query;

    if (!error && dbData && dbData.length > 0) {
      return dbData;
    }

    // 2. Fallback to Deterministic Mapping
    const normalizedSkills = Array.isArray(skills) ? skills.map(s => s.toLowerCase()) : [];
    let recommendations = [];
    const seenIds = new Set();

    // If level is 'Advanced', we might want to return Hard projects regardless of specific skills
    if (level === 'Hard' || level === 'Advanced') {
      // Try to get advanced specific skills first
      Object.values(SkillBank).forEach(data => {
        if (data[type]) {
          data[type].forEach(item => {
            if ((item.difficulty === 'Hard' || item.level === 'Advanced') && !seenIds.has(item.id)) {
              recommendations.push(item);
              seenIds.add(item.id);
            }
          });
        }
      });
      
      // If we still need more for a grid, add the global advanced set
      if (type === 'courses' && recommendations.length < 6) {
        GLOBAL_ADVANCED_COURSES.forEach(course => {
          if (!seenIds.has(course.id)) {
            recommendations.push(course);
            seenIds.add(course.id);
          }
        });
      }
    }

    // Otherwise match by skills
    if (recommendations.length === 0) {
      normalizedSkills.forEach(skill => {
        const data = SkillBank[skill];
        if (data && data[type]) {
          data[type].forEach(item => {
            if (!seenIds.has(item.id)) {
              recommendations.push(item);
              seenIds.add(item.id);
            }
          });
        }
      });
    }

    // 3. Last Fallback - Absolute minimum (Guaranteed Grid)
    if (recommendations.length < 6) {
      if (type === 'courses') {
        const fillers = GLOBAL_ADVANCED_COURSES.filter(c => !seenIds.has(c.id));
        recommendations = [...recommendations, ...fillers].slice(0, 6);
      } else {
        const fallbackProjects = [
          { id: 'pgen1', title: 'Open Source Contribution', difficulty: 'Medium', skills: ['Git', 'Collaboration'], duration: '20 hours' },
          { id: 'pgen2', title: 'Enterprise System Design', difficulty: 'Hard', skills: ['Architecture', 'Kubernetes'], duration: '40 hours' },
          { id: 'pgen3', title: 'Real-time Analytics Pipeline', difficulty: 'Hard', skills: ['Kafka', 'Spark'], duration: '30 hours' },
          { id: 'pgen4', title: 'Custom Blockchain Engine', difficulty: 'Hard', skills: ['Go', 'Cryptography'], duration: '50 hours' },
          { id: 'pgen5', title: 'Multi-tenant SaaS Boilerplate', difficulty: 'Medium', skills: ['Next.js', 'PostgreSQL'], duration: '25 hours' },
          { id: 'pgen6', title: 'AI Search Engine', difficulty: 'Hard', skills: ['OpenAI', 'VectorDB'], duration: '15 hours' }
        ];
        const fillers = fallbackProjects.filter(p => !seenIds.has(p.id));
        recommendations = [...recommendations, ...fillers].slice(0, 6);
      }
    }

    return recommendations;
  } catch (err) {
    console.error(`Recommendation Error (${type}):`, err);
    return [];
  }
};

module.exports = { getRecommendations };
