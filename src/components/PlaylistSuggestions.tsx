import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, ExternalLink, Shuffle, Music } from "lucide-react";
import { Playlist, Track } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PlaylistSuggestionsProps {
  playlist: Playlist;
  onPlayTrack: (track: Track) => void;
  onShuffle: () => void;
}

export const PlaylistSuggestions = ({ playlist, onPlayTrack, onShuffle }: PlaylistSuggestionsProps) => {
  const { toast } = useToast();

  const searchOnYouTube = (track: Track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const searchOnSpotify = (track: Track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    window.open(`https://open.spotify.com/search/${query}`, '_blank');
  };

  const searchOnAppleMusic = (track: Track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    window.open(`https://music.apple.com/search?term=${query}`, '_blank');
  };

  const openAllTracksOnYouTube = () => {
    playlist.tracks.forEach((track, index) => {
      setTimeout(() => {
        searchOnYouTube(track);
      }, index * 500);
    });
    toast({
      title: "Opening tracks on YouTube",
      description: "Opening all tracks in new tabs..."
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="card-gradient p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gradient">{playlist.name}</h2>
            <p className="text-muted-foreground text-lg">{playlist.description}</p>
            <div className="flex justify-center items-center gap-4 text-sm">
              <Badge variant="secondary">
                {playlist.tracks.length} tracks
              </Badge>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                {playlist.totalDuration}
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button variant="hero" size="lg" onClick={openAllTracksOnYouTube}>
              <Play className="w-5 h-5 mr-2" />
              play all on youtube
            </Button>
            <Button variant="outline" onClick={onShuffle}>
              <Shuffle className="w-4 h-4 mr-2" />
              shuffle
            </Button>
          </div>

          {/* Track List */}
          <div className="space-y-3">
            {playlist.tracks.map((track, index) => (
              <Card
                key={index}
                className="bg-background/50 border border-border hover:border-primary/50 smooth-transition p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Music className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {track.mood}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => searchOnYouTube(track)}
                        title="Play on YouTube"
                      >
                        <span className="text-red-500">▶</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => searchOnSpotify(track)}
                        title="Open in Spotify"
                      >
                        <span className="text-green-500">♫</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Streaming Links */}
          <div className="text-center space-y-4 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              click the icons next to each track to play on your preferred platform
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => {
                const query = encodeURIComponent(playlist.name);
                window.open(`https://open.spotify.com/search/${query}`, '_blank');
              }}>
                <span className="text-green-500 mr-2">♫</span>
                search on spotify
              </Button>
              <Button variant="outline" size="sm" onClick={openAllTracksOnYouTube}>
                <span className="text-red-500 mr-2">▶</span>
                open all on youtube
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                const query = encodeURIComponent(playlist.name);
                window.open(`https://music.apple.com/search?term=${query}`, '_blank');
              }}>
                <span className="text-pink-500 mr-2">♪</span>
                search on apple music
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};