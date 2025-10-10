import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUpload } from "@/components/FileUpload";
import { GenreSelector } from "@/components/GenreSelector";
import { StoryDisplay } from "@/components/StoryDisplay";
import { PlaylistSuggestions } from "@/components/PlaylistSuggestions";
import { BookOpen, Music, Sparkles, ArrowRight } from "lucide-react";
import { ContentUpload, Genre, Story, Playlist, Track } from "@/types";
import { generateStory } from "@/services/storyGenerator";
import { generatePlaylist, shufflePlaylist } from "@/services/playlistGenerator";
import { useToast } from "@/hooks/use-toast";

type AppStep = 'welcome' | 'upload' | 'genre' | 'generating' | 'story' | 'playlist';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [uploadedContent, setUploadedContent] = useState<ContentUpload | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleContentUpload = (content: ContentUpload) => {
    setUploadedContent(content);
    setCurrentStep('genre');
    toast({
      title: "Content uploaded successfully!",
      description: `${content.wordCount} words ready for transformation.`
    });
  };

  const handleGenreSelect = async (genre: Genre) => {
    setSelectedGenre(genre);
    if (uploadedContent) {
      setCurrentStep('generating');
      setIsLoading(true);
      
      try {
        const story = await generateStory(uploadedContent.content, genre);
        setGeneratedStory(story);
        setCurrentStep('story');
        toast({
          title: "Story generated!",
          description: `Your ${genre.name.toLowerCase()} story is ready to read.`
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Please try again with different content or genre.";
        toast({
          title: "Error generating story",
          description: errorMessage,
          variant: "destructive"
        });
        setCurrentStep('genre');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGeneratePlaylist = async () => {
    if (generatedStory) {
      setIsLoading(true);
      try {
        const newPlaylist = await generatePlaylist(generatedStory);
        setPlaylist(newPlaylist);
        setCurrentStep('playlist');
        toast({
          title: "Playlist generated!",
          description: `${newPlaylist.tracks.length} tracks curated for your reading experience.`
        });
      } catch (error) {
        toast({
          title: "Error generating playlist",
          description: "Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleShuffle = () => {
    if (playlist) {
      const shuffled = shufflePlaylist(playlist);
      setPlaylist(shuffled);
      toast({
        title: "Playlist shuffled!",
        description: "Your tracks have been reordered."
      });
    }
  };

  const handlePlayTrack = (track: Track) => {
    toast({
      title: `Playing: ${track.title}`,
      description: `by ${track.artist}`
    });
  };

  const handleExport = () => {
    toast({
      title: "Export feature coming soon!",
      description: "We're working on PDF and text export options."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share feature coming soon!",
      description: "Soon you'll be able to share your stories with others."
    });
  };

  const resetApp = () => {
    setCurrentStep('welcome');
    setUploadedContent(null);
    setSelectedGenre(null);
    setGeneratedStory(null);
    setPlaylist(null);
    setIsLoading(false);
  };

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="animate-float"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              course to story
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              transform your educational content into captivating stories with ai-generated soundtracks
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <Card className="card-gradient p-6 text-center space-y-4 smooth-transition hover:scale-105">
              <BookOpen className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-lg font-semibold">upload content</h3>
              <p className="text-sm text-muted-foreground">
                import course materials, pdfs, or type directly
              </p>
            </Card>
            
            <Card className="card-gradient p-6 text-center space-y-4 smooth-transition hover:scale-105">
              <Sparkles className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold">choose genre</h3>
              <p className="text-sm text-muted-foreground">
                transform into fantasy, sci-fi, mystery, and more
              </p>
            </Card>
            
            <Card className="card-gradient p-6 text-center space-y-4 smooth-transition hover:scale-105">
              <Music className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="text-lg font-semibold">get soundtrack</h3>
              <p className="text-sm text-muted-foreground">
                receive curated playlists for immersive reading
              </p>
            </Card>
          </div>

          {/* CTA */}
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => setCurrentStep('upload')}
            className="animate-glow"
          >
            start creating your story
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'upload') {
    return (
      <div className="min-h-screen py-12">
        <FileUpload onContentUpload={handleContentUpload} isLoading={isLoading} />
      </div>
    );
  }

  if (currentStep === 'genre') {
    return (
      <div className="min-h-screen py-12">
        <GenreSelector onGenreSelect={handleGenreSelect} selectedGenre={selectedGenre} />
      </div>
    );
  }

  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="text-center space-y-8">
          <div className="animate-spin text-6xl">loading</div>
          <h2 className="text-3xl font-bold text-gradient">crafting your story</h2>
          <p className="text-xl text-muted-foreground max-w-md">
            our ai is weaving your {selectedGenre?.name.toLowerCase()} tale with educational elements...
          </p>
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-primary animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'story' && generatedStory) {
    return (
      <div className="min-h-screen py-12">
        <div className="mb-6 text-center">
          <Button variant="outline" onClick={resetApp} className="mr-4">
            start new story
          </Button>
        </div>
        <StoryDisplay
          story={generatedStory}
          onGeneratePlaylist={handleGeneratePlaylist}
          onExport={handleExport}
          onShare={handleShare}
        />
      </div>
    );
  }

  if (currentStep === 'playlist' && playlist && generatedStory) {
    return (
      <div className="min-h-screen py-12">
        <div className="mb-6 text-center space-x-4">
          <Button variant="outline" onClick={resetApp}>
            start new story
          </Button>
          <Button variant="ghost" onClick={() => setCurrentStep('story')}>
            back to story
          </Button>
        </div>
        <PlaylistSuggestions
          playlist={playlist}
          onPlayTrack={handlePlayTrack}
          onShuffle={handleShuffle}
        />
      </div>
    );
  }

  return null;
};

export default Index;