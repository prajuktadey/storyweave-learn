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
    name: 'fantasy',
    description: 'epic quests with magical elements and mythical creatures',
    themes: ['magic', 'adventure', 'heroes', 'kingdoms'],
    icon: '',
    color: 'from-gray-600 to-black',
    mood: ['epic', 'mystical', 'orchestral']
  },
  {
    id: 'sci-fi',
    name: 'science fiction',
    description: 'futuristic technology and space exploration adventures',
    themes: ['technology', 'space', 'innovation', 'future'],
    icon: '',
    color: 'from-gray-600 to-black',
    mood: ['electronic', 'ambient', 'synthwave']
  },
  {
    id: 'mystery',
    name: 'mystery',
    description: 'intriguing puzzles and detective investigations',
    themes: ['investigation', 'clues', 'secrets', 'revelation'],
    icon: '',
    color: 'from-gray-700 to-gray-900',
    mood: ['suspense', 'noir', 'atmospheric']
  },
  {
    id: 'romance',
    name: 'romance',
    description: 'heartwarming relationships and emotional connections',
    themes: ['love', 'relationships', 'emotion', 'connection'],
    icon: '',
    color: 'from-gray-500 to-gray-700',
    mood: ['romantic', 'emotional', 'soft']
  },
  {
    id: 'adventure',
    name: 'adventure',
    description: 'thrilling journeys and exciting discoveries',
    themes: ['exploration', 'discovery', 'courage', 'journey'],
    icon: '',
    color: 'from-gray-600 to-gray-800',
    mood: ['energetic', 'uplifting', 'adventurous']
  },
  {
    id: 'horror',
    name: 'horror',
    description: 'spine-chilling tales with supernatural elements',
    themes: ['fear', 'supernatural', 'darkness', 'survival'],
    icon: '',
    color: 'from-gray-800 to-black',
    mood: ['dark', 'eerie', 'tension']
  },
  {
    id: 'comedy',
    name: 'comedy',
    description: 'lighthearted and humorous storytelling',
    themes: ['humor', 'fun', 'wit', 'entertainment'],
    icon: '',
    color: 'from-gray-400 to-gray-600',
    mood: ['upbeat', 'cheerful', 'fun']
  },
  {
    id: 'historical',
    name: 'historical',
    description: 'stories set in fascinating periods of the past',
    themes: ['history', 'culture', 'tradition', 'legacy'],
    icon: '',
    color: 'from-gray-600 to-gray-800',
    mood: ['classical', 'traditional', 'period']
  }
];

export const GenreSelector = ({ onGenreSelect, selectedGenre }: GenreSelectorProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">choose your story genre</h2>
        <p className="text-muted-foreground text-lg">
          select a genre to transform your educational content into an engaging narrative
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
              <div className="text-4xl mb-3"></div>
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
                    selected
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