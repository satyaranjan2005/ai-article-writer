require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const prompt = `Write a detailed, well-structured article on the topic: "${title}". The article should include an engaging introduction, multiple informative sections, and a concise conclusion, all written in a professional and informative tone. Generate the content in clean, properly nested HTML format suitable for direct input into the TinyMCE editor. Use appropriate HTML tags such as <h1>, <h2>, <p>, <ul>, <li>, <strong>, and <em> for headings, subheadings, paragraphs, lists, bold, and italicized text. Ensure that the output is ready for integration into TinyMCE without additional modification.`;

  try {

    const result = await model.generateContent(prompt);

    const generatedText = result.response.text();
    res.json({ article: generatedText });
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate article" });
  }
});

app.post("/optimize", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ error: "Content is required for optimization" });
  }

  const prompt = `${content}\n\nImprove the following article by making it more engaging, professional, and well-structured. Ensure that the output is in clean, properly nested HTML format compatible with the TinyMCE editor. Use appropriate HTML tags such as <h1>, <h2>, <p>, <ul>, <li>, <strong>, and <em> for headings, subheadings, paragraphs, lists, bold, and italicized text. Enhance clarity, grammar, and coherence while keeping the original meaning intact. Output only the HTML content without any markdown or code block symbols.`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const optimizedText = result.response.text();
    res.json({ optimizedArticle: optimizedText });
  } catch (error) {
    res.status(500).json({ error: "Failed to optimize article" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
