import { Genre, Story, Character } from "@/types";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function generateWithGroq(prompt: string): Promise<string> {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    throw new Error('Groq API key is not configured. Please add your GROQ_API_KEY to the .env file.');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a creative storyteller who transforms educational content into engaging narratives. Your stories make learning memorable by weaving course concepts into compelling plots with well-developed characters.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Groq API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

function extractKeyTopics(content: string): string[] {
  const words = content.toLowerCase().split(/\W+/);
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their']);
  const wordCount = new Map<string, number>();

  words.forEach(word => {
    if (word.length > 4 && !stopWords.has(word)) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });

  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
}

async function generateCharactersWithGroq(content: string, genre: Genre, keyTopics: string[]): Promise<Character[]> {
  const prompt = `Based on this educational content and the ${genre.name} genre, create 3 diverse and meaningful characters that represent key concepts from the material.

Educational Content Summary:
${content.substring(0, 1000)}...

Key Topics: ${keyTopics.join(', ')}

Create exactly 3 characters in this JSON format:
[
  {
    "name": "Character Name",
    "role": "Protagonist",
    "represents": "Main concept they embody",
    "description": "Brief description relating them to the educational content"
  },
  {
    "name": "Character Name",
    "role": "Mentor",
    "represents": "Concept they embody",
    "description": "Brief description relating them to the educational content"
  },
  {
    "name": "Character Name",
    "role": "Antagonist",
    "represents": "Challenge or opposing concept",
    "description": "Brief description relating them to the educational content"
  }
]

Return ONLY valid JSON, nothing else.`;

  try {
    const response = await generateWithGroq(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid character generation response');
  } catch (error) {
    console.error('Character generation error:', error);
    return [
      {
        name: "Alex",
        role: "Protagonist",
        represents: keyTopics[0] || "Learning",
        description: "A curious learner on a journey of discovery"
      },
      {
        name: "Professor Morgan",
        role: "Mentor",
        represents: keyTopics[1] || "Knowledge",
        description: "A wise guide who helps unlock deeper understanding"
      },
      {
        name: "The Challenge",
        role: "Antagonist",
        represents: keyTopics[2] || "Obstacles",
        description: "The difficulties that must be overcome"
      }
    ];
  }
}

async function generateStoryContent(genre: Genre, content: string, characters: Character[], keyTopics: string[]): Promise<string> {
  const contentPreview = content.length > 3000 ? content.substring(0, 3000) + '...' : content;

  const prompt = `Create an engaging ${genre.name} story that teaches the following educational content through narrative.

Educational Content:
${contentPreview}

Key Topics to Cover: ${keyTopics.join(', ')}

Characters:
${characters.map(c => `- ${c.name} (${c.role}): ${c.description}`).join('\n')}

Requirements:
1. Write a compelling ${genre.name} story that naturally incorporates the educational concepts
2. Use the provided characters and have them represent the key topics
3. Make the story engaging and memorable while maintaining educational value
4. Include specific facts and concepts from the original content
5. Length: approximately 800-1000 words
6. Structure: Clear beginning, middle, and end
7. Make learning feel like an adventure, not a lecture

Write the complete story now:`;

  return await generateWithGroq(prompt);
}

export async function generateStory(content: string, genre: Genre): Promise<Story> {
  try {
    const keyTopics = extractKeyTopics(content);

    const characters = await generateCharactersWithGroq(content, genre, keyTopics);

    const storyContent = await generateStoryContent(genre, content, characters, keyTopics);

    const story: Story = {
      id: Date.now().toString(),
      title: `The ${genre.name} of ${keyTopics[0]?.charAt(0).toUpperCase() + keyTopics[0]?.slice(1) || 'Learning'}`,
      content: storyContent,
      genre: genre.name,
      characters,
      educationalElements: keyTopics,
      estimatedReadTime: Math.ceil(storyContent.split(' ').length / 200),
      createdAt: new Date(),
      originalContent: content
    };

    return story;
  } catch (error) {
    console.error('Story generation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate story. Please check your API configuration.');
  }
}
