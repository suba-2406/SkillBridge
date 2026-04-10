const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Extract technical skills from resume text
 */
const extractSkills = async (text) => {
  try {
    // Attempt OpenAI first
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
          {
            role: "system",
            content: "You are an expert ATS parser. Extract technical skills and tools from the resume text. Return a JSON array of strings containing ONLY the skill names."
          },
          {
            role: "user",
            content: `Resume Text:\n${text}\n\nReturn JSON array of skills.`
          }
        ],
        temperature: 0.1,
      });

      let content = response.choices[0].message.content.trim();
      const parsed = JSON.parse(content.match(/\[.*\]/s)?.[0] || content);
      return Array.isArray(parsed) ? parsed : (parsed.skills || []);
    }
    throw new Error("OpenAI Key Missing or Invalid");
  } catch (error) {
    console.error("OpenAI extractSkills Error, falling back to Gemini:", error.message);
    try {
      const result = await geminiModel.generateContent(`Extract technical skills from this resume. Return ONLY a JSON array of strings: ${text}`);
      const content = result.response.text();
      const parsed = JSON.parse(content.match(/\[.*\]/s)?.[0] || content);
      return Array.isArray(parsed) ? parsed : (parsed.skills || []);
    } catch (geminiError) {
      console.error("Gemini fallback failed:", geminiError.message);
      return ["React", "Node.js", "Express", "JavaScript"]; 
    }
  }
};

/**
 * Extract structured details from a resume
 */
const extractComprehensiveDetails = async (text) => {
  const prompt = `You are a professional resume parser. Extract details into a JSON object with keys: name, email, phone, college, location, skills (array). Text: ${text}`;
  
  try {
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0,
      });
      return JSON.parse(response.choices[0].message.content);
    }
    throw new Error("OpenAI Key Missing");
  } catch (error) {
    console.warn("OpenAI Comprehensive Extraction Error, falling back to Gemini:", error.message);
    try {
      const result = await geminiModel.generateContent(prompt + " Return valid JSON only.");
      const content = result.response.text();
      return JSON.parse(content.match(/\{.*\}/s)?.[0] || content);
    } catch (geminiError) {
      console.error("Gemini Extraction also failed:", geminiError);
      return { name: "", email: "", phone: "", college: "", location: "", skills: [] };
    }
  }
};

/**
 * Generate a personalized project idea
 */
const generateProjectIdea = async (skills, missingSkills, goal) => {
  const prompt = `As a technical PM, generate a unique real-world project for someone with skills: ${skills.join(', ')}. Focus on practicing: ${missingSkills.join(', ')}. Target role: ${goal}. Return JSON: title, description, features (array), techStack (array), difficulty, estimatedTime.`;

  try {
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });
      return JSON.parse(response.choices[0].message.content);
    }
    throw new Error("OpenAI Key Missing");
  } catch (error) {
    console.warn("OpenAI Project Generation Error, falling back to Gemini:", error.message);
    try {
      const result = await geminiModel.generateContent(prompt + " Return strictly JSON.");
      const content = result.response.text();
      return JSON.parse(content.match(/\{.*\}/s)?.[0] || content);
    } catch (geminiError) {
      console.error("Gemini Project Generation also failed:", geminiError);
      throw geminiError;
    }
  }
};

module.exports = { extractSkills, extractComprehensiveDetails, generateProjectIdea };
