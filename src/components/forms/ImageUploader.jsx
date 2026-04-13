import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

const ImageUploader = ({ images = [], onImagesChange, maxImages = 10 }) => {
  const [rejectedFiles, setRejectedFiles] = useState([]);
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      setRejectedFiles(rejectedFiles.map(f => ({
        name: f.file.name,
        errors: f.errors
      })));
      setTimeout(() => setRejectedFiles([]), 3000);
    }
    
    // Convert accepted files to preview URLs
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    onImagesChange(updatedImages);
  }, [images, maxImages, onImagesChange]);
  
  const removeImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    onImagesChange(updatedImages);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: maxImages - images.length,
    maxSize: 5242880, // 5MB
  });
  
  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? 'border-[#D97706] bg-[#FEF3C7]' 
            : 'border-[#E4E4E7] bg-[#F9F8F6] hover:border-[#D97706] hover:bg-[#FEF3C7]/50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragActive ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Upload className={`
            w-12 h-12 mx-auto mb-3 transition-colors
            ${isDragActive ? 'text-[#D97706]' : 'text-[#A1A1AA]'}
          `} />
          
          <p className="text-[#1A1A1A] font-medium mb-1">
            {isDragActive ? 'Drop your images here' : 'Drag & drop your car photos'}
          </p>
          <p className="text-[#A1A1AA] text-sm">
            or click to browse (JPG, PNG, WebP up to 5MB)
          </p>
          <p className="text-[#A1A1AA] text-xs mt-2">
            Max {maxImages} images • Recommended: 16:9 ratio
          </p>
        </motion.div>
      </div>
      
      {/* Rejected Files Errors */}
      <AnimatePresence>
        {rejectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            {rejectedFiles.map((file, idx) => (
              <div key={idx} className="text-sm text-red-700">
                <strong>{file.name}</strong>
                <ul className="text-xs mt-1">
                  {file.errors.map((err, i) => (
                    <li key={i}>• {err.message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <img
                  src={image.preview}
                  alt="Car preview"
                  className="w-full h-32 object-cover rounded-lg shadow-soft"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="
                    absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                    opacity-0 group-hover:opacity-100 transition-opacity
                    hover:bg-red-600
                  "
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {Math.round(image.file.size / 1024)} KB
                </div>
              </motion.div>
            ))}
            
            {images.length < maxImages && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div
                  {...getRootProps()}
                  className="
                    w-full h-32 border-2 border-dashed border-[#E4E4E7] 
                    rounded-lg flex items-center justify-center
                    hover:border-[#D97706] hover:bg-[#FEF3C7] cursor-pointer
                    transition-all
                  "
                >
                  <Plus className="w-6 h-6 text-[#A1A1AA] group-hover:text-[#D97706]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
