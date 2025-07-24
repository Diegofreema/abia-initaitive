import { Controller, UseFormReturn } from 'react-hook-form';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, User, X } from 'lucide-react';
import { RegistrationFormData } from '../types';
import { toast } from 'sonner';
import Image from 'next/image';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  currentFile?: File | null | string;
  error?: string;
  form: UseFormReturn<RegistrationFormData>;
}

export function ProfilePictureUpload({
  onFileSelect,
  currentFile,
  form,
}: FileUploadProps) {
  const { setValue } = form;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      onFileSelect(null);

      return;
    }

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      onFileSelect(null);

      toast('Invalid file type', {
        description: 'Please select a PNG or JPG image file',
      });

      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      onFileSelect(null);

      toast('Invalid file size', {
        description: 'Please select a PNG or JPG less than or 5MB in size',
      });
      return;
    }

    onFileSelect(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    setValue('profilePicture', undefined);
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  useEffect(() => {
    if (currentFile && typeof currentFile !== 'string') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(currentFile);
    } else if (typeof currentFile === 'string') {
      setPreview(currentFile);
    }
  }, [currentFile]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {currentFile ? (
          <div className="relative">
            <Image
              src={preview || '/placeholder.svg'}
              alt="Page preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#060622]"
              width={200}
              height={200}
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="text-center">
        <Controller
          render={() => (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileSelect}
              className="hidden"
              id="profile-picture"
              required
            />
          )}
          rules={{ required: 'Profile image is required' }}
          name={'profilePicture'}
          control={form.control}
        />
        <label
          htmlFor="profile-picture"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#060622] text-[#060622] rounded-md hover:bg-[#060622] hover:text-white transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          {currentFile ? 'Change Photo' : 'Upload Photo'}
        </label>
        <p className="text-xs text-gray-500 mt-2">PNG or JPG only, max 5MB</p>
        {currentFile && typeof currentFile !== 'string' && (
          <p className="text-xs text-green-600 mt-1">
            ✓ {currentFile.name} ({(currentFile.size / 1024 / 1024).toFixed(2)}{' '}
            MB)
          </p>
        )}
      </div>
    </div>
  );
}
