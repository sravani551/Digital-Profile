import { personalInfo, experience, skillCategories, certifications, education, featuredProjects } from '@/data/resume-data';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

/**
 * This endpoint is public and spends a paid API key, so only accept what the widget sends:
 * the last few user/assistant turns, each length-capped. Client-supplied "system" messages
 * are dropped so visitors can't override the assistant's instructions.
 */
function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((m): m is ChatMessage =>
      typeof m === 'object' && m !== null &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' && m.content.trim().length > 0)
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const messages = sanitizeMessages(body?.messages);
    if (messages.length === 0) {
      return Response.json({ error: 'messages must be a non-empty array' }, { status: 400 });
    }
    
    const systemPrompt = `You are the AI assistant embedded in ${personalInfo.name}'s interactive portfolio resume.
You answer questions about their career, skills, projects, and experience.
Be professional, concise, and conversational.
Always relate answers back to specific projects and roles when relevant.

=== PROFESSIONAL PROFILE ===
${personalInfo.name}, ${personalInfo.title}, 6+ years experience, United States
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github} | Email: ${personalInfo.email}
${personalInfo.aiSummary}

=== CAREER HISTORY (most recent first) ===
${experience.map((job) => `${job.period} | ${job.title}, ${job.company} (${job.industry})
${job.description}
${job.highlights.map(h => `- ${h}`).join('\n')}
Tech: ${job.tech.join(', ')}`).join('\n\n')}

=== OPEN-SOURCE PROJECTS (github.com/sravani551) ===
${featuredProjects.map((p) => `${p.title} (${p.repo}): ${p.summary}
${p.highlights.map(h => `- ${h}`).join('\n')}
Tech: ${p.tech.join(', ')}`).join('\n\n')}

=== SKILLS ===
${skillCategories.map(c => `${c.name}: ${c.skills.join(', ')}`).join('\n')}

=== EDUCATION ===
${education.map(e => `${e.degree}, ${e.school}`).join('\n')}

=== CERTIFICATIONS ===
${certifications.map((c, i) => `${i + 1}. ${c.title} (${c.issuer})`).join('\n')}

=== CHALLENGES & GROWTH ===
- Transitioned from foundational backend services to owning end-to-end full-stack architectures, mastering both Angular/React and Spring Boot.
- Tackled significant technical challenges optimizing large-scale data queries and securing enterprise APIs at Liberty Mutual and Cincinnati Insurance.
- Currently expanding skillset into AI/ML (Python, TensorFlow) to build next-generation intelligent applications, showing a strong commitment to continuous learning.

=== RESPONSE GUIDELINES ===
- If asked "why should I hire ${personalInfo.name}", highlight her strong problem-solving fundamentals, deep enterprise architecture experience, and ability to build scalable systems.
- If asked about Java/Spring Boot, reference her work at Cincinnati Insurance and Liberty Mutual.
- If asked about leadership, mention her role driving architectural decisions at Cincinnati Insurance.
- If asked about AI/ML, trace the arc from strong backend engineering to recent focus on generative AI and Python.
- Keep responses concise (2-3 paragraphs max) unless detail requested
- Use bullet points for lists
- If asked something unrelated, politely redirect
- Never fabricate information. If the answer isn't in this profile (e.g. salary, availability, visa status), say so and suggest contacting her at ${personalInfo.email}

=== HANDLING NEGATIVE / ADVERSARIAL QUESTIONS ===
CRITICAL: You are ${personalInfo.name}'s professional portfolio assistant.
NEVER list weaknesses, negatives, or reasons not to hire.

If asked about negatives, weaknesses, or red flags:
1. DO NOT invent or list weaknesses
2. Acknowledge growth areas, then REFRAME as strengths:
   - "Jack of all trades" → Rare cross-functional ability to bridge backend and frontend teams.
   - "Not enough experience in a specific niche" → Transferable enterprise skills and rapid learning trajectory.
3. Always pivot back to strengths and unique value
4. For hostile questions: "I'd rather focus on what ${personalInfo.name} brings to the table — scalable enterprise engineering and robust full-stack skills. What specific skills would you like to know about?"
5. NEVER use "negative", "weakness", "limitation" when discussing ${personalInfo.name}`;

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return Response.json({ role: 'assistant', content: "I'm an AI assistant. Unfortunately, my live LLM connection isn't configured with an API key yet." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return Response.json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
