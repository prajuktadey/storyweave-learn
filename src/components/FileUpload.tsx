import { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Type } from "lucide-react";
import { ContentUpload } from "@/types";

interface FileUploadProps {
  onContentUpload: (content: ContentUpload) => void;
  isLoading?: boolean;
}

export const FileUpload = ({ onContentUpload, isLoading }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      
      onContentUpload({
        content,
        filename: file.name,
        wordCount,
        type: 'file'
      });
    };
    reader.readAsText(file);
  }, [onContentUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const wordCount = textInput.split(/\s+/).filter(Boolean).length;
      onContentUpload({
        content: textInput,
        filename: 'Manual Input',
        wordCount,
        type: 'text'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Upload Your Course Content</h2>
        <p className="text-muted-foreground text-lg">
          Transform your educational materials into captivating stories
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={uploadMode === 'file' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMode('file')}
            className="rounded-md"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Button
            variant={uploadMode === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMode('text')}
            className="rounded-md"
          >
            <Type className="w-4 h-4 mr-2" />
            Type Text
          </Button>
        </div>
      </div>

      {uploadMode === 'file' ? (
        <Card
          className={`card-gradient border-2 border-dashed smooth-transition ${
            dragActive
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="p-12 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Drop your course files here</h3>
              <p className="text-muted-foreground">
                Supports .txt, .md, .pdf, .docx files up to 10MB
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={isLoading}
              >
                <Upload className="w-5 h-5 mr-2" />
                {isLoading ? 'Processing...' : 'Choose Files'}
              </Button>
              
              <input
                id="file-input"
                type="file"
                accept=".txt,.md,.pdf,.docx"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            <div className="text-xs text-muted-foreground">
              We support text files, PDFs, and Word documents
            </div>
          </div>
        </Card>
      ) : (
        <Card className="card-gradient p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text-input" className="text-lg font-semibold">
              Paste or type your course content
            </Label>
            <p className="text-sm text-muted-foreground">
              Add your educational content directly here
            </p>
          </div>
          
          <Textarea
            id="text-input"
            placeholder="Paste your course content, lecture notes, textbook chapters, or any educational material here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="min-h-[300px] resize-none bg-background/50 border-border focus:border-primary smooth-transition"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {textInput.split(/\s+/).filter(Boolean).length} words
            </div>
            
            <Button
              variant="hero"
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isLoading}
            >
              {isLoading ? 'Processing...' : 'Transform to Story'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};