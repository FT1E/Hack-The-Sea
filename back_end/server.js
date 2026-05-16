const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Translate using MyMemory — splits long text into chunks under 500 chars
async function translate(text) {
  if (!text || !text.trim()) return "";

  // Split into sentences to stay under 500 char limit
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > 480) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // Translate each chunk
  const translated = await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const res = await axios.get("https://api.mymemory.translated.net/get", {
          params: { q: chunk, langpair: "sl|en" },
          timeout: 10000,
        });
        return res.data.responseData.translatedText || chunk;
      } catch (err) {
        console.error("Translation error:", err.message);
        return chunk; // fallback to original
      }
    })
  );

  return translated.join(" ");
}


// Gemini Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { system_instruction, contents } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { system_instruction, contents },
      { headers: { "Content-Type": "application/json" }, timeout: 30000 }
    );

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    console.error("Gemini proxy error:", message);
    res.status(status).json({ error: message });
  }
});


// GET /fish?slug=pisanica
app.get("/fish", async (req, res) => {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: "slug is required" });

  const url = `https://www.yoursea.org/inhabitants-of-your-sea/${slug}`;

  try {
    const pageRes = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
      },
      timeout: 15000,
    });
    console.log("Status:", pageRes.status, "Body length:", pageRes.data.length);
    console.log("Body preview:", pageRes.data.slice(0, 500));
    const $ = cheerio.load(pageRes.data);

    // Common name (Slovenian) — don't translate, it's a proper name
    const commonNameSl = $("h2").first().text().trim();

    // Scientific name from the italic below the h2
    const scientificName =
      $("h2").first().next("p").find("em").first().text().trim() ||
      $("em").first().text().trim();

    // English name from the bold label on the page
    let englishName = "";
    $("p, li").each((_, el) => {
      const text = $(el).text().trim();
      if (text.startsWith("Angleško ime")) {
        englishName = text.replace("Angleško ime", "").replace(/^[\s\-–—]+/, "").trim();
      }
    });

    // Parse other fields
    const fields = {};
    $("p, li").each((_, el) => {
      const text = $(el).text().trim();
      const knownLabels = [
        "Opis:", "Posebnosti:", "Velikost:", "Območje naselitve:",
      ];
      for (const label of knownLabels) {
        if (text.startsWith(label)) {
          const key = label.replace(":", "").trim();
          fields[key] = text.replace(label, "").trim();
        }
      }
    });

    // Fun fact section
    let funFact = "";
    $("h2").each((_, el) => {
      if ($(el).text().includes("Zanimivosti")) {
        funFact =
          $(el).next("p").text().trim() ||
          $(el).nextAll("p").first().text().trim();
      }
    });

    // Translate fields
    const [description, behaviour, size, habitat, funFactEn] = await Promise.all([
      translate(fields["Opis"] || ""),
      translate(fields["Posebnosti"] || ""),
      translate(fields["Velikost"] || ""),
      translate(fields["Območje naselitve"] || ""),
      translate(funFact || ""),
    ]);

    res.json({
      slug,
      commonName: englishName || commonNameSl,
      commonNameSl,
      scientificName,
      description,
      behaviour,
      size,
      habitat,
      funFact: funFactEn,
      sourceUrl: url,
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch fish data", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Fish proxy server running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/fish?slug=pisanica`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});