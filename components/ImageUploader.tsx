"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Plus } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  existingImages?: string[];
  onChange: (images: File[]) => void;
  onRemoveExisting: (url: string) => void;
}

export default function ImageUploader({ existingImages = [], onChange, onRemoveExisting }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setPreviewUrls(prev => [...prev, ...newUrls]);
      onChange([...selectedFiles, ...newFiles]);
    }
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
    onChange(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Existing Images */}
        {existingImages.map((url, idx) => (
          <div key={`existing-${idx}`} className="relative aspect-square rounded-xl bg-black border border-white/10 overflow-hidden group">
            <Image src={url} alt={`Existing ${idx}`} fill className="object-cover" />
            <button
              onClick={() => onRemoveExisting(url)}
              type="button"
              className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs text-center py-1">Current</div>
          </div>
        ))}

        {/* New Images Previews */}
        {previewUrls.map((url, idx) => (
          <div key={`new-${idx}`} className="relative aspect-square rounded-xl bg-black border border-white/10 overflow-hidden group">
            <Image src={url} alt={`Preview ${idx}`} fill className="object-cover" />
            <button
              onClick={() => removeNewImage(idx)}
              type="button"
              className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-accent/60 text-xs text-center py-1">New</div>
          </div>
        ))}

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-accent hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white"
        >
          <Plus size={32} />
          <span className="text-sm font-medium">Add Image</span>
        </button>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
