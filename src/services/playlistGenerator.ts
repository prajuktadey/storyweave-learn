import { Story, Playlist, Track } from "@/types";

// Curated tracks for different moods and genres
const trackDatabase: Record<string, Track[]> = {
  epic: [
    { title: "heart of courage", artist: "two steps from hell", duration: "4:32", mood: "epic", genre: "orchestral" },
    { title: "strength of a thousand men", artist: "two steps from hell", duration: "4:13", mood: "epic", genre: "orchestral" },
    { title: "victory", artist: "two steps from hell", duration: "3:21", mood: "epic", genre: "orchestral" },
    { title: "protectors of the earth", artist: "two steps from hell", duration: "3:47", mood: "epic", genre: "orchestral" },
    { title: "breath and life", artist: "audiomachine", duration: "3:51", mood: "epic", genre: "orchestral" },
    { title: "time", artist: "hans zimmer", duration: "4:35", mood: "epic", genre: "orchestral" }
  ],
  mystical: [
    { title: "may it be", artist: "enya", duration: "4:33", mood: "mystical", genre: "celtic" },
    { title: "only time", artist: "enya", duration: "3:38", mood: "mystical", genre: "ambient" },
    { title: "the mystic's dream", artist: "loreena mckennitt", duration: "7:40", mood: "mystical", genre: "celtic" },
    { title: "dante's prayer", artist: "loreena mckennitt", duration: "5:46", mood: "mystical", genre: "celtic" },
    { title: "return to innocence", artist: "enigma", duration: "4:12", mood: "mystical", genre: "electronic" },
    { title: "sadness and sorrow", artist: "enigma", duration: "3:45", mood: "mystical", genre: "ambient" }
  ],
  electronic: [
    { title: "strobe", artist: "deadmau5", duration: "10:37", mood: "electronic", genre: "progressive house" },
    { title: "genesis", artist: "justice", duration: "3:47", mood: "electronic", genre: "electro" },
    { title: "midnight city", artist: "m83", duration: "4:04", mood: "electronic", genre: "synth-pop" },
    { title: "levels", artist: "avicii", duration: "3:18", mood: "electronic", genre: "progressive house" },
    { title: "clarity", artist: "zedd", duration: "4:31", mood: "electronic", genre: "electro house" },
    { title: "something about us", artist: "daft punk", duration: "3:51", mood: "electronic", genre: "electronic" }
  ],
  ambient: [
    { title: "an ending (ascent)", artist: "brian eno", duration: "4:32", mood: "ambient", genre: "ambient" },
    { title: "hoppipolla", artist: "sigur ros", duration: "4:28", mood: "ambient", genre: "post-rock" },
    { title: "your hand in mine", artist: "explosions in the sky", duration: "8:04", mood: "ambient", genre: "post-rock" },
    { title: "first breath after coma", artist: "explosions in the sky", duration: "9:35", mood: "ambient", genre: "post-rock" },
    { title: "intro", artist: "the xx", duration: "2:11", mood: "ambient", genre: "indie" },
    { title: "arrival of the birds", artist: "the cinematic orchestra", duration: "5:53", mood: "ambient", genre: "ambient" }
  ],
  suspense: [
    { title: "in the house in a heartbeat", artist: "john murphy", duration: "4:09", mood: "suspense", genre: "ambient" },
    { title: "hand covers bruise", artist: "trent reznor", duration: "5:32", mood: "suspense", genre: "ambient" },
    { title: "lux aeterna", artist: "clint mansell", duration: "3:54", mood: "suspense", genre: "orchestral" },
    { title: "theory of machines", artist: "ben frost", duration: "5:44", mood: "suspense", genre: "experimental" },
    { title: "the beast", artist: "johann johannsson", duration: "7:29", mood: "suspense", genre: "electronic" },
    { title: "tick of the clock", artist: "cliff martinez", duration: "6:07", mood: "suspense", genre: "electronic" }
  ],
  romantic: [
    { title: "nuvole bianche", artist: "ludovico einaudi", duration: "5:57", mood: "romantic", genre: "piano" },
    { title: "river flows in you", artist: "yiruma", duration: "3:37", mood: "romantic", genre: "piano" },
    { title: "comptine d'un autre été", artist: "yann tiersen", duration: "2:18", mood: "romantic", genre: "piano" },
    { title: "experience", artist: "ludovico einaudi", duration: "5:15", mood: "romantic", genre: "piano" },
    { title: "on the nature of daylight", artist: "max richter", duration: "6:07", mood: "romantic", genre: "classical" },
    { title: "love me", artist: "yiruma", duration: "3:22", mood: "romantic", genre: "piano" }
  ],
  energetic: [
    { title: "back pocket", artist: "vulfpeck", duration: "3:16", mood: "energetic", genre: "funk" },
    { title: "dean town", artist: "vulfpeck", duration: "4:35", mood: "energetic", genre: "funk" },
    { title: "it gets funkier", artist: "vulfpeck", duration: "3:52", mood: "energetic", genre: "funk" },
    { title: "golden", artist: "cory wong", duration: "3:51", mood: "energetic", genre: "funk" },
    { title: "cosmic sans", artist: "cory wong", duration: "3:27", mood: "energetic", genre: "funk" },
    { title: "1612", artist: "vulfpeck", duration: "3:14", mood: "energetic", genre: "funk" }
  ],
  uplifting: [
    { title: "concerning hobbits", artist: "howard shore", duration: "2:55", mood: "uplifting", genre: "orchestral" },
    { title: "the breaking of the fellowship", artist: "howard shore", duration: "7:20", mood: "uplifting", genre: "orchestral" },
    { title: "cornfield chase", artist: "hans zimmer", duration: "2:06", mood: "uplifting", genre: "orchestral" },
    { title: "raiders march", artist: "john williams", duration: "5:07", mood: "uplifting", genre: "orchestral" },
    { title: "now we are free", artist: "hans zimmer", duration: "4:14", mood: "uplifting", genre: "orchestral" },
    { title: "cavatina", artist: "stanley myers", duration: "3:31", mood: "uplifting", genre: "classical" }
  ]
};

function getMoodFromGenre(genre: string, story: Story): string[] {
  const genreMoodMap: Record<string, string[]> = {
    'fantasy': ['epic', 'mystical', 'ambient'],
    'science fiction': ['electronic', 'ambient', 'suspense'],
    'mystery': ['suspense', 'ambient', 'electronic'],
    'romance': ['romantic', 'ambient', 'uplifting'],
    'adventure': ['energetic', 'uplifting', 'epic'],
    'horror': ['suspense', 'ambient', 'electronic'],
    'comedy': ['uplifting', 'energetic', 'ambient'],
    'historical fiction': ['ambient', 'epic', 'romantic']
  };

  return genreMoodMap[genre.toLowerCase()] || ['ambient', 'uplifting'];
}

function calculateTotalDuration(tracks: Track[]): string {
  let totalSeconds = 0;
  
  tracks.forEach(track => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    totalSeconds += minutes * 60 + seconds;
  });
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export async function generatePlaylist(story: Story): Promise<Playlist> {
  // Simulate API processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const moods = getMoodFromGenre(story.genre, story);
  const selectedTracks: Track[] = [];
  
  // Select 2-3 tracks from each mood
  moods.forEach(mood => {
    const availableTracks = trackDatabase[mood] || trackDatabase.ambient;
    const shuffled = [...availableTracks].sort(() => Math.random() - 0.5);
    selectedTracks.push(...shuffled.slice(0, 3));
  });
  
  // Remove duplicates and limit to 10 tracks
  const uniqueTracks = selectedTracks.filter((track, index, self) => 
    index === self.findIndex(t => t.title === track.title && t.artist === track.artist)
  ).slice(0, 10);
  
  const playlist: Playlist = {
    name: `${story.title} - Reading Soundtrack`,
    description: `A curated playlist to accompany your ${story.genre.toLowerCase()} reading experience. Let these tracks transport you deeper into the world of ${story.title}.`,
    tracks: uniqueTracks,
    totalDuration: calculateTotalDuration(uniqueTracks)
  };
  
  return playlist;
}

export function shufflePlaylist(playlist: Playlist): Playlist {
  const shuffledTracks = [...playlist.tracks].sort(() => Math.random() - 0.5);
  
  return {
    ...playlist,
    tracks: shuffledTracks
  };
}