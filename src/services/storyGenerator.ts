import { Genre, Story, Character } from "@/types";

// Story templates for different genres
const storyTemplates = {
  fantasy: {
    openings: [
      "In the mystical realm of",
      "Long ago in a forgotten kingdom where",
      "Deep within the enchanted forest of"
    ],
    plotElements: [
      "a young apprentice discovers",
      "an ancient prophecy reveals",
      "a magical artifact holds the key to"
    ],
    conflicts: [
      "dark forces threaten to",
      "an evil sorcerer seeks to",
      "the balance between worlds"
    ]
  },
  'sci-fi': {
    openings: [
      "In the year 2287, aboard the starship",
      "On a distant planet where",
      "In a future where technology"
    ],
    plotElements: [
      "a groundbreaking discovery",
      "an alien signal contains",
      "a quantum experiment reveals"
    ],
    conflicts: [
      "threatens the fabric of reality",
      "could destroy civilization",
      "challenges everything we know"
    ]
  },
  mystery: {
    openings: [
      "Detective Sarah Chen arrived at",
      "The fog-shrouded campus of",
      "In the quiet halls of"
    ],
    plotElements: [
      "strange patterns emerged",
      "hidden connections revealed",
      "a series of clues pointed to"
    ],
    conflicts: [
      "a conspiracy that went deeper",
      "secrets that someone would kill to protect",
      "a truth that changed everything"
    ]
  }
};

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
    .slice(0, 12)
    .map(([word]) => word);
}

function extractSentences(content: string): string[] {
  return content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200)
    .slice(0, 10);
}

function generateCharacters(genre: Genre, keyTopics: string[]): Character[] {
  const characters: Character[] = [];
  
  // Protagonist based on genre
  if (genre.id === 'fantasy') {
    characters.push({
      name: "Aria the Scholar",
      role: "Protagonist",
      represents: keyTopics[0] || "Knowledge",
      description: "A brilliant young mage who specializes in ancient texts and forgotten spells."
    });
  } else if (genre.id === 'sci-fi') {
    characters.push({
      name: "Dr. Alex Nova",
      role: "Protagonist",
      represents: keyTopics[0] || "Discovery",
      description: "A quantum physicist whose curiosity leads to groundbreaking discoveries."
    });
  } else if (genre.id === 'mystery') {
    characters.push({
      name: "Detective Riley Kane",
      role: "Protagonist",
      represents: keyTopics[0] || "Investigation",
      description: "A sharp-minded investigator with an eye for hidden patterns."
    });
  } else {
    characters.push({
      name: "Morgan",
      role: "Protagonist",
      represents: keyTopics[0] || "Learning",
      description: "A determined individual on a journey of discovery."
    });
  }
  
  // Supporting characters based on key topics
  if (keyTopics.length > 1) {
    characters.push({
      name: genre.id === 'fantasy' ? "Professor Thornwick" : 
            genre.id === 'sci-fi' ? "Captain Chen" : "Dr. Williams",
      role: "Mentor",
      represents: keyTopics[1] || "Guidance",
      description: "A wise guide who helps unlock the deeper mysteries."
    });
  }
  
  if (keyTopics.length > 2) {
    characters.push({
      name: genre.id === 'fantasy' ? "Shadow of Doubt" : 
            genre.id === 'sci-fi' ? "The Algorithm" : "The Unknown",
      role: "Antagonist",
      represents: keyTopics[2] || "Challenge",
      description: "The primary obstacle that must be overcome through understanding."
    });
  }
  
  return characters;
}

function generateStoryContent(genre: Genre, content: string, characters: Character[], keyTopics: string[]): string {
  const template = storyTemplates[genre.id as keyof typeof storyTemplates] || storyTemplates.fantasy;
  const sentences = extractSentences(content);
  
  const opening = template.openings[Math.floor(Math.random() * template.openings.length)];
  const plotElement = template.plotElements[Math.floor(Math.random() * template.plotElements.length)];
  const conflict = template.conflicts[Math.floor(Math.random() * template.conflicts.length)];
  
  const protagonist = characters.find(c => c.role === "Protagonist")?.name || "the protagonist";
  const mentor = characters.find(c => c.role === "Mentor")?.name || "their mentor";
  const antagonist = characters.find(c => c.role === "Antagonist")?.name || "the challenge";
  
  const topic1 = keyTopics[0] || "knowledge";
  const topic2 = keyTopics[1] || "understanding";
  const topic3 = keyTopics[2] || "discovery";
  const topic4 = keyTopics[3] || "insight";
  const topic5 = keyTopics[4] || "wisdom";
  
  const story = `${opening} ${topic1}, ${protagonist} encountered a mystery that would change everything they thought they knew.

the challenge began when ${protagonist} uncovered evidence of ${topic2}. according to the original sources: "${sentences[0] || 'ancient knowledge holds the key to understanding'}."

${mentor} explained the fundamentals: "${sentences[1] || 'every discovery builds upon what came before'}." but ${protagonist} sensed there was more to learn about ${topic3} than anyone realized.

as ${protagonist} investigated deeper, they discovered that ${plotElement} a hidden connection between ${topic2} and ${topic4}. the texts revealed: "${sentences[2] || 'the path to mastery requires both theory and practice'}."

${antagonist} emerged as ${conflict} the established understanding of ${topic1}. ${protagonist} had to reconcile conflicting ideas: "${sentences[3] || 'true knowledge comes from questioning assumptions'}."

working with ${mentor}, ${protagonist} began to see patterns. "${sentences[4] || 'each piece of information connects to a larger whole'}." the relationship between ${topic3} and ${topic5} became clearer.

through careful analysis, ${protagonist} learned that "${sentences[5] || 'understanding requires both breadth and depth'}." ${topic4} wasn't just about memorization—it was about synthesis and application.

the breakthrough came when ${protagonist} realized: "${sentences[6] || 'knowledge transforms when we apply it to new contexts'}." combining insights about ${topic1}, ${topic2}, and ${topic5} revealed a complete picture.

${mentor} confirmed ${protagonist}'s conclusions: "${sentences[7] || 'mastery comes from connecting disparate ideas'}." the journey through ${topic3} and ${topic4} had transformed ${protagonist}'s entire perspective.

in the end, ${protagonist} understood that ${topic1} and ${topic5} are not destinations but ongoing journeys. "${sentences[8] || 'every answer leads to new questions, and that is the beauty of learning'}."

the story of ${protagonist}'s discovery spread, inspiring others to explore ${topic2}, ${topic3}, and ${topic4} with fresh eyes, proving that knowledge shared multiplies its power.`;

  return story;
}

export async function generateStory(content: string, genre: Genre): Promise<Story> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const keyTopics = extractKeyTopics(content);
  const characters = generateCharacters(genre, keyTopics);
  const storyContent = generateStoryContent(genre, content, characters, keyTopics);
  
  const story: Story = {
    id: Date.now().toString(),
    title: `The ${genre.name} of ${keyTopics[0]?.charAt(0).toUpperCase() + keyTopics[0]?.slice(1) || 'Learning'}`,
    content: storyContent,
    genre: genre.name,
    characters,
    educationalElements: keyTopics,
    estimatedReadTime: Math.ceil(storyContent.split(' ').length / 200), // 200 words per minute
    createdAt: new Date(),
    originalContent: content
  };
  
  return story;
}