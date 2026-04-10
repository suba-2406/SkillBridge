const pdfParse = require('pdf-parse');
const aiService = require('../services/aiService');

/**
 * Handle resume upload and skill extraction
 */
const extractSkillsFromResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file uploaded" });
    }

    let extractedText = "";
    console.log(`[Extraction] Processing file: ${req.file.originalname}, size: ${req.file.size}, mimetype: ${req.file.mimetype}`);

    // Check file type and extract text accordingly
    try {
      if (req.file.mimetype === 'application/pdf') {
        console.log("[Extraction] Attempting PDF parse...");
        const data = await pdfParse(req.file.buffer);
        extractedText = data.text;
        console.log(`[Extraction] PDF parse success. Extracted ${extractedText?.length || 0} characters.`);
      } else if (req.file.mimetype === 'text/plain') {
        extractedText = req.file.buffer.toString('utf-8');
      } else {
        console.warn(`[Extraction] Unsupported mimetype: ${req.file.mimetype}`);
        return res.status(400).json({ success: false, message: "Unsupported file type. Please upload PDF or TXT." });
      }
    } catch (parseErr) {
      console.error("[Extraction] File parsing failed:", parseErr.message);
      throw new Error(`Failed to parse file: ${parseErr.message}`);
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Could not extract text from file" });
    }

    // Call OpenAI Service for skill extraction
    console.log("[Extraction] Calling AI service...");
    const skills = await aiService.extractSkills(extractedText);

    res.json({
      success: true,
      data: {
        skills: skills
      },
      message: "Skills extracted successfully"
    });

  } catch (error) {
    console.error("Extraction Controller Error Details:", {
      message: error.message,
      stack: error.stack,
      file: req.file ? {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : "No file"
    });
    res.status(500).json({ 
      success: false, 
      error: error.message, 
      message: "Internal Server Error during skill extraction" 
    });
  }
};

/**
 * Extract structured resume details (Name, Email, Skills, etc.) using OpenAI
 */
const extractResumeDetails = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file uploaded" });
    }

    let extractedText = "";
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else if (req.file.mimetype === 'text/plain') {
      extractedText = req.file.buffer.toString('utf-8');
    } else {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Could not extract text from file" });
    }

    // New AI service call for structured details
    const details = await aiService.extractComprehensiveDetails(extractedText);

    res.json({
      success: true,
      data: details,
      message: "Resume details extracted successfully"
    });

  } catch (error) {
    console.error("Resume Details Extraction Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { extractSkillsFromResume, extractResumeDetails };
