import React, { useState, useRef } from 'react';
import { FaDesktop, FaUpload } from 'react-icons/fa';

export default function FileUploadArea() {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Upload Area */}
      <div className="border rounded-lg p-6 bg-white shadow-sm border-[var(--table-border)]" >
        <h2 className="text-center text-lg  mb-6 text-[var(--secondary-color)] font-bold" >Upload Area</h2>
        
        <div 
          className={`border-3 border-dashed bg-gray-400/5 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer
            ${isDragging ? 'bg-blue-50' : ''}`}
          style={{
            borderColor: isDragging ? 'var(--main-color)' : 'var(--table-border)',
          }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="p-6 rounded-full mb-4 relative bg-blue-600/10" >
            <FaDesktop className="h-12 w-12 text-[var(--secondary-color)]"  />
            <div className="absolute -top-2 left-6.5">
              <div className="bg-red-500 p-1.5 animate-bounce  rounded-full">
                <FaUpload className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          
          <p className="text-[var(--text-color)] text-center">Drag and drop your files here</p>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-[var(--text-color)] mb-2">Selected Files:</h3>
            <ul className="text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index} className="mb-1">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Additional Notes */}
      <div className="border rounded-lg p-6 bg-white shadow-sm border-[var(--table-border)]" >
        <h2 className="text-lg  mb-2 font-bold text-[var(--secondary-color)]"  >Additional Notes</h2>
        <p className="text-sm text-[var(--text-color)] mb-4">Add any notes or explanations for your submission</p>
        
        <textarea
          value={notes}
          onChange={handleNoteChange}
          placeholder="..."
          className=" border-2 border-[var(--table-border)] w-full rounded-md p-3 min-h-20 focus:outline-none focus:ring "
         
        />
      </div>
    </div>
  );
}
