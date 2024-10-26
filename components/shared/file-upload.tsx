// components/shared/file-upload.tsx
import React, { useState } from 'react';

export const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.error('File upload failed.');
      }
    }
  };

  return (
    <div>
      <label htmlFor="file-upload">Upload file:</label>
      <input id="file-upload" type="file" onChange={handleFileInput} />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};
