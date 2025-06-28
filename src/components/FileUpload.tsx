'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileUpload: (file: File, fileType: 'clients' | 'workers' | 'tasks') => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'clients' | 'workers' | 'tasks') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => ({ ...prev, [type]: file.name }));
      onFileUpload(file, type);
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-4 my-4">
      {['clients', 'workers', 'tasks'].map((type) => (
        <div key={type} className="flex items-center gap-4">
          <input
            id={`${type}-file`}
            type="file"
            accept=".csv, .xlsx"
            className="hidden"
            onChange={(e) => handleFileChange(e, type as 'clients' | 'workers' | 'tasks')}
          />

          <Button asChild>
            <label htmlFor={`${type}-file`} className="cursor-pointer">
              Upload {type}
            </label>
          </Button>

          <span className="text-sm text-gray-600 truncate max-w-xs">
            {uploadedFiles[type] ? uploadedFiles[type] : 'No file selected'}
          </span>
        </div>
      ))}
    </div>
  );
};
