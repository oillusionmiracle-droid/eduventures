import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const apiKey = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";

async function callClaude(prompt) {
  if (!apiKey) {
    console.warn("Missing ANTHROPIC_API_KEY, returning empty results");
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", errorText);
      return null;
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude:", error);
    return null;
  }
}

export async function analyzeDuplicates(nominations) {
  if (!nominations || nominations.length === 0) return { potentialDuplicates: [] };
  
  const prompt = `Analyze these nominations for potential duplicates (fuzzy matches, typos) by category. 
Data: ${JSON.stringify(nominations)}
Return ONLY a valid JSON object in this format: { "potentialDuplicates": [{ "group": ["name1", "name2"], "confidence": 0.95, "category": "categoryName" }] }`;
  
  const result = await callClaude(prompt);
  if (!result) return { potentialDuplicates: [] };
  
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (e) {
    console.error("Failed to parse Claude response:", e);
    return { potentialDuplicates: [] };
  }
}

export async function extractThemes(data, type) {
  if (!data || data.length === 0) return { themes: [] };
  
  const prompt = `Extract common themes from these ${type}. 
Data: ${JSON.stringify(data)}
Return ONLY a valid JSON object in this format: { "themes": [{ "name": "Theme Name", "description": "Short description", "count": 5 }] }`;
  
  const result = await callClaude(prompt);
  if (!result) return { themes: [] };
  
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (e) {
    console.error("Failed to parse Claude response:", e);
    return { themes: [] };
  }
}

export async function analyzeTrends(nominations) {
  if (!nominations || nominations.length === 0) return { trends: [] };
  
  const prompt = `Analyze these nominations for cross-category trends and rankings.
Data: ${JSON.stringify(nominations)}
Return ONLY a valid JSON object in this format: { "insights": ["insight 1", "insight 2"], "topPerformers": [{ "name": "Name", "categories": ["cat1", "cat2"] }] }`;
  
  const result = await callClaude(prompt);
  if (!result) return { insights: [], topPerformers: [] };
  
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (e) {
    console.error("Failed to parse Claude response:", e);
    return { insights: [], topPerformers: [] };
  }
}
