import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Music, Share2, BookOpen, Clock, Users } from "lucide-react";
import { Story } from "@/types";

interface StoryDisplayProps {
  story: Story;
  onGeneratePlaylist: () => void;
  onExport: () => void;
  onShare: () => void;
}

export const StoryDisplay = ({ story, onGeneratePlaylist, onExport, onShare }: StoryDisplayProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">{story.title}</h1>
        <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {story.estimatedReadTime} min read
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {story.genre}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {story.characters.length} characters
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 flex-wrap">
        <Button variant="hero" onClick={onGeneratePlaylist}>
          <Music className="w-4 h-4 mr-2" />
          Generate Playlist
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Story
        </Button>
        <Button variant="ghost" onClick={onShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Story Content */}
        <div className="lg:col-span-3">
          <Card className="card-gradient p-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed space-y-6"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.7'
                }}
              >
                {story.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Characters */}
          <Card className="card-gradient p-6">
            <h3 className="text-lg font-semibold mb-4 text-gradient">Characters</h3>
            <div className="space-y-4">
              {story.characters.map((character, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-foreground">{character.name}</h4>
                  <p className="text-sm text-muted-foreground">{character.role}</p>
                  <p className="text-xs text-accent">Represents: {character.represents}</p>
                  {index < story.characters.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </Card>

          {/* Educational Elements */}
          <Card className="card-gradient p-6">
            <h3 className="text-lg font-semibold mb-4 text-gradient">Learning Elements</h3>
            <div className="flex flex-wrap gap-2">
              {story.educationalElements.map((element, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {element}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Story Stats */}
          <Card className="card-gradient p-6">
            <h3 className="text-lg font-semibold mb-4 text-gradient">Story Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Word Count</span>
                <span className="font-medium">{story.content.split(' ').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Time</span>
                <span className="font-medium">{story.estimatedReadTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Genre</span>
                <span className="font-medium">{story.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters</span>
                <span className="font-medium">{story.characters.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};