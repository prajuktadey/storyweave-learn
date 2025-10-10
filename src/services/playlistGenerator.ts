import { Story, Playlist, Track } from "@/types";

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
          content: 'You are a music curator who creates perfect playlists for reading stories. You understand how music enhances narrative experiences.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Groq API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

function calculateTotalDuration(tracks: Track[]): string {
  let totalSeconds = 0;

  tracks.forEach(track => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    totalSeconds += minutes * 60 + (seconds || 0);
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export async function generatePlaylist(story: Story): Promise<Playlist> {
  try {
    const storyPreview = story.content.length > 2000 ? story.content.substring(0, 2000) + '...' : story.content;

    const prompt = `Create a curated playlist of 10 tracks that would be perfect for reading this story.

Story Title: ${story.title}
Genre: ${story.genre}
Story Preview:
${storyPreview}

Characters: ${story.characters.map(c => c.name).join(', ')}
Key Themes: ${story.educationalElements.join(', ')}

Requirements:
1. Select 10 real songs that match the story's mood, themes, and genre
2. Consider the emotional journey and pacing of the story
3. Include a mix of well-known and lesser-known tracks
4. Vary the artists for diversity
5. Consider instrumental, ambient, and lyrical tracks that enhance reading
6. Each track should be 2-10 minutes long

Return ONLY valid JSON in this exact format:
{
  "tracks": [
    {
      "title": "Song Title",
      "artist": "Artist Name",
      "duration": "4:32",
      "mood": "epic/mystical/ambient/etc",
      "genre": "orchestral/electronic/etc"
    }
  ]
}

Return ONLY the JSON, no other text.`;

    const response = await generateWithGroq(prompt);

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      const tracks = data.tracks || [];

      const playlist: Playlist = {
        name: `${story.title} - Reading Soundtrack`,
        description: `A curated playlist to accompany your ${story.genre.toLowerCase()} reading experience. Let these tracks transport you deeper into the world of ${story.title}.`,
        tracks: tracks.slice(0, 10),
        totalDuration: calculateTotalDuration(tracks.slice(0, 10))
      };

      return playlist;
    }

    throw new Error('Invalid playlist generation response');
  } catch (error) {
    console.error('Playlist generation error:', error);

    const fallbackTracks: Track[] = [
      { title: "time", artist: "hans zimmer", duration: "4:35", mood: "epic", genre: "orchestral" },
      { title: "experience", artist: "ludovico einaudi", duration: "5:15", mood: "ambient", genre: "piano" },
      { title: "strobe", artist: "deadmau5", duration: "10:37", mood: "electronic", genre: "progressive house" },
      { title: "your hand in mine", artist: "explosions in the sky", duration: "8:04", mood: "ambient", genre: "post-rock" },
      { title: "may it be", artist: "enya", duration: "4:33", mood: "mystical", genre: "celtic" },
      { title: "cornfield chase", artist: "hans zimmer", duration: "2:06", mood: "uplifting", genre: "orchestral" },
      { title: "hand covers bruise", artist: "trent reznor", duration: "5:32", mood: "suspense", genre: "ambient" },
      { title: "nuvole bianche", artist: "ludovico einaudi", duration: "5:57", mood: "romantic", genre: "piano" },
      { title: "midnight city", artist: "m83", duration: "4:04", mood: "electronic", genre: "synth-pop" },
      { title: "arrival of the birds", artist: "the cinematic orchestra", duration: "5:53", mood: "ambient", genre: "ambient" }
    ];

    return {
      name: `${story.title} - Reading Soundtrack`,
      description: `A curated playlist to accompany your ${story.genre.toLowerCase()} reading experience.`,
      tracks: fallbackTracks,
      totalDuration: calculateTotalDuration(fallbackTracks)
    };
  }
}

export function shufflePlaylist(playlist: Playlist): Playlist {
  const shuffledTracks = [...playlist.tracks].sort(() => Math.random() - 0.5);

  return {
    ...playlist,
    tracks: shuffledTracks
  };
}
