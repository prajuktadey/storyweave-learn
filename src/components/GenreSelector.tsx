import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Genre } from "@/types";

interface GenreSelectorProps {
  onGenreSelect: (genre: Genre) => void;
  selectedGenre?: Genre;
}

const genres: Genre[] = [
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Epic quests with magical elements and mythical creatures',
    themes: ['magic', 'adventure', 'heroes', 'kingdoms'],
    icon: '🗡️',
    color: 'from-purple-600 to-indigo-600',
    mood: ['epic', 'mystical', 'orchestral']
  },
  {
    id: 'sci-fi',
    name: 'Science Fiction',
    description: 'Futuristic technology and space exploration adventures',
    themes: ['technology', 'space', 'innovation', 'future'],
    icon: '🚀',
    color: 'from-blue-600 to-cyan-600',
    mood: ['electronic', 'ambient', 'synthwave']
  },
  {
    id: 'mystery',
    name: 'Mystery',
    description: 'Intriguing puzzles and detective investigations',
    themes: ['investigation', 'clues', 'secrets', 'revelation'],
    icon: '🔍',
    color: 'from-gray-700 to-gray-900',
    mood: ['suspense', 'noir', 'atmospheric']
  },
  {
    id: 'romance',
    name: 'Romance',
    description: 'Heartwarming relationships and emotional connections',
    themes: ['love', 'relationships', 'emotion', 'connection'],
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    mood: ['romantic', 'emotional', 'soft']
  },
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Thrilling journeys and exciting discoveries',
    themes: ['exploration', 'discovery', 'courage', 'journey'],
    icon: '🏔️',
    color: 'from-green-600 to-emerald-600',
    mood: ['energetic', 'uplifting', 'adventurous']
  },
  {
    id: 'horror',
    name: 'Horror',
    description: 'Spine-chilling tales with supernatural elements',
    themes: ['fear', 'supernatural', 'darkness', 'survival'],
    icon: '👻',
    color: 'from-red-800 to-black',
    mood: ['dark', 'eerie', 'tension']
  },
  {
    id: 'comedy',
    name: 'Comedy',
    description: 'Lighthearted and humorous storytelling',
    themes: ['humor', 'fun', 'wit', 'entertainment'],
    icon: '😄',
    color: 'from-yellow-400 to-orange-500',
    mood: ['upbeat', 'cheerful', 'fun']
  },
  {
    id: 'historical',
    name: 'Historical',
    description: 'Stories set in fascinating periods of the past',
    themes: ['history', 'culture', 'tradition', 'legacy'],
    icon: '🏛️',
    color: 'from-amber-600 to-yellow-700',
    mood: ['classical', 'traditional', 'period']
  }
];

export const GenreSelector = ({ onGenreSelect, selectedGenre }: GenreSelectorProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Choose Your Story Genre</h2>
        <p className="text-muted-foreground text-lg">
          Select a genre to transform your educational content into an engaging narrative
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <Card
            key={genre.id}
            className={`card-gradient border-2 cursor-pointer smooth-transition hover:scale-105 hover:shadow-xl ${
              selectedGenre?.id === genre.id
                ? 'border-primary ring-2 ring-primary/20 glow-effect'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onGenreSelect(genre)}
          >
            <div className="p-6 text-center space-y-4">
              <div className="text-4xl mb-3">{genre.icon}</div>
              <h3 className="text-xl font-semibold text-foreground">{genre.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {genre.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {genre.themes.slice(0, 3).map((theme) => (
                  <span
                    key={theme}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
              {selectedGenre?.id === genre.id && (
                <div className="animate-fade-in">
                  <Button variant="glow" size="sm" className="w-full">
                    Selected ✨
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { genres };