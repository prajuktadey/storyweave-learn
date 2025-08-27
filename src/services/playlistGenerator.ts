import { Story, Playlist, Track } from "@/types";

// Curated tracks for different moods and genres
const trackDatabase: Record<string, Track[]> = {
  epic: [
    { title: "Time", artist: "Hans Zimmer", duration: "4:36", mood: "epic", genre: "Orchestral" },
    { title: "Lux Aeterna", artist: "Clint Mansell", duration: "3:59", mood: "epic", genre: "Cinematic" },
    { title: "Mountains", artist: "Hans Zimmer", duration: "3:39", mood: "epic", genre: "Orchestral" },
    { title: "Heart of Courage", artist: "Two Steps From Hell", duration: "2:51", mood: "epic", genre: "Trailer Music" }
  ],
  mystical: [
    { title: "May It Be", artist: "Enya", duration: "3:34", mood: "mystical", genre: "Celtic" },
    { title: "The Mystic's Dream", artist: "Loreena McKennitt", duration: "7:39", mood: "mystical", genre: "World" },
    { title: "Svefn-g-englar", artist: "Sigur Rós", duration: "10:04", mood: "mystical", genre: "Post-Rock" },
    { title: "Ancient Lands", artist: "Celtic Woman", duration: "4:22", mood: "mystical", genre: "Celtic" }
  ],
  electronic: [
    { title: "Strobe", artist: "Deadmau5", duration: "10:37", mood: "electronic", genre: "Progressive House" },
    { title: "Midnight City", artist: "M83", duration: "4:04", mood: "electronic", genre: "Synthwave" },
    { title: "Something About Us", artist: "Daft Punk", duration: "3:51", mood: "electronic", genre: "Electronic" },
    { title: "Porcelain", artist: "Moby", duration: "4:01", mood: "electronic", genre: "Ambient" }
  ],
  ambient: [
    { title: "An Ending (Ascent)", artist: "Brian Eno", duration: "4:22", mood: "ambient", genre: "Ambient" },
    { title: "On Earth as in Heaven", artist: "Ólafur Arnalds", duration: "5:02", mood: "ambient", genre: "Neoclassical" },
    { title: "Metamorphosis Two", artist: "Philip Glass", duration: "5:31", mood: "ambient", genre: "Minimalist" },
    { title: "Samsara", artist: "Audiomachine", duration: "2:32", mood: "ambient", genre: "Cinematic" }
  ],
  suspense: [
    { title: "The Dark Knight", artist: "Hans Zimmer", duration: "16:14", mood: "suspense", genre: "Film Score" },
    { title: "Clubbed to Death", artist: "Rob Dougan", duration: "7:26", mood: "suspense", genre: "Electronic" },
    { title: "Paradox", artist: "Lisa Gerrard", duration: "4:25", mood: "suspense", genre: "Atmospheric" },
    { title: "Mind Heist", artist: "Zack Hemsey", duration: "3:28", mood: "suspense", genre: "Cinematic" }
  ],
  romantic: [
    { title: "Canon in D", artist: "Pachelbel", duration: "5:03", mood: "romantic", genre: "Classical" },
    { title: "River Flows in You", artist: "Yiruma", duration: "3:20", mood: "romantic", genre: "Piano" },
    { title: "La Vie En Rose", artist: "Édith Piaf", duration: "3:06", mood: "romantic", genre: "Chanson" },
    { title: "At Last", artist: "Etta James", duration: "2:59", mood: "romantic", genre: "Soul" }
  ],
  energetic: [
    { title: "Thunder", artist: "Imagine Dragons", duration: "3:07", mood: "energetic", genre: "Pop Rock" },
    { title: "Levels", artist: "Avicii", duration: "5:53", mood: "energetic", genre: "EDM" },
    { title: "Pump It", artist: "The Black Eyed Peas", duration: "3:33", mood: "energetic", genre: "Hip Hop" },
    { title: "Eye of the Tiger", artist: "Survivor", duration: "4:04", mood: "energetic", genre: "Rock" }
  ],
  uplifting: [
    { title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05", mood: "uplifting", genre: "Pop" },
    { title: "Walking on Sunshine", artist: "Katrina and the Waves", duration: "3:58", mood: "uplifting", genre: "Pop" },
    { title: "Good as Hell", artist: "Lizzo", duration: "2:39", mood: "uplifting", genre: "Pop" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56", mood: "uplifting", genre: "Pop" }
  ]
};

function getMoodFromGenre(genre: string, story: Story): string[] {
  const genreMoodMap: Record<string, string[]> = {
    'Fantasy': ['epic', 'mystical', 'ambient'],
    'Science Fiction': ['electronic', 'ambient', 'suspense'],
    'Mystery': ['suspense', 'ambient', 'electronic'],
    'Romance': ['romantic', 'ambient', 'uplifting'],
    'Adventure': ['energetic', 'uplifting', 'epic'],
    'Horror': ['suspense', 'ambient', 'electronic'],
    'Comedy': ['uplifting', 'energetic', 'ambient'],
    'Historical': ['ambient', 'epic', 'romantic']
  };

  return genreMoodMap[genre] || ['ambient', 'uplifting'];
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