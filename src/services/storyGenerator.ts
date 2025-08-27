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
  // Simple keyword extraction - in a real app, this would be more sophisticated
  const words = content.toLowerCase().split(/\W+/);
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  const wordCount = new Map<string, number>();
  
  words.forEach(word => {
    if (word.length > 3 && !stopWords.has(word)) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });
  
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
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
  
  const opening = template.openings[Math.floor(Math.random() * template.openings.length)];
  const plotElement = template.plotElements[Math.floor(Math.random() * template.plotElements.length)];
  const conflict = template.conflicts[Math.floor(Math.random() * template.conflicts.length)];
  
  const protagonist = characters.find(c => c.role === "Protagonist")?.name || "Our hero";
  const mentor = characters.find(c => c.role === "Mentor")?.name || "their guide";
  
  // Generate a story that incorporates the educational content
  const story = `${opening} the realm of learning, ${protagonist} found themselves facing an unprecedented challenge. The ancient texts spoke of ${keyTopics[0] || "wisdom"}, but understanding its true meaning required more than just reading.

${protagonist} discovered that ${plotElement} the very essence of ${keyTopics[1] || "knowledge"}. With ${mentor} by their side, they began to unravel the complex patterns that had puzzled scholars for generations.

The journey was not without obstacles. ${conflict} than anyone had imagined. Each step forward revealed new layers of complexity, where ${keyTopics[2] || "understanding"} and ${keyTopics[3] || "practice"} intertwined in unexpected ways.

As ${protagonist} delved deeper into the mysteries, they realized that the true challenge was not in memorizing facts, but in seeing the connections between different concepts. The ${keyTopics[0] || "knowledge"} they sought was not a destination, but a way of thinking.

Through trials and revelations, ${protagonist} learned that ${keyTopics[1] || "wisdom"} comes not from having all the answers, but from asking the right questions. With each discovery, the world became richer and more interconnected.

In the end, ${protagonist} understood that their journey had only just begun. The ${keyTopics[0] || "knowledge"} they had gained was not an end in itself, but a foundation for future exploration and growth.

The story concludes with ${protagonist} ready to share their discoveries with others, knowing that true understanding grows when it is shared and built upon by a community of learners.`;

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