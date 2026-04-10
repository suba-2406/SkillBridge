const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  console.log("Testing OpenAI Key...");
  console.log("Key found:", process.env.OPENAI_API_KEY ? "Yes (starts with " + process.env.OPENAI_API_KEY.substring(0, 7) + ")" : "No");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say 'Success'" }],
    });
    console.log("Response successful:", response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
}

testOpenAI();
