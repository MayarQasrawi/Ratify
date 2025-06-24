import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
  responseMimeType: "application/json",
};

const model = "gemini-1.5-flash";
const materialResponse = {
  responseMimeType: "text/plain",
};
export async function generateContent(topic, level) {
  console.log("ai");
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate study material and flashcards for ${topic} at ${level} difficulty. 
Return a **valid JSON object** with the following **exact** field names:
- "courseTitle" (string)
- "difficultyLevel" (string)
- "summary" (string)
- "chapters" (array of objects, each containing):
    - "chapterNumber" (integer)
    - "title" (string)
    - "topics" (array of objects, each containing):
        - "topicNumber" (integer)
        - "title" (string)
        - "description" (string)
**If the response does not match this exact format**, return an error or consider the response invalid.
Ensure the output is valid JSON and only includes the requested fields with **no deviations**.

`,
        },
      ],
    },
  ];
  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    const jsonText = response.candidates[0].content.parts[0].text;
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("Gemini Error: inside generate content", err);
    return null;
  }
}
//generate quiz
export async function generateQuiz(chapters, numberOfQuestions) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `
You are an AI that generates quizzes. Based on the following chapters:
${JSON.stringify(chapters, null, 2)}
Generate a quiz with **exactly ${numberOfQuestions} multiple-choice questions**.
Each question must include:
- "question" (string)
- "options" (array of strings, minimum 3 options, maximum 5)
- "answerIndex" (integer representing the correct option's index in the options array)
Return a **valid JSON object** with:
- "quiz" (array of questions as described above)

**Important:** Ensure the response is valid JSON and does not contain any explanation or extra text outside the object.
            `,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const jsonText = response.candidates[0].content.parts[0].text;
    console.log("🔴 RAW MODEL OUTPUT:\n", jsonText);

    return JSON.parse(jsonText);
  } catch (err) {
    console.error("Gemini Error:", err);
    return null;
  }
}
export async function generateFlashcards(topic, numberOfCards, level) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `
You are an AI that generates study flash-cards. Based on the following topic:
"${topic}" and level ${level}
Generate **exactly ${numberOfCards} flash-cards**.  
Each flash-card must include **either**:
1. "term" (a short phrase or name) and "definition" (one or two sentences)  

Return a **valid JSON object** with:
{
  "flashcards": [
    {
      // either:
      "term": "…",
      "definition": "…"
        }
    …
  ]
}

**Important:** The response must be pure JSON—no extra text, commentary, or markdown.
        `,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const jsonText = response.candidates[0].content.parts[0].text;
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
}

// generate study
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastRequests = [];
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

async function rateLimitedCall(fn) {
  const now = Date.now();
  lastRequests = lastRequests.filter((t) => now - t < RATE_WINDOW_MS);
  console.log(lastRequests, "jjjjjjjjjjjjjjjjjjjjj");
  if (lastRequests.length >= RATE_LIMIT) {
    const waitTime = RATE_WINDOW_MS - (now - lastRequests[0]);
    console.log(
      `Rate limit hit. Waiting ${Math.ceil(waitTime / 1000)} seconds...`
    );
    await sleep(waitTime);
    return rateLimitedCall(fn); // retry after sleep
  }

  lastRequests.push(Date.now());
  return await fn();
}

async function generateHTMLContent(chapter, topic) {
  return await rateLimitedCall(async () => {
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `You are an expert educational content writer.  
Write detailed HTML content for a learning platform based on the following:  
- Chapter Title: ${chapter}  
- Topic Title: ${topic}  
**Instructions:**  
- Output the content in pure HTML format.  
- Do NOT include <html>, <head>, <title>, or <body> tags.  
- Start directly with headings (<h1>, <h2>), paragraphs, lists (<ul><li>), bold/italic text, and examples.  
- Wrap any code examples using <pre><code class="language-js"> ... </code></pre> to support syntax highlighting.  
- Use proper HTML escaping for tags inside code blocks (e.g., &lt;div&gt;).  
- Do NOT wrap the HTML output in Markdown or triple backticks.  
- Do NOT include any extra explanation or JSON — return ONLY the raw HTML.
`,
          },
        ],
      },
    ];

    try {
      const res = await ai.models.generateContent({
        model,
        materialResponse,
        contents,
      });
      const text = res.candidates[0].content.parts[0].text;
      return text;
    } catch (err) {
      console.error("Gemini Error:", err.message);
      return "<!-- Gemini error -->";
    }
  });
}

export async function generateMaterial(chapterTopicsArray) {
  const tasks = [];

  for (const { title: chapterTitle, topics } of chapterTopicsArray) {
    for (const { title: topicTitle } of topics) {
      tasks.push({ chapterTitle, topicTitle });
    }
  }

  const htmlResults = await Promise.all(
    tasks.map(({ chapterTitle, topicTitle }) =>
      generateHTMLContent(chapterTitle, topicTitle)
    )
  );

  return tasks.map((task, i) => ({
    chapter: task.chapterTitle,
    topic: task.topicTitle,
    htmlContent: htmlResults[i],
  }));
}
